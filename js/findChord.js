import { loadChord as loadChordsData } from './loaders.js';
import { readInput } from './Chord.js';
import ChordException from './ChordException.js';



async function findChord() {
  const chordsData = await loadChordsData();
  const chordInput = readInput(document.querySelector('input').value.trim());
  // const chord = new Chord(rootNote, afterRoot, rootNoteSlash, afterSlashRoot, exception);
  if (chordInput.exception) return chordInput;

  let matchChord;
  for (const chordData of chordsData) {
    for (const notation of chordData.notations) {
      if (chordInput.afterRoot === notation) {
        matchChord = chordInput.setIntervals(chordData.intervals);
        console.log(matchChord);
        return matchChord;
      }
    }
  }
  chordInput.exception = new ChordException('Chord not found!');

  return chordInput;
}

//export to listeners
export async function executeFindChord() {
  const chord = await findChord();

  if (chord.exception) {
    document.getElementById("errorMsg").innerText = chord.exception.message;
    return chord.exception.print();
  } else {
    document.getElementById("errorMsg").innerText = '';
    drawChord(chord);
  }
}





function makeAudioChord() {
  return {
    audios: [],
    play() {
      let audioLoop = (i) => {
        if (this.audios[i]) {
          this.audios[i].firstChild.nextSibling.cloneNode().play();
          setTimeout(() => audioLoop(i + 1), 50);
        }
      };
      audioLoop(0);
    }
  };
}


function drawChord(chord) {
  const audioChord = makeAudioChord();
  const liNodeList = document.querySelectorAll('#container li');
  let TraverseNodeLi;
  for (const li of liNodeList) {
    li.classList.remove('colorIn');
  }

  //color in and hear rootNote
  [...liNodeList].some(li => {
    if (li.id === chord.rootNote) {
      TraverseNodeLi = li;
      li.classList.add('colorIn');
      return true;
    }
  });
  audioChord.audios.push(TraverseNodeLi);


  for (const interval of chord.getIntervals()) {
    for (let i = 0; i < interval; i++) {
      TraverseNodeLi = TraverseNodeLi.nextSibling;
    }
    TraverseNodeLi.classList.add('colorIn');
    audioChord.audios.push(TraverseNodeLi);
  }

  audioChord.play();
}
