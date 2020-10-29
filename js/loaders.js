export async function loadOctaveData() {
  const r = await fetch("../json/keys.json");
  return await r.json();
}

// //TODO
// export async function loadChordstoScreen() {
//   const r = await fetch("../json/chords.json");
//   const chords = await r.json();
//   // for (const chord of chords) {
//   //   let b = document.createElement('button');
//   //   //b.innerText = chord.
//   // }
// }


export async function loadChord() {
  const r = await fetch("../json/chords.json");
  return await r.json();  
}



function loadVerovio() {
  return fetch('http://www.verovio.org/javascript/develop/verovio-toolkit.js');
}