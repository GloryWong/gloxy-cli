import * as types from '../lib/types';
import storage from '../lib/storage';
import * as index from '../storage/index';
import { v4 as uuid } from 'uuid';

function createDemo(name: string) {
  const id = uuid();
  try {
    const demo: types.Demo = {
      id,
      name
    };
    storage.add(id, demo);
    index.add(id, {
      name
    });
  } catch (error) {
    storage.remove(id);
    index.remove(id);
    throw `createDemo failed: ${error}`;
  }
}

export {
  createDemo
};