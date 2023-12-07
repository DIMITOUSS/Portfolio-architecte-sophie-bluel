// main.js

// Import functions and variables from other modules
import { photoGallery, filterfunc, selectedCategory } from './gallery.js';
import { setupAdminMode, createModalLink, createAdminNav, logOutBtn, renderMiniWorks, modalFunction } from './admin.js';

document.addEventListener('DOMContentLoaded', function () {
  const tokenExists = sessionStorage.getItem('Token') !== null;

  if (tokenExists) {
    setupAdminMode();
    
  }

  filterfunc();
  photoGallery();
  modalFunction();


});
