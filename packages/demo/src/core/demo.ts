import * as types from './types';
import { addDemo } from '../lib/storage';

function createDemo(name: string) {
  addDemo({
    name
  });
}

export {
  createDemo
}