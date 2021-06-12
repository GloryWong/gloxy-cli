import { getDemoIndex } from '../core/demoIndex';
import log from '@glorywong/log';

function listDemos(): void {
  try {
    const list = getDemoIndex();
    list.forEach(({ code, name }: { code: number, name: string }) => {
      log.info('[', 'success:', code, 'info:', ']', name);
    });
  } catch (error) {
    log.error('list demos failed:', error);
  }
}

export {
  listDemos
};