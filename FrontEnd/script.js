const gallery = document.querySelector(".gallery");
const buttons = document.querySelector(".filter-buttons");
// Variable to store the selected category


let selectedCategory = "";

// Function to fetch and render works in the photo gallery

async function photoGallery() {
  const dataWorks = await fetch("http://localhost:5678/api/works");
  const works = await dataWorks.json();

  renderGallery(works);
}
// Function to render the photo gallery based on the selected category

function renderGallery(works) {
  gallery.innerHTML = ''; // Clear the gallery before rendering

  for (let i in works) {
    // If a category is selected and it doesn't match the work's category, skip this iteration
    if (selectedCategory && works[i].categoryId != selectedCategory) {
      continue;
    }

    const figure = document.createElement("figure");
    figure.setAttribute("data-category-id", works[i].categoryId);

    const image = document.createElement("img");
    const description = document.createElement("figcaption");

    image.src = works[i].imageUrl;
    image.alt = works[i].title;
    description.innerText = works[i].title;

    figure.appendChild(image);
    figure.appendChild(description);
    gallery.appendChild(figure);
  }
}


async function filterfunc() {
  const dataCategories = await fetch("http://localhost:5678/api/categories");
  const categories = await dataCategories.json();
  const allBtn = document.createElement('button');
  buttons.appendChild(allBtn);
  allBtn.textContent = 'Tous';

  allBtn.addEventListener("click", () => {
    selectedCategory = ""; // Reset the selected category
    photoGallery(); 
  });

  for (let i in categories) {
    const myBtn = document.createElement('button');
    buttons.appendChild(myBtn);
    myBtn.textContent = categories[i].name;
    myBtn.setAttribute("data-category-id", categories[i].id);

    myBtn.addEventListener("click", () => {
      selectedCategory = categories[i].id; // Set the selected category
      photoGallery(); // Call the photoGallery function again to re-render the gallery
    });
  }
}
 
filterfunc();
photoGallery();



document.addEventListener('DOMContentLoaded', function () {
  const tokenExists = sessionStorage.getItem('Token') !== null;
  // Check if a user is logged in (token exists)

  if (tokenExists) {
    setupAdminMode();
  }

  function setupAdminMode() {
    // Create and insert a modal link for admin actions

    const modalLink = createModalLink('admin-div', 'modifier');
    const portfolioSection = document.getElementById('portfolio');
    portfolioSection.insertAdjacentElement('afterbegin', modalLink);

      // Remove unnecessary elements for admin mode

    const projetsTitle = document.getElementById('portfolio').querySelector('h2')
    projetsTitle.remove()
    const buttonfilter = document.querySelector('.filter-buttons')
    buttonfilter.remove()

        // Create a new title and add it to the modal link

    const h2Title = document.createElement('h2');
    h2Title.innerText = 'Mes projets';

    const navBar = document.querySelector('header');
    navBar.classList.add('adminHeader');

    modalLink.prepend(h2Title);
    
    // Create and add admin navigation and logout button
 
    createAdminNav();
    logOutBtn();
  }

  function createModalLink(classModal, editText) {
    const editIcon = document.createElement('i');
    editIcon.classList.add('fa-regular', 'fa-pen-to-square'); // Adjust the class for the correct Font Awesome icon
    const pText = document.createElement('p');
    pText.innerHTML = editText;

    const modalDivLink = document.createElement('div');
    modalDivLink.classList.add('modal-div-link', 'js-modal');
    modalDivLink.appendChild(editIcon);
    modalDivLink.appendChild(pText);

    const newDivTitle = document.createElement('div');
    newDivTitle.className = classModal;
    newDivTitle.appendChild(modalDivLink);

    return newDivTitle;
  }
  function createAdminNav() {
    const adminBar = document.createElement('div');
    adminBar.classList.add('admin-bar');

    const penIcon = document.createElement('i');
    penIcon.classList.add('fa-regular', 'fa-pen-to-square');

    const editionModeText = document.createElement('p');
    editionModeText.textContent = 'Mode Edition';

    const publishButton = document.createElement('button');
    publishButton.textContent = 'publier les changements';

    adminBar.append(penIcon, editionModeText, publishButton);

    const navheader = document.querySelector('header');
    navheader.insertAdjacentElement('afterbegin', adminBar);
}

  function logOutBtn() {
    const logBtn = document.querySelector('header nav ul li:nth-child(3)');
    logBtn.innerText = 'Logout';
    logBtn.addEventListener('click', function () {
      sessionStorage.removeItem('Token');
      window.location.href = './';
    });
  }
    // Function to render mini works in the admin mode

  function renderMiniWorks(category) {
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "miniGallery";
    const deviderline = document.querySelector(".deviderline");
  
    // API call with JSON response
    fetch("http://localhost:5678/api/works")
        .then((response) => {
            console.log(response.status);
  
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erreur est servenue !");
            }
        })
        .then((works) => {
            let isFirstImage = true;
  
            works.forEach((work) => {
                const newFigure = document.createElement("figure");
                const newImage = document.createElement("img");
                const trashCan = document.createElement("i");
                trashCan.classList.add("fa-regular", "fa-trash-can", "deleteWork");
                newFigure.setAttribute("id", `edit-${work.id}`);
  
                newImage.src = work.imageUrl;
                newImage.alt = work.title;
  
                if (isFirstImage) {
                    const arrowsIcon = document.createElement("i");
                    arrowsIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");
                    newFigure.appendChild(arrowsIcon);
                    isFirstImage = false;
                }
  
                newFigure.appendChild(newImage);
                const newFigcaption = document.createElement("figcaption");
                newFigcaption.innerText = "éditer";
                newFigure.append(trashCan);
                newFigure.appendChild(newFigcaption);
                modalWrapper.appendChild(newFigure);
                deviderline.insertAdjacentElement("beforeBegin", modalWrapper);
  
                trashCan.addEventListener("click", function ( event) {
                  event.preventDefault;
                  event.stopPropagation;
                    const id = work.id;
                    console.log(id);
                    deleteWorks(id);
                    confirm("Voulez-vous supprimer cet élément ?")
                });
  
                const deleteWorks = async function (id) {
                  
                    const response = await fetch(
                        "http://localhost:5678/api/works/" + id,
                        {
                            method: "DELETE",
                            headers: {
                                "content-type": "application/json",
                                Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
                            },
                        }
                    );
  
                    if (response.ok) {
                        document.getElementById(`list-${id}`).remove();
                        document.getElementById(`edit-${id}`).remove();
                    } else {
                        Swal.fire({
                            icon: 'error',
                            title: 'Oops...',
                            text: 'Une erreur s\'est produite!',
                        });                    }
                };
            });
        })
        .catch((err) => {
            gallery.innerHTML = Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur s\'est produite!',
            });
        });
  }
  
  // Modal function
  function modalFunction() {
    function createModal() {
      const divTag = document.createElement("div");
      divTag.id = "modale";
      divTag.className = "modal d-none";
      divTag.setAttribute("aria-hidden", "true");
      divTag.setAttribute("role", "dialogue");
      const main = document.querySelector("main");
      main.appendChild(divTag);
      return divTag;
  }
  
    function createModalContent() {
        const newOuterDiv = document.createElement("div");
        newOuterDiv.classList.add("modal-content", "d-none");
  
        const newInnerDiv = document.createElement("div");
        newInnerDiv.classList.add("modal-wrapper");
  
        const closeX = document.createElement("span");
        closeX.className = "close";
        closeX.innerText = "x";
        const modalTitle = document.createElement("h3");
        modalTitle.innerText = "Galerie Photo";
  
        const deviderline = document.createElement("hr");
        deviderline.className = "deviderline";
  
        const addPhotoBtn = document.createElement("button");
        addPhotoBtn.innerText = "Ajouter une photo";
        addPhotoBtn.classList.add("next-page");
  
        addPhotoBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            const modalContent = document.querySelector('.modal-wrapper')
            modalContent.classList.add("d-none");
            const nextPage = document.querySelector('.modal-ajouter-wrapper')
            nextPage.classList.remove("d-none")
        });
  
        const deleteGalleryLink = document.createElement("a");
        deleteGalleryLink.innerText = "Supprimer la galerie";
  
        newOuterDiv.appendChild(closeX);
        newInnerDiv.appendChild(modalTitle);
        newInnerDiv.appendChild(deviderline);
        newInnerDiv.appendChild(addPhotoBtn);
        newInnerDiv.appendChild(deleteGalleryLink);
        newOuterDiv.appendChild(newInnerDiv);
  
        const modalDiv = document.getElementById("modale");
        modalDiv.appendChild(newOuterDiv);
  
        renderMiniWorks();
    }
  
    function openModal() {
      const modalHTML = document.querySelector(".admin-div");
      modalHTML.addEventListener("click", function (e) {
          e.preventDefault();
          showModal();
          console.log('clicked');
          closeModal()
      });
  }
  
  function closeModal() {
      const closeX = document.querySelector(".close");
      const modalOverlay = document.getElementById("modale");
  
      closeX.addEventListener("click", function () {
          hideModal();
      });
  
      window.addEventListener("click", function (event) {
          if (event.target == modalOverlay) {
              hideModal();
          }
      });
  }
  
  function showModal() {
      const modalTag = document.getElementById('modale');
      const modalContent = document.querySelector('.modal-content');
      modalTag.classList.remove("d-none");
      modalContent.classList.remove("d-none");
  }
  
  function hideModal() {
      const modalTag = document.getElementById('modale');
      const modalContent = document.querySelector('.modal-content');
      modalTag.classList.add("d-none");
      modalContent.classList.add("d-none");
  }
  
    createModal();
    createModalContent();
    addPhotoContent();
    openModal();
  
    function addPhotoContent() {
        const newOuterDiv = document.querySelector(".modal-content");
  
        const newInnerDiv = document.createElement("div");
        newInnerDiv.classList.add("modal-ajouter-wrapper", "d-none");
  
        const returnArrow = document.createElement("i");
        returnArrow.classList.add("return-arrow", "fa-solid", "fa-arrow-left-long");
        returnArrow.addEventListener("click", function () {
            previousPageModal()
        });
        newInnerDiv.appendChild(returnArrow);
  
        const modalTitle = document.createElement("h3");
        modalTitle.innerText = "Ajout Photo";
        newInnerDiv.appendChild(modalTitle);
  
        const addPhotoDiv = document.createElement("div");
        addPhotoDiv.classList.add("ajouter-photo-img-div");
        const addPhotoIcon = document.createElement("i");
        addPhotoIcon.classList.add(
            "fa-regular",
            "fa-image",
            "image-placeholder"
        );
  
        const addPhotoForm = document.createElement("form");
        addPhotoForm.setAttribute("enctype", "multipart/form-data");
        addPhotoForm.setAttribute("method", "post");
        addPhotoForm.setAttribute("name", "ajouterPhotoForm");
        addPhotoForm.setAttribute("id", "ajouterPhotoForm");
  
        const addPhotoBtn2 = document.createElement("input");
        addPhotoBtn2.setAttribute("name", "image");
        addPhotoBtn2.setAttribute("id", "image");
        addPhotoBtn2.classList.add("d-none");
        addPhotoBtn2.setAttribute("type", "file");
        const addPhotoLabel = document.createElement("label");
        addPhotoLabel.setAttribute("for", "image");
        addPhotoLabel.setAttribute("class", "ajouter-btn");
        addPhotoLabel.innerText = "+ Ajouter Photo";
  
        const addPhotoFormats = document.createElement("p");
        addPhotoFormats.classList.add("list-formats");
        addPhotoFormats.innerText = "jpg, png : 4mo max";
  
        const imagePreviewDiv = document.createElement("div");
        imagePreviewDiv.setAttribute("id", "image-preview-div");
        imagePreviewDiv.classList.add("d-none");
  
        addPhotoForm.appendChild(imagePreviewDiv);
  
        addPhotoLabel.appendChild(addPhotoBtn2);
        addPhotoDiv.appendChild(addPhotoIcon);
        addPhotoDiv.appendChild(addPhotoLabel);
        addPhotoDiv.appendChild(addPhotoFormats);
  
        addPhotoForm.appendChild(addPhotoDiv);
  
        const addPhotoTitleLabel = document.createElement("label");
        addPhotoTitleLabel.setAttribute("for", "title");
        addPhotoTitleLabel.innerText = "Titre";
        addPhotoTitleLabel.classList.add("titre", "titre-margin-top");
        newInnerDiv.appendChild(addPhotoTitleLabel);
        const addPhotoTitleInput = document.createElement("input");
        addPhotoTitleInput.setAttribute("type", "text");
        addPhotoTitleInput.required = true;
        addPhotoTitleInput.setAttribute("name", "title");
        addPhotoTitleInput.setAttribute("id", "title");
        addPhotoTitleInput.classList.add("titre");
  
        addPhotoTitleInput.addEventListener("input", function () {
            if (addPhotoTitleInput.value.trim() !== "" && addPhotoBtn2.files.length > 0) {
                validatePhotoBtn.classList.add("green-bg");
            } else {
                validatePhotoBtn.classList.remove("green-bg");
            }
        });
  
        addPhotoBtn2.addEventListener("change", function (e) {
            const file = e.target.files[0];
            const reader = new FileReader();
  
            reader.onload = function (event) {
                const imagePreview = document.createElement("img");
                imagePreview.setAttribute("id", "image-preview");
                imagePreview.src = event.target.result;
  
                const previewDiv = document.getElementById("image-preview-div");
                previewDiv.innerHTML = "";
                previewDiv.classList.remove("d-none");
                const imageInputDiv = document.querySelector(".ajouter-photo-img-div");
                imageInputDiv.classList.add("d-none");
  
                previewDiv.appendChild(imagePreview);
  
                if (addPhotoTitleInput.value.trim() !== "" && addPhotoBtn2.files.length > 0) {
                    validatePhotoBtn.classList.add("green-bg");
                } else {
                    validatePhotoBtn.classList.remove("green-bg");
                }
            };
  
            if (file) {
                reader.readAsDataURL(file);
            }
        });
  
        addPhotoForm.appendChild(addPhotoTitleLabel);
        addPhotoForm.appendChild(addPhotoTitleInput);
  
        const addPhotoCategorieLabel = document.createElement("label");
        addPhotoCategorieLabel.setAttribute("for", "category");
        addPhotoCategorieLabel.innerText = "Catégorie";
        addPhotoCategorieLabel.classList.add("titre", "titre-margin-top");
        addPhotoForm.appendChild(addPhotoCategorieLabel);
  
        const selectCategory = document.createElement("select");
        selectCategory.className = "select-category";
        selectCategory.setAttribute("id", "select-category");
        selectCategory.setAttribute("name", "category");
        addPhotoForm.appendChild(selectCategory);
  
        fetch("http://localhost:5678/api/categories")
            .then((response) => {
                console.log(response.status);
  
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error("Erreur de la requête");
                }
            })
  
            .then((categories) => {
                const selectCategory = document.getElementById("select-category");
                categories.forEach((category) => {
                    const newOption = document.createElement("option");
                    newOption.innerText = category.name;
                    newOption.setAttribute("value", category.id);
                    selectCategory.appendChild(newOption);
                });
            });
  
        const deviderline = document.createElement("hr");
        deviderline.classList.add("deviderline");
        addPhotoForm.appendChild(deviderline);
  
        const validatePhotoBtn = document.createElement("input");
        validatePhotoBtn.setAttribute("type", "submit");
        validatePhotoBtn.setAttribute("value", "Valider");
        validatePhotoBtn.classList.add("titre-margin-top", "valider-btn");
  
        addPhotoForm.addEventListener("submit", function (e) {
            e.preventDefault();
            if (addPhotoTitleInput.checkValidity()) {
                uploadWork();
                e.preventDefault();
            }
        });
  
        addPhotoForm.appendChild(validatePhotoBtn);
        newInnerDiv.appendChild(addPhotoForm);
  
        const modalHTML = document.getElementById("modale");
  
        newOuterDiv.appendChild(newInnerDiv);
        modalHTML.appendChild(newOuterDiv);
    }
  
    function toggleModals() {
      const modals = document.querySelectorAll(".modal-wrapper, .modal-ajouter-wrapper");
  
      modals.forEach(modal => {
          modal.classList.toggle('d-none');
      });
  }
  
  function previousPageModal() {
      toggleModals();
  }
  
  function uploadWork() {
    const addPhotoForm = document.getElementById("ajouterPhotoForm");
    const formData = new FormData(addPhotoForm);

    console.log(formData);

    fetch("http://localhost:5678/api/works/", {
        method: "POST",
        headers: {
            Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
        },
        body: formData,
    })
    .then(handleResponse)
    .then(addPhotoToGallery)
    .catch(handleError);
}

function handleResponse(response) {
    console.log(response.status);

    if (response.ok) {
        return response.json();
    } else {
        throw new Error("Erreur de la requête");
    }
}
function addPhotoToGallery(data) {
  const gallery = document.querySelector('.gallery');
  const miniGallery = document.querySelector('.miniGallery');

  const figureGallery = createFigure(data.imageUrl, data.title);
  const figureMiniGallery = figureGallery.cloneNode(true);

  gallery.appendChild(figureGallery);
  miniGallery.appendChild(figureMiniGallery);

  Swal.fire({
      icon: 'success',
      title: 'Photo téléchargé',
      text: 'La photo a été ajoutée à la galerie avec succès.',
      confirmButtonText: 'OK',
      confirmButtonColor: '#4CAF50',
      showConfirmButton: true,
      timer: 3000
  });
}
function createFigure(imageUrl, title) {
    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = imageUrl;
    const figcaption = document.createElement('figcaption');
    figcaption.innerText = title;

    figure.appendChild(img);
    figure.appendChild(figcaption);

    return figure;
}

function handleError(error) {
    console.error("Error:", error);
}
  }
  modalFunction();


});


