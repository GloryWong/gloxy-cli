import log from '@glorywong/log';
import PATH from '../lib/path';
import { get } from '../storage/index';
import path from 'path';
import execa from 'execa';
import * as demo from '../core/demo';
import * as index from '../storage/index';
import { prompt } from 'inquirer';
import * as types from '../lib/types';

function createDemo(name: string): void {
  try {
    demo.createDemo(name);
  } catch (error) {
    throw `createDemo failed: ${error}`;
  }
}

async function removeDemo(code: number): Promise<void> {
  try {
    const demoIndexItem = index.getByCode(code);
    if (!demoIndexItem) {
      log.error(`demo with code '${code}' does not exist`);
      return;
    }

    const { id, name: demoName } = demoIndexItem;

    const { question }: { question: boolean } = await prompt({
      type: 'confirm',
      name: 'question',
      message: `Do you really want to archive demo '${demoName}'?`
    });

    if (question) {
      demo.removeDemo(id);
      log.success(`demo '${demoName}' archived`);
    }
  } catch (error) {
    throw `removeDemo failed: ${error}`;
  }
}

function openDemo(id: string, reuseWindow: boolean = false): void {
  try {
    const demoIndexItem = get(id);
    if (!demoIndexItem) {
      log.error(`The demo does not exist`);
      return;
    }

    const { name } = demoIndexItem;
    const demoPath = path.join(PATH.ROOT, name);
    execa('code-insiders', [demoPath, reuseWindow ? '-r' : '']);
    log.success('Demo', `'${name}'`, 'opened in', reuseWindow ? 'the last active VSCode window' : 'a new VSCode window');
  } catch (error) {
    throw `openDemo failed: ${error}`;
  }
}

export {
  createDemo,
  openDemo,
  removeDemo
};