import { getDemoIndex } from '../core/demoIndex';
import log from '@glorywong/log';
import { prompt } from 'inquirer';
import * as demo from './demo';

function listDemos(): boolean {
  try {
    const list = getDemoIndex();
    if (!list.length) {
      log.info('-- no demo --');
      return false;
    }

    log.info('--------------------------------');
    list.forEach(({ code, name }: { code: number, name: string }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
    log.info('--------------------------------');

    return true;
  } catch (error) {
    log.error('list demos failed:', error);
    return false;
  }
}

async function chooseDemo(): Promise<void> {
  try {
    if (!listDemos()) {
      return;
    }

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