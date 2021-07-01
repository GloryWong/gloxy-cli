import { setInfo } from '../core/infoGSDemo';
import { unilog } from '@glorywong/unilog';

function lockGSDemo(lock: boolean) {
  unilog('Lock GSDemo');
  try {
    setInfo('locked', lock);
    unilog.succeed(`GS Demo was ${lock ? '' : 'un'}locked`);
  } catch (error) {
    unilog.fail(error);
  }
}

export {
  lockGSDemo
}