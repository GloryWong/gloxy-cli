import log from '@glorywong/log';
import PATH from '../lib/path';
import { get } from '../storage/index';
import path from 'path';
import execa from 'execa';
import * as demo from '../core/demo';
import * as index from '../storage/index';
import { prompt } from 'inquirer';
import chalk from 'chalk';

async function createDemo(name: string): Promise<void> {
  try {
    const id = demo.createDemo(name);

    const { question } : { question: boolean } = await prompt({
      type: 'confirm',
      name: 'question',
      message: `Created successfully. Wanna open demo ${chalk.yellow(name)} in new window?`
    });

    if (question) {
      openDemo(id);
    }
  } catch (error) {
    log.error('Create demo failed:', error);
  }
}

async function archiveDemo(id: string): Promise<void> {
  try {
    const demoIndexItem = index.get(id);
    if (!demoIndexItem) {
      log.error(`The demo does not exist`);
      return;
    }

    const { name: demoName } = demoIndexItem;

    const { question }: { question: boolean } = await prompt({
      type: 'confirm',
      name: 'question',
      message: `Are you sure to archive demo '${demoName}'?`
    });

    if (question) {
      await demo.archiveDemo(id);
      log.success(`demo '${demoName}' archived`);
    }
  } catch (error) {
    throw `archiveDemo failed: ${error}`;
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
  archiveDemo
};