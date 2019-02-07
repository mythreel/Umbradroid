export default class Plugin {
  setServices(message, command, lines) {
    this.message = message;
    this.command = command;
    this.lines = lines;
  }
  run() {
    // overwrite this.
  }
}
