import * as types from '../lib/types';
import storage from '../lib/storage';
import * as index from '../storage/index';
import { uid } from 'uid/secure';
import mkdirp from 'mkdirp';
import PATH from '../lib/path';
import path from 'path';
import { archive } from '../command-helper/archive';
import Listr from 'listr';

// demo name should be unique in a GS Demo
function createDemo(name: string, tags?: string[]) {
  const id = uid();
  try {
    if (index.existsByName(name)) {
      throw `same name demo '${name}' already exists`;
    }

    const demo: types.Demo = {
      id,
      name
    };

    storage.add(id, demo);
    index.add(id, {
      name
    });

    // create demo dir
    mkdirp.sync(path.join(PATH.ROOT, name));
  } catch (error) {
    throw `createDemo failed: ${error}`;
  }
}

function archiveDemo(id: string): Promise<any> {
  try {
    const demo: types.Demo = storage.get(id, '');
    const { name: demoName } = demo;

    const tasks = new Listr([
      {
        title: `Remove '${demoName}' from Storage`,
        task: () => {
          storage.remove(id);
        }
      },
      {
        title: `Remove '${demoName}' from Index`,
        task: () => {
          index.remove(id);
        }
      },
      {
        title: `Move demo folder '${demoName}' to archive`,
        task: () => {
          const { name: gsDemoName } = path.parse(PATH.ROOT);
          return archive(path.join(PATH.ROOT, demoName), `${gsDemoName}.${demoName}.${id}`);
        }
      }
    ]);

    return tasks.run();
  } catch (error) {
    throw `archiveDemo failed: ${error}`;
  }
}

export {
  createDemo,
  archiveDemo
};