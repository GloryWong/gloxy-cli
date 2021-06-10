import * as types from '../lib/types';
import copy from 'recursive-copy';
import log from '@glorywong/log';
import conf from '../lib/conf';
import path from 'path';

export {
  init,
  hasInited
};

function hasInited(): boolean {
  return conf.has('root');
}

async function init(gsDemoPath: string = 'gsdemo'): Promise<boolean> {
  try {
    if (hasInited()) {
      log.info('GS Demo has existed.');
      return false;
    }

    const root = path.resolve(gsDemoPath);
    // Init gsdemo dir
    await copy(path.resolve(__dirname, '..', 'template'), root, {
      dot: true,
      debug: true
    });

    // create configuration
    conf.set('root', root);
    conf.set('description', 'My GS Demo');
    log.success(`GS Demo was created successfully located in ${root}.`);

    return true;
  } catch (error) {
    log.error('Failed to init GS Demo:', error);
    return false;
  }
}