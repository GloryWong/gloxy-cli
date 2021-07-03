import copy from 'recursive-copy';
import { unilog } from '@gloxy/unilog';
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
 * @description: the **most important** first step for Studio.
 */
async function init(studioPath: string = process.env.STUDIO_DEFAULT_NAME!): Promise<boolean> {
  unilog('init Studio');
  try {
    if (hasInited()) {
      unilog.warn('Studio has existed.');
      return false;
    }

    const root = path.resolve(studioPath);
    const { name: studioName } = path.parse(root);

    const tasks = new Listr([
      {
        title: 'Init Studio dir',
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
          conf.set('name', studioName);
          conf.set('description', 'My Studio');
          conf.set('locked', true);
          PATH.ROOT = root;
        }
      }
    ]);

    await tasks.run();

    unilog.succeed(`Studio was created successfully located in \n${root}.`);

    return true;
  } catch (error) {
    unilog.fail('Failed to init Studio:', error);
    return false;
  }
}