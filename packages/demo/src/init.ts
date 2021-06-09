import * as types from './lib/types';
import copy from 'recursive-copy';
import log from '@glorywong/log';
import conf from './lib/conf';
import path from 'path';

function hasInited(): boolean {
  return conf.has('root');
}

async function initGSDemo(gsDemoPath: string): Promise<boolean> {
  try {
    if (hasInited()) {
      log.info('GS Demo has existed.');
      return false;
    }

    if (!gsDemoPath) {
      gsDemoPath = 'gsdemo';
    }

    const root = path.resolve(gsDemoPath);
    // Init gsdemo dir
    await copy('lib/template', root, {
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

export {
  initGSDemo,
  hasInited
};