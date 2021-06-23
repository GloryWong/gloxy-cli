import copy from 'recursive-copy';
import log from '@glorywong/log';
import conf from '../lib/conf';
import path from 'path';
import PATH from '../lib/path';
import Listr from 'listr';

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
      return false;
    }

    const root = path.resolve(gsDemoPath);
    const { name: gsDemoName } = path.parse(root);

    const tasks = new Listr([
      {
        title: 'Init GS Demo dir',
        task: () => {
          return copy(path.resolve(__dirname, '..', 'template'), root, {
            dot: true
          });
        }
      },
      {
        title: 'Create configuration',
        task: () => {
          conf.set('root', root);
          conf.set('name', gsDemoName);
          conf.set('description', 'My GS Demo');
          PATH.ROOT = root;
        }
      }
    ]);

    await tasks.run();

    log.success(`GS Demo was created successfully located in \n${root}.`);

    return true;
  } catch (error) {
    log.error('Failed to init GS Demo:', error);
    return false;
  }
}