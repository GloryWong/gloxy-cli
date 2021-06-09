import path from 'path';
import configStore from './configStore';

const ROOT = configStore.get('root');
const CACHE_DIR = path.join(ROOT, '.cache');
const LOG_DIR = path.join(ROOT, '.log');

export {
  ROOT,
  CACHE_DIR,
  LOG_DIR
};