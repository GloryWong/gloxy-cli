import { Command } from 'commander';
import { initCLIOrWarning } from '../command-helper/init';
import log from '@glorywong/log';
import { getInfo } from '../core/infoGSDemo';
import boxen from 'boxen';
import { gsDemoVersion, gsDemoDescription} from '../command-helper/info';

new Command()
  .action(function() {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      const { root, name, description } = getInfo();
      const info = `
        GSDemo CLI ${gsDemoVersion}

        Current GS Demo:
          Name: ${name}
          Location: ${root}
          Description: ${description}
      `;
      console.log(boxen(info, { padding: 1, borderStyle: 'double' }));
    } catch (error) {
      log.error(`Output GSDemo info failed: ${error}`);
    }
  })
  .parse();