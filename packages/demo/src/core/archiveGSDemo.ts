import conf from '../lib/conf';
import copy from 'recursive-copy';
import fs from 'fs';
import path from 'path';
import log from '@glorywong/log';
import * as utility from '../lib/utility';
import { DateTime } from 'luxon';
import Listr from 'listr';

async function archive(): Promise<any> {
  try {
    const root = String(conf.get('root'));
    const { name } = path.parse(root);

    const tasks = new Listr([
      {
        title: `Move GS Demo ${name} to archive`,
        task: () => {
          return utility.archive(root, `${name}.${DateTime.now()}`);
        }
      },
      {
        title: 'Delete \'root\' in configuration',
        task: () => {
          conf.delete('root');
        }
      }
    ]);

    return tasks.run();
  } catch (error) {
    throw `archive failed: ${error}`;
  }
}

export {
  archive
};