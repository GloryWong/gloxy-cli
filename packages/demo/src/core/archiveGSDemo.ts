import conf from '../lib/conf';
import copy from 'recursive-copy';
import fs from 'fs';
import path from 'path';
import { DateTime } from 'luxon';
import log from '@glorywong/log';

async function archive() {
  try {
    const root = String(conf.get('root'));
    const { name } = path.parse(root);

    // move GS Demo to archive
    const archivedPath = path.join(process.env.HOME || '', '.gsdemo-archive', `${name}.${DateTime.now()}`);
    await copy(root, archivedPath);
    fs.rmdirSync(root, {
      recursive: true
    });
    
    // delete 'root' in conf
    conf.delete('root');
  } catch (error) {
    throw `archive failed: ${error}`;
  }
}

export {
  archive
};