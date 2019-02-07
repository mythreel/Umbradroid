import Discord from 'discord.js';
import fs from 'fs';
import Config from '../config.json';

class Bot {
  constructor() {
    this.plugins = [];
    const client = new Discord.Client();
    client.on('ready', () => {
      console.log('Connected.');
      this.loadPlugins();
    });
    client.on('message', (message) => {
      const lines = message.content.split(' ');
      const command = lines[0];
      this.runPlugins(message, command, lines);
    });
    client.on('error', (e) => console.error(e));
    client.on('warn', (e) => console.warn(e));
    client.on('debug', (e) => console.info(e));
    client.login(Config.token);
  }
  async runPlugins(message, command, lines) {
    await this.asyncForEach(Config.plugins, (item) => {
      this.plugins[item].setServices(message, command, lines);
      this.plugins[item].run();
    });
  }
  async loadPlugins() {
    if (Config.plugins.length < 1) {
      console.log('Error no plugins to run, one plugin is required.');
      process.exit(1);
    }
    await this.asyncForEach(Config.plugins, (element) => {
      fs.access(`plugins/${element}.js`, (err) => {
        if (!err) {
          if (!this.plugins[`${element}`]) {
            const plugin = new (require(`../plugins/${element}`).default)();
            this.plugins[`${element}`] = plugin;
          }
        }
      });
    });
  }
  async asyncForEach(array, callback) {
    for (let index = 0; index < array.length; index++) {
      await callback(array[index], index, array);
    }
  }
}

export default new Bot();
