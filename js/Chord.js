import ChordException from './ChordException.js';

export class Chord {

  constructor(rootNote, afterRoot = "", rootNoteSlash, afterSlashRoot, exception) {
    this.rootNote = rootNote;
    this.afterRoot = afterRoot;
    if (rootNoteSlash == '') {
      this.rootNoteSlash = rootNoteSlash;
      this.afterRootSlash = afterSlashRoot;
      console.error(rootNoteSlash, afterSlashRoot);
    }
    this.exception = exception;
    this.slashRootNote = afterSlashRoot;
    console.log(this);
  }

  ChordInData(notation, chordData) {
    if (this.afterRoot === notation) {
      this.setIntervals(chordData.intervals);
      return this;
    }
  }

  setIntervals(intervals) {
    for (let i = 0; i < intervals.length; i++) {
      if (i == 0) this.third = intervals[i];
      if (i == 1) this.fifth = intervals[i];
      if (i == 2) this.seventh = intervals[i];
      if (i == 3) this.ninth = intervals[i];
    }
    return this;
  }

  getIntervals() {
    let intervals = [this.third, this.fifth];
    if (this.seventh) intervals.push(this.seventh);
    if (this.ninth) intervals.push(this.ninth);
    return intervals;
  }
}


export function readInput(input) {

  if (input.charCodeAt(0) < 65 || input.charCodeAt(0) > 71) //A to G https://unicode-table.com/en/#0047
  {
    exception = new ChordException(`${input} is not a valid rootnote, pick a letter between A and G, (A and G included)`,
      `could not analyze symbol "${input[0]}"`);
    return [rootNote, afterRoot, '', '', exception];
  }
  let { rootNote, afterRoot, exception } = getRootNote(input);
  if (afterRoot[0] === '/') {
    let { rootNoteSlash, afterSlashRoot } = getRootNote(afterRoot.slice(1));
    return new Chord(rootNote.slice(), afterRoot, rootNoteSlash, afterSlashRoot, exception);
  }

  return new Chord(rootNote, afterRoot, '', '', exception);
}

//TODO
function getRootNote(input) {
  let rootNote, afterRoot, exception;
  if (input[1] === '#') {
    switch (input[0]) {
      case 'E':
      case 'B':
        exception = new ChordException(` ${input} does not exist, pick a valid rootnote.`,
          `could not analyze symbol "${input}"`);
        return { rootNote: "", afterRoot: "", exception };

      default:
        rootNote = input.slice(0, 2);
    }
  }
  else if (input[1] === '♭') {
    switch (input[0]) {
      case 'F':
      case 'C':
        exception = new ChordException(` ${input} does not exist, pick a valid rootnote.`,
          `could not analyze symbol "${input}"`);
        return { rootNote: "", afterRoot: "", exception };
      default:
        rootNote = input.slice(0, 2);
        if (rootNote[0] === "A") {
          rootNote = "G#";
        } else {
          rootNote = String.fromCharCode(input.slice(0, 2).charCodeAt(0) - 1) + "#";
        }
    }
  } else {
    rootNote = input[0];
  }
  afterRoot = input.slice(rootNote.length);

  return { rootNote, afterRoot, exception };
}

