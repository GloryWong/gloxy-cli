# `@glorywong/demo`

**Demo CLI**

Create and manage local demos in one place instantly and smoothly.

# Install

```sh
npm -g i @glorywong/demo
```
or
```sh
yarn global add @glorywong/demo
```

# Usage

```sh
gsdemo --help

Usage: gsdemo [optons] [command] [demoSelector]
  demoSelector: a `demo code` from the displayed demo list, opening a demo
                in a new editor window by default.
                Options:
                  * -r: open the demo in the last active editor window
                  * -a: archive the demo

Description: Create and manage local demos in one place instantly and smoothly.

Options:
  -V, --version        output the version number
  -l, --list           list all demos
  -c, --create <name>  create a demo
  --tag <tags...>      use tags
  --lock               lock GS Demo
  --no-lock            unlock GS Demo
  -h, --help           display help for command

Commands:
  init [path]          Init a GS Demo
  archive              Archive existing GS Demo
  info                 Display GS Demo information
```
