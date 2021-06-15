import { getDemoIndex, searchDemoIndex } from '../core/demoIndex';
import log from '@glorywong/log';
import { prompt } from 'inquirer';
import * as demo from './demo';
import { DemoIndex } from '../lib/types';
import { openDemo } from './demo';
import * as types from '../lib/types';

function __listDemos(list: DemoIndex): boolean {
  try {
    if (!list.length) {
      log.info('-- none --');
      return false;
    }

    log.info('--------------------------------');
    list.forEach(({ code, name }: { code: number, name: string }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
    log.info('--------------------------------');

    return true;
  } catch (error) {
    throw `__listDemos failed: ${error}`;
  }
}

async function __chooseDemo(demoIndex: types.DemoIndex): Promise<boolean> {
  try {
    const { input } = await prompt({
      type: 'input',
      name: 'input',
      message: 'Choose a correct demo code to open (-r resue window):'
    });

    // parse input
    const matches = input.trim().match(/^(-r\s+)?(\d+)(\s+-r)?$/);
    if (!matches) {
      return false;
    }

    const reuseWindow = Boolean(matches[1]) || Boolean(matches[3]);
    const demoCode = matches[2];

    const demoIndexItem = demoIndex.find(({ code }) => Number(demoCode) === code);
    if (!demoIndexItem) {
      return false;
    }

    demo.openDemo(demoIndexItem.id, reuseWindow);
    return true;
  } catch (error) {
    throw `__chooseDemo failed: ${error}`;
  }
}

function listAllDemos() {
  try {
    const demoIndex = getDemoIndex();
    __listDemos(demoIndex);
  } catch (error) {
    log.error('list all demos failed:', error);
  }
}

function searchDemos(str: string): types.DemoIndex {
  try {
    const demoIndex = searchDemoIndex(str);
    __listDemos(demoIndex);
    return demoIndex;
  } catch (error) {
    log.error('search demo failed:', error);
    return [];
  }
}

async function searchAndChooseDemo(str: string) {
  try {
    const demoIndex = searchDemos(str);
    if (!await __chooseDemo(demoIndex)) {
      searchAndChooseDemo(str);
    }
  } catch (error) {
    log.error('search and choose demo failed:', error);
  }
}

export {
  listAllDemos,
  searchAndChooseDemo
};