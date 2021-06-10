import { LocalStorage } from 'node-localstorage';
import { v4 as uuid } from 'uuid';
import { STORAGE_DIR } from './constant';
import { Demo } from './types';
const storage = new LocalStorage(STORAGE_DIR);

const INDEX_NAME = '__demoIndex__';
const INDEX_DEFAULT_VALUE: Index = [];
type Index = Array<IndexItem>;
type IndexItem = {
  'id': string,
  'name': string
};

__initIndex();

export {
  addDemo,
  removeDemo,
  getIndex
};

function addDemo(demo: Demo): void {
  try {
    const id = uuid();
    storage.setItem(id, __str(demo));
    addToIndex(id, demo.name);
  } catch (error) {
    throw `addDemo failed: ${error}`;
  }
}

function removeDemo(id: string): void {
  try {
    storage.removeItem(id);
    removeFromIndex(id);
  } catch (error) {
    throw `removeDemo failed: ${error}`;
  }
}

function addToIndex(id: string, name: string) {
  try {
    const index = getIndex();
    const item: IndexItem = {
      id,
      name
    };
    index.push(item);
    storage.setItem(INDEX_NAME, __str(index));
  } catch (error) {
    throw `addToIndex failed: ${error}`;
  }
}

function removeFromIndex(id: string) {
  try {
    const index = getIndex();
    const i = index.findIndex((item) => item.id === id);
    index.splice(i, 1);
  } catch (error) {
    throw `removeFromIndex failed: ${error}`;
  }
}

function getIndex(): Index {
  try {
    const value = storage.getItem(INDEX_NAME);
    return value === null ? value : __par(value);
  } catch (error) {
    throw `getIndex failed: ${error}`;
  }
};

function searchIndex(name: string) {};

function __initIndex() {
  try {
    if (!getIndex()) {
      storage.setItem(INDEX_NAME, __str(INDEX_DEFAULT_VALUE));
    }
  } catch (error) {
    throw `__initIndex failed: ${error}`;
  }
}

function __str(value: any): string {
  try {
    return JSON.stringify(value);
  } catch (error) {
    throw `__str failed: ${error}`;
  }
}

function __par(value: string): any {
  try {
    return JSON.parse(value);
  } catch (error) {
    throw `__par failed: ${error}`;
  }
}