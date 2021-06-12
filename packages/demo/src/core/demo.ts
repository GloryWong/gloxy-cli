import * as types from '../lib/types';
import storage from '../lib/storage';
import * as index from '../storage/index';
import { v4 as uuid } from 'uuid';
import mkdirp from 'mkdirp';
import PATH from '../lib/path';
import path from 'path';
import { archive } from '../lib/utility';
import { DateTime } from 'luxon';

function createDemo(name: string, tags: string[]) {
  const id = uuid();
  try {
    const demo: types.Demo = {
      id,
      name
    };

    // const tags: types.Tags = [];
    // if (tags.length) {
    //   //
    // }
    storage.add(id, demo);
    index.add(id, {
      name
    });

    // create demo dir
    mkdirp.sync(path.join(PATH.ROOT, id));
  } catch (error) {
    storage.remove(id);
    index.remove(id);
    throw `createDemo failed: ${error}`;
  }
}

function removeDemo(id: string): void {
  try {
    storage.remove(id);
    index.remove(id);

    // archive demo dir
    const { name: gsDemoName } = path.parse(PATH.ROOT);
    archive(path.join(PATH.ROOT, id), `${gsDemoName}.demo.${id}`);
  } catch (error) {
    throw `removeDemo failed: ${error}`;
  }
}

export {
  createDemo,
  removeDemo
};