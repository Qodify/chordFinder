export default class ChordException {
  constructor(message, faultString) {
    this.message = message;
    this.faultString = faultString;
  }
  print() {
    console.error(this.message, this.faultString);

  }
}