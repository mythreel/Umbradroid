import Plugin from '../src/Plugin';

export default class Stats extends Plugin {
  constructor() {
    super();
  }
  run() {
    if (this.command === '!h') {
      this.message.channel.send('Hello');
    }
    if (this.command === '!s') {
      const user = this.lines[1];
      this.apiRequest('/api/bot/stats', 'POST', `user=${user}`, (reply) => {
        const msg = JSON.parse(reply);
        this.message.channel.send(msg.message);
      });
    }
  }
}
