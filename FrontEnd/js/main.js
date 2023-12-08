// main.js

// Import functions and variables from other modules
import { photoGallery, filterfunc, selectedCategory } from './gallery.js';
import { setupAdminMode, createModalLink, createAdminNav, logOutBtn } from './admin.js';
import {modalFunction} from "./modal.js"

document.addEventListener('DOMContentLoaded', function () {
  const tokenExists = sessionStorage.getItem('Token') !== null;

  if (tokenExists) {
    setupAdminMode();
    modalFunction();

    
  }

  filterfunc();
  photoGallery();


});
