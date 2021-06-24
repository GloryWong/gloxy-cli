import PATH from '../lib/path';
import conf from '../lib/conf';
import storage from '../lib/storage';
import { hasInited } from '../core/initGSDemo';
import log from '@glorywong/log';

export {
  initCLI,
  initCLIOrWarning
}

function initCLI() {
  try {
    // init PATH
    PATH.ROOT = String(conf.get('root'));

    // init storage
    storage.init(PATH.STORAGE);
  } catch (error) {
    throw `initCLI failed: ${error}`;
  }
}

function initCLIOrWarning(): boolean {
  try {
    if (hasInited()) {
      initCLI();
      return true;
    } else {
      log.warning('GS Demo does not exist, please init first.');
      return false;
    }
  } catch (error) {
    throw `initCLIOrWarning failed: ${error}`;
  }
}