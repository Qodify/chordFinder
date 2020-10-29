import initializeKeyboard from './initialize.js';
import { addListeners } from './listeners.js';

document.addEventListener('DomContentLoaded', initializeKeyboard, false);

initializeKeyboard();
addListeners();

