import { getDemoIndex } from '../core/demoIndex';
import log from '@glorywong/log';
import { prompt } from 'inquirer';
import * as demo from './demo';

function listDemos(): void {
  try {
    const list = getDemoIndex();
    if (!list.length) {
      log.info('-- no demo --');
      return;
    }

    list.forEach(({ code, name }: { code: number, name: string }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
  } catch (error) {
    log.error('list demos failed:', error);
  }
}

async function chooseDemo(): Promise<void> {
  try {
    const list = getDemoIndex();
    if (!list.length) {
      log.info('-- no demo --');
      return;
    }

    listDemos();
    const { demoCode } = await prompt({
      type: 'input',
      name: 'demoCode',
      message: 'Choose a demo code to open:'
    });
    demo.openDemo(demoCode);
  } catch (error) {
    log.error('choose demo failed:', error);
  }
}

export {
  listDemos,
  chooseDemo
};