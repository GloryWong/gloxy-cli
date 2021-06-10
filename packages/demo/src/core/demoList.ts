import * as types from '../lib/types';
import { getIndex } from '../lib/storage';

function getDemoList(): types.DemoList {
  try {
    const demoIndex = getIndex();
    return demoIndex.map((item, index) => (
      {
        ...item,
        code: index
      }
    ));
  } catch (error) {
    throw `get demo list failed: ${error}`;
  }
}

export {
  getDemoList
};