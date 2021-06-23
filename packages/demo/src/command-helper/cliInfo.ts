import { readPackageJson } from '../lib/utility';

const { version: cliVersion, description: pkgDescription } = readPackageJson(['version', 'description']);
const cliDescription =
`Description: ${pkgDescription}`;

const cliUsage = `[optons] [command] [demoSelector]
  demoSelector: a \`demo code\` from the displayed demo list, opening a demo
                in a new editor window by default.
                Options:
                  * -r: open the demo in the last active editor window
                  * -a: archive the demo`;

export {
  cliVersion,
  cliDescription,
  cliUsage,
};