import log from '@glorywong/log';
import PATH from '../lib/path';
import { getByCode } from '../storage/index';
import path from 'path';
import execa from 'execa';
import * as demo from '../core/demo';
import * as index from '../storage/index';
import { prompt } from 'inquirer';

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

function openDemo(code: number, reuseWindow: boolean = false): void {
  try {
    const demoIndexItem = getByCode(code);
    if (!demoIndexItem) {
      log.error(`demo with code '${code}' does not exist`);
      return;
    }

    const { id, name } = demoIndexItem;
    const demoPath = path.join(PATH.ROOT, id);
    execa.sync('code-insiders', [demoPath, reuseWindow ? '-r' : '']);
    log.success('Demo', `'${name}'`, 'was opened in', reuseWindow ? 'the last active VSCode window' : 'a new VSCode window');
  } catch (error) {
    throw `openDemo failed: ${error}`;
  }
}

export {
  createDemo,
  openDemo,
  removeDemo
};