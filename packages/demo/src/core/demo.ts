import * as types from '../lib/types';
import storage from '../lib/storage';
import * as index from '../storage/index';
import { uid } from 'uid/secure';
import mkdirp from 'mkdirp';
import PATH from '../lib/path';
import path from 'path';
import { archive } from '../lib/utility';
import { DateTime } from 'luxon';

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

function removeDemo(id: string): void {
  try {
    const demo: types.Demo = storage.get(id, '');
    const { name: demoName } = demo;

    storage.remove(id);
    index.remove(id);

    // archive demo dir
    const { name: gsDemoName } = path.parse(PATH.ROOT);
    archive(path.join(PATH.ROOT, demoName), `${gsDemoName}.${demoName}.${id}`);
  } catch (error) {
    throw `removeDemo failed: ${error}`;
  }
}

export {
  createDemo,
  removeDemo
};