import log from '@glorywong/log';
import PATH from '../lib/path';
import { getByCode } from '../storage/index';
import path from 'path';
import execa from 'execa';

function openDemo(code: number, reuseWindow: boolean = false): void {
  try {
    const demoIndexItem = getByCode(code);
    if (!demoIndexItem) {
      log.error(`demo with code '${code}' does not exist`);
      return;
    }

    const { id, name } = demoIndexItem;
    const demoPath = path.join(PATH.ROOT, id);
    execa.sync('code-insiders', [demoPath, reuseWindow ? '-r' : '']);
    log.success('Demo', `'${name}'`, 'was opened in', reuseWindow ? 'the last active VSCode window' : 'a new VSCode window');
  } catch (error) {
    throw `openDemo failed: ${error}`;
  }
}

export {
  openDemo
};