import * as types from '../lib/types';
import * as index from '../storage/index';

function getDemoIndex(): types.DemoIndex {
  try {
    const indexAll = index.getAll();
    const demoIndex: types.DemoIndex = indexAll.map((item, code) => (
      {
        name: item.name,
        code: code
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