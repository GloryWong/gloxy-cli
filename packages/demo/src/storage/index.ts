import storage from '../lib/storage';

// constants
const INDEX_NAME: string = '__gsDemoIndex__';
const INDEX_DEFAULT_VALUE: Index = [];

// types
type Index = Array<IndexItem>;
type IndexItem = {
  'id': string,
  [key: string]: any
};

export {
  add,
  get,
  remove,
  getAll
};

function add(id: string, value: object) {
  try {
    const index: Index = getAll();
    const item: IndexItem = {
      id,
      ...value
    };
    index.push(item);
    setAll(index);
  } catch (error) {
    throw `addToIndex failed: ${error}`;
  }
}

function get(id: string): IndexItem | undefined {
  try {
    const index: Index = getAll();
    return index.find((item: IndexItem) => item.id === id);
  } catch (error) {
    throw `get failed: ${error}`;
  }
};

function remove(id: string) {
  try {
    const index = getAll();
    const i = index.findIndex((item) => item.id === id);
    index.splice(i, 1);
    setAll(index);
  } catch (error) {
    throw `removeFromIndex failed: ${error}`;
  }
}

function getAll(): Index {
  try {
    return storage.get(INDEX_NAME, JSON.stringify(INDEX_DEFAULT_VALUE));
  } catch (error) {
    throw `getAll failed: ${error}`;
  }
}

function setAll(value: Index) {
  try {
    storage.set(INDEX_NAME, value);
  } catch (error) {
    throw `setAll failed: ${error}`;
  }
}