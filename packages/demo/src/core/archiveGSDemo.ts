import conf from '../lib/conf';
import copy from 'recursive-copy';
import fs from 'fs';
import path from 'path';
import log from '@glorywong/log';
import * as utility from '../lib/utility';
import { DateTime } from 'luxon';

async function archive() {
  try {
    const root = String(conf.get('root'));
    const { name } = path.parse(root);

    // move GS Demo to archive
    await utility.archive(root, `${name}.${DateTime.now()}`);
    
    // delete 'root' in conf
    conf.delete('root');
  } catch (error) {
    throw `archive failed: ${error}`;
  }
}

export {
  archive
};