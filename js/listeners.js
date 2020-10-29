import { executeFindChord } from "./findChord.js";

export function addListeners(){
  addFormListeners();
  addInsertSymbolButtonsListener();
  addToggleSoundListener();
}

function addFormListeners() {
  document.getElementById('goBtn').addEventListener('click', () => {
    executeFindChord();
  });

  document.querySelector('#findChordForm').addEventListener('submit', function (e) {
    e.preventDefault();
    executeFindChord();

  });
}

function addInsertSymbolButtonsListener() {



  // document.getElementById('inputBox').addEventListener('keydown', (e) => {
  //   if (e.keyCode == 13)
  //     e.preventDefault();

  // });


  function typeInTextarea(newText, el = document.activeElement) {
    const [start, end] = [el.selectionStart, el.selectionEnd];
    try { //TODO
      el.setRangeText(newText, start, end, 'end');
    } catch { }

  }

  document.getElementById('diminishedBtn').onmousedown = e => {
    e.preventDefault();
    typeInTextarea('o');
  };
  document.getElementById('halfDiminishedBtn').onmousedown = e => {
    e.preventDefault();
    typeInTextarea('ø');
  };
  document.getElementById('flat').onmousedown = e => {
    e.preventDefault();
    typeInTextarea('♭');
  };
  document.getElementById('delta').onmousedown = e => {
    e.preventDefault();
    typeInTextarea('Δ');
  };

  // document.getElementById('inputBox').addEventListener('focusout', e => {
  //   const buttons = document.querySelectorAll('button');
  //   for (const button of buttons) {
  //     button.disabled = true;
  //   }
  // });
  // document.getElementById('inputBox').addEventListener('focusin', e => {
  //   const buttons = document.querySelectorAll('button');
  //   for (const button of buttons) {
  //     button.disabled = false;
  //   }
  // });

}

export function addToggleSoundListener() { //TODO
  // document.getElementById('sound-button').onmousedown = () => {
  //   const liNodeList = document.querySelectorAll('#container li');
  //   for (const li of liNodeList) {
  //     //li.firstChild.nextSibling.onmousedown = () => { };
  //     li.firstChild.nextSibling.muted = true;
  //     //li.firstChild.nextSibling.remove();
  //   }
  //   //init(false)
  //};
}