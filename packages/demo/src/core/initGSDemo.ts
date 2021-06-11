import copy from 'recursive-copy';
import log from '@glorywong/log';
import conf from '../lib/conf';
import path from 'path';
import PATH from '../lib/path';

export {
  init,
  hasInited
};

function hasInited(): boolean {
  return conf.has('root');
}

/**
 * @description: the **most important** first step for GS Demo.
 */
async function init(gsDemoPath: string = 'gsdemo'): Promise<boolean> {
  try {
    if (hasInited()) {
      log.warning('GS Demo has existed.');
      process.exit(1);
      return false;
    }

    const root = path.resolve(gsDemoPath);
    // Init gsdemo dir
    await copy(path.resolve(__dirname, '..', 'template'), root, {
      dot: true
    });
    log.info('1. Copied template.');

    // create configuration
    conf.set('root', root);
    conf.set('description', 'My GS Demo');
    PATH.ROOT = root;
    log.info('2. Wrote root to conf');

    log.success(`GS Demo was created successfully located in \n${root}.`);

    return true;
  } catch (error) {
    log.error('Failed to init GS Demo:', error);
    return false;
  }
}