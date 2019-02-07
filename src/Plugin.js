import Config from '../config.json';
import http from 'https';
export default class Plugin {
  setServices(message, command, lines) {
    this.message = message;
    this.command = command;
    this.lines = lines;
  }
  run() {
    // overwrite this.
  }
  apiRequest(url, method, data, callback) {
    const options = {
      hostname: Config.url,
      port: 443,
      path: url,
      method,
      headers: {
      },
    };
    if (method.toLowerCase() === 'post') {
      options.headers['Content-Type'] = 'application/x-www-form-urlencoded';
      options.headers['Content-Length'] = Buffer.byteLength(data);
    }
    const req = http.request(options, (res) => {
      res.setEncoding('utf-8');
      res.on('data', (chunk) => {
        callback(chunk);
      });
    });
    req.on('error', (err) => {
      callback(err);
    });
    req.write(data);
    req.end();
  }
}
