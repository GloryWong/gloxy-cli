import { readdirSync } from 'fs';
import * as log from '@glorywong/log';
import * as types from './lib/types';
import conf from './lib/conf';

function getDemoList(): types.DemoList {
  try {
    const dirs: string[] = readdirSync(String(conf.get('root')));
    return dirs.map((dirname, index) => ({
      id: '123',
      code: index,
      name: dirname,
      tags: [],
      path: ''
    }));
  } catch (error) {
    log.error('get demo list failed:', error);
    return [];
  }
}

export {
  getDemoList
};