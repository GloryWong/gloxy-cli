import { LocalStorage } from 'node-localstorage';
import conf from './conf';

// types
type Index = Array<IndexItem>;
type IndexItem = {
  'id': string,
  [key: string]: any
};

class Storage {
  #ls: any = null;
  // constants
  private INDEX_NAME: string= '__demoIndex__';
  private INDEX_DEFAULT_VALUE: Index = [];

  init(storagePath: string) {
    this.#ls = new LocalStorage(storagePath);

    if (!this.hasIndex()) {
      this.initIndex();
    }
  }

  private initIndex() {
    try {
      this.#ls.setItem(this.INDEX_NAME, this.str(this.INDEX_DEFAULT_VALUE));
      conf.set('indexName', this.INDEX_NAME);
    } catch (error) {
      throw `initIndex failed: ${error}`;
    }
  }

  private hasIndex() {
    try {
      return Boolean(conf.get('indexName'));
    } catch (error) {
      throw `hasIndex failed: ${error}`;
    }
  }

  add(id: string, value: any) {
    try {
      this.#ls.setItem(id, this.str(value));
    } catch (error) {
      throw `add failed: ${error}`;
    }
  }

  remove(id: string) {
    try {
      this.#ls.removeItem(id);
    } catch (error) {
      throw `remove failed: ${error}`;
    }
  }

  addToIndex(id: string, value: object) {
    try {
      const index: Index = this.all;
      const item: IndexItem = {
        id,
        ...value
      };
      index.push(item);
      this.#ls.setItem(this.INDEX_NAME, this.str(index));
    } catch (error) {
      throw `addToIndex failed: ${error}`;
    }
  }

  removeFromIndex(id: string) {
    try {
      const index = this.all;
      const i = index.findIndex((item) => item.id === id);
      index.splice(i, 1);
      this.#ls.setItem(this.INDEX_NAME, this.str(index));
    } catch (error) {
      throw `removeFromIndex failed: ${error}`;
    }
  }

  get all(): Index {
    try {
      return this.par(this.#ls.getItem(this.INDEX_NAME) || '[]');
    } catch (error) {
      throw `get all index failed: ${error}`;
    }
  }

  getIndexItem(id: string): IndexItem {
    try {
      const index = this.par(this.#ls.getItem(this.INDEX_NAME) || '[]');
      return index.find((item: IndexItem) => item.id === id);
    } catch (error) {
      throw `getIndex failed: ${error}`;
    }
  };

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