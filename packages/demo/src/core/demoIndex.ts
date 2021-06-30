import * as types from '../lib/types';
import * as index from '../storage/index';
import Fuse from 'fuse.js';

function getDemoIndex(): types.DemoIndex {
  try {
    const indexAll = index.getAll();
    const demoIndex: types.DemoIndex = indexAll.map(({ name, id }, i) => (
      {
        id,
        name,
        code: i // init code
      }
    ));

    return demoIndex;
  } catch (error) {
    throw `get demo list failed: ${error}`;
  }
}

function getDemoCount(): number {
  try {
    const indexAll = index.getAll();
    return indexAll.length;
  } catch (error) {
    throw `get demo count failed: ${error}`;
  }
}

function searchDemoIndex(str: string): types.DemoIndex {
  try {
    const demoIndex = getDemoIndex();
    const fuse = new Fuse(demoIndex, {
      includeScore: true,
      keys: ['name']
    });

    const result = fuse.search(str);

    return result.map(({ item }: { item: any }, i: number) => ({
      ...item,
      code: i // regenerate code for search result
    }));
  } catch (error) {
    throw `searchDemoIndex failed: ${error}`;
  }
}

export {
  getDemoIndex,
  searchDemoIndex,
  getDemoCount
};