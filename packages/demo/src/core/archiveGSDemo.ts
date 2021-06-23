import PATH from '../lib/path';
import conf from '../lib/conf';
import { archive as archiveGSDemo } from '../command-helper/archive';
import { DateTime } from 'luxon';
import Listr from 'listr';

async function archive(archiveName?: string): Promise<any> {
  try {
    const root = PATH.ROOT;

    const tasks = new Listr([
      {
        title: `Move GS Demo folder '${archiveName}' to archive`,
        task: () => {
          return archiveGSDemo(root, `${archiveName}.${DateTime.now()}`);
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