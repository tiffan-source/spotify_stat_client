import chalk from 'chalk';

const Logging = {
  log: function (args: any) {
    this.info(args);
  },
  info: (args: any) => {
    console.log(
      chalk.blue(`[${new Date().toLocaleString()}] [INFO]`),
      typeof args === 'string' ? chalk.blueBright(args) : args,
    );
  },
  warning: (args: any) => {
    console.log(
      chalk.yellow(`[${new Date().toLocaleString()}] [WARN]`),
      typeof args === 'string' ? chalk.yellowBright(args) : args,
    );
  },
  error: (args: any) => {
    console.log(
      chalk.red(`[${new Date().toLocaleString()}] [ERROR]`),
      typeof args === 'string' ? chalk.redBright(args) : args,
    );
  },
};

export default Logging;
