import * as types from '../lib/types';
import storage from '../lib/storage';
import { v4 as uuid } from 'uuid';

function createDemo(name: string) {
  try {
    const id = uuid();
    const demo: types.Demo = {
      id,
      name
    };
    storage.add(id, demo);
    storage.addToIndex(id, {
      name
    });
  } catch (error) {
    throw `createDemo failed: ${error}`;
  }
}

export {
  createDemo
};