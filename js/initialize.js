import { loadOctaveData } from "./loaders.js";

export default function initializeKeyboard(loadAudio = true) {
  loadOctaveData().then(octave => {
    let sampleCount = 25;
    const containerUl = document.querySelector('#container');
    [1, 2, 3].forEach(() => {
      for (const key of octave) {
        const keyLi = document.createElement('li');
        keyLi.innerText = key.note;
        keyLi.id = key.note;
        if (key.isWhite) keyLi.classList.add('whiteKey');
        else keyLi.classList.add('blackKeySharp');


        if (loadAudio === true) {
          const audio = document.createElement('audio');
          audio.setAttribute('src', `../samples/piano - (${sampleCount++}).ogg`);
          keyLi.appendChild(audio);

          keyLi.onmousedown = () => {
            if (keyLi.firstChild.nextSibling) {
              const keyLiAudio = keyLi.firstChild.nextSibling.cloneNode();
              keyLiAudio.play();

            }
          };
        }
        containerUl.appendChild(keyLi);
      }
    });
  });
}

