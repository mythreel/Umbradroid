import Plugin from '../src/Plugin';

export default class Stats extends Plugin {
  constructor() {
    super();
  }
  run() {
    if (this.command === '!h') {
      this.message.channel.send('Hello');
    }
  }
}
