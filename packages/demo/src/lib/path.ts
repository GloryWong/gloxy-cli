import { join } from 'path';

class Path {
  #root: string = '';
  set ROOT(val: string) {
    this.#root = val;
  }
  get ROOT(): string {
    return this.#root;
  }
  get STORAGE(): string {
    return join(this.#root, '.storage');
  }
  get LOG_DIR(): string {
    return join(this.#root, '.log');
  }
}

const path = new Path();
export default path;