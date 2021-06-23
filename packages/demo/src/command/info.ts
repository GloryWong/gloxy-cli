import { Command } from 'commander';
import { initCLIOrWarning } from '../command-helper/init';
import log from '@glorywong/log';
import { getInfo } from '../core/infoGSDemo';
import boxen from 'boxen';
import { cliVersion } from '../command-helper/cliInfo';

new Command()
  .action(function() {
    try {
      if (!initCLIOrWarning()) {
        return;
      }

      const { location, name, description, demoCount } = getInfo();
      const info = `
        GSDemo CLI ${cliVersion}

        Present GS Demo:
          Name: ${name}
          Location: ${location}
          Description: ${description}
          Demo count: ${demoCount}
      `;
      console.log(boxen(info, { padding: 1, borderStyle: 'double' }));
    } catch (error) {
      log.error(`Output GSDemo info failed: ${error}`);
    }
  })
  .parse();