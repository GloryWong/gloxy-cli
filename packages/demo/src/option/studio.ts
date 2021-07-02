import { setInfo } from '../core/infoStudio';
import { unilog } from '@gloxy/unilog';

function lockStudio(lock: boolean) {
  unilog('Lock Studio');
  try {
    setInfo('locked', lock);
    unilog.succeed(`Studio was ${lock ? '' : 'un'}locked`);
  } catch (error) {
    unilog.fail(error);
  }
}

export {
  lockStudio
}