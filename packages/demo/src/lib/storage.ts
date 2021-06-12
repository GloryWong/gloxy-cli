import { LocalStorage } from 'node-localstorage';
import conf from './conf';

class Storage {
  #ls: any = null;

  init(storagePath: string) {
    this.#ls = new LocalStorage(storagePath);
  }

  add(key: string, value: any) {
    try {
      if (!this.#ls.getItem(key)) {
        this.#ls.setItem(key, this.str(value));
      } else {
        throw `${key} already exists`;
      }
    } catch (error) {
      throw `add failed: ${error}`;
    }
  }

  set(key: string, value: any) {
    try {
      this.#ls.setItem(key, this.str(value));
    } catch (error) {
      throw `set failed: ${error}`;
    }
  }

  remove(key: string) {
    try {
      this.#ls.removeItem(key);
    } catch (error) {
      throw `remove failed: ${error}`;
    }
  }

  get(key: string, defaultValue: string) {
    try {
      return this.par(this.#ls.getItem(key) || defaultValue);
    } catch (error) {
      throw `get failed: ${error}`;
    }
  }

  protected str(value: any): string {
    try {
      return JSON.stringify(value);
    } catch (error) {
      throw `str failed: ${error}`;
    }
  }

  protected par(value: string): any {
    try {
      return JSON.parse(value);
    } catch (error) {
      throw `par failed: ${error}`;
    }
  }
}

const storage = new Storage();
export default storage;