import * as types from '../lib/types';
import storage from '../lib/storage';

function getDemoIndex(): types.DemoIndex {
  try {
    const index = storage.all;
    const demoIndex: types.DemoIndex = index.map((item, index) => (
      {
        name: item.name,
        code: index
      }
    ));

    return demoIndex;
  } catch (error) {
    throw `get demo list failed: ${error}`;
  }
}

export {
  getDemoIndex
};