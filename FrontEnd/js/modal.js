import { renderMiniWorks } from "./miniwork.js";

export function modalFunction() {
    // Function to create and append the modal element
    const createModal = function () {
        const modalDiv = document.createElement("div");
        modalDiv.id = "modal1";
        modalDiv.classList.add("modal", "d-none");
        modalDiv.setAttribute("aria-hidden", true);
        modalDiv.setAttribute("role", "dialog");
        modalDiv.setAttribute("tabindex", "-1");
        modalDiv.setAttribute("aria-labelledby", "modalTitle");
        modalDiv.setAttribute("aria-describedby", "modalDescription");

        const main = document.querySelector("main");
        main.appendChild(modalDiv);

        return modalDiv;
    };

    // Function to create modal content
    function createModalContent() {
        const modalDiv = createModal();

        const modalContentDiv = document.createElement("div");
        modalContentDiv.classList.add("modal-content", "d-none");

        const modalWrapperDiv = document.createElement("div");
        modalWrapperDiv.classList.add("modal-wrapper");

        const closeX = document.createElement("span");
        closeX.className = "close";
        closeX.innerText = "x";

        const modalTitle = document.createElement("h3");
        modalTitle.innerText = "Galerie Photo";

        const divider = document.createElement("hr");
        divider.className = "divider";

        const addPhotoBtn = document.createElement("button");
        addPhotoBtn.innerText = "Ajouter une photo";
        addPhotoBtn.classList.add("next-page");

        // Button to navigate to the next page of the modal
        addPhotoBtn.addEventListener("click", function (e) {
            e.stopPropagation();
            e.preventDefault();
            const modalContent = document.querySelector('.modal-wrapper');
            modalContent.classList.add("d-none");
            const nextPage = document.querySelector('.modal-ajouter-wrapper');
            nextPage.classList.remove("d-none");
        });

        const deleteGalleryLink = document.createElement("a");
        deleteGalleryLink.innerText = "Supprimer la galerie";

        modalWrapperDiv.appendChild(closeX);
        modalWrapperDiv.appendChild(modalTitle);
        modalWrapperDiv.appendChild(divider);
        modalWrapperDiv.appendChild(addPhotoBtn);
        modalWrapperDiv.appendChild(deleteGalleryLink);
        modalContentDiv.appendChild(modalWrapperDiv);

        const modalHTML = document.getElementById("modal1");
        modalHTML.appendChild(modalContentDiv);

        renderMiniWorks();
    }

    // Function to open the modal
    function openModal() {
        const modalHTML = document.querySelector(".admin-div");
        modalHTML.addEventListener("click", function (e) {
            e.preventDefault();
            const modalTag = document.getElementById('modal1');
            const modalContent = document.querySelector('.modal-content');
            modalTag.classList.remove("d-none");
            modalContent.classList.remove("d-none");
        });
    }

    // Function to close the modal
    function closeModal() {
        const closeX = document.querySelector(".close");
        const modalOverlay = document.getElementById("modal1");

        closeX.addEventListener("click", function () {
            closeOrHideModal();
        });

        window.addEventListener("click", function (event) {
            if (event.target == modalOverlay) {
                closeOrHideModal();
            }
        });
    }

    // Function to either close or hide the modal and its content
    function closeOrHideModal() {
        const modalTag = document.getElementById('modal1');
        const modalContent = document.querySelector('.modal-content');
        modalTag.classList.add("d-none");
        modalContent.classList.add("d-none");
    }
	

	function addPhotoContent() {
		const newOuterDiv = document.querySelector(".modal-content");

		const newInnerDiv = document.createElement("div");
		newInnerDiv.classList.add("modal-ajouter-wrapper", "d-none");
		//return arrow
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
//form to add pictures
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
       
            e.preventDefault();
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
		  //mettre le bouton en vert seulement si le formulaire est rempli
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
        const selectCategory = document.createElement("select");
        selectCategory.className = "select-category";
        selectCategory.setAttribute("id", "select-category");
        selectCategory.setAttribute("name", "category");
        
        // Create a default placeholder option
        const placeholderOption = document.createElement("option");
        placeholderOption.text = "Select a category";
        placeholderOption.disabled = true;
        placeholderOption.selected = true; // Make it selected by default
        selectCategory.appendChild(placeholderOption);
        
        addPhotoForm.appendChild(selectCategory);
        
        // Fetch categories only when the user interacts with the select element
        selectCategory.addEventListener("click", () => {
            // Check if options have already been loaded
            if (selectCategory.childElementCount === 1) {
                fetch("http://localhost:5678/api/categories")
                    .then(handleResponse)
                    .then((categories) => {
                        // Remove the placeholder option
                        selectCategory.removeChild(placeholderOption);
        
                        // Populate the select element with fetched categories
                        categories.forEach((category) => {
                            const newOption = document.createElement("option");
                            newOption.innerText = category.name;
                            newOption.setAttribute("value", category.id);
                            selectCategory.appendChild(newOption);
                        });
                    });
            }
        });
        
	
		const divider = document.createElement("hr");
		divider.classList.add("divider");
		addPhotoForm.appendChild(divider);

		const validatePhotoBtn = document.createElement("input");
		validatePhotoBtn.setAttribute("type", "submit");
		validatePhotoBtn.setAttribute("value", "Valider");
		validatePhotoBtn.classList.add("titre-margin-top", "valider-btn");
		
		addPhotoForm.addEventListener("submit", function (e) {
            if (addPhotoTitleInput.checkValidity()) {
                Swal.fire({
                    title: 'Êtes-vous sûr de vouloir télécharger cette photo ?',
                    icon: 'question',
                    showCancelButton: true,
                    confirmButtonColor: '#3085d6',
                    cancelButtonColor: '#d33',
                    confirmButtonText: 'Oui, télécharger',
                    cancelButtonText: 'Annuler',
                }).then((result) => {
                    if (result.isConfirmed) {
                        uploadWork();
                    }
                });
                e.preventDefault();
            }
        });

		addPhotoForm.appendChild(validatePhotoBtn);
		newInnerDiv.appendChild(addPhotoForm);

		const modalHTML = document.getElementById("modal1");

		newOuterDiv.appendChild(newInnerDiv);
		modalHTML.appendChild(newOuterDiv);

	}


	//navigate to previous page
	function previousPageModal() {

		const divToHide = document.querySelector(".modal-ajouter-wrapper");
		divToHide.classList.add('d-none');
		const divToShow = document.querySelector(".modal-wrapper");
		divToShow.classList.remove('d-none');
	}
    function uploadWork() {
        const addPhotoForm = document.getElementById("ajouterPhotoForm");
        const formData = new FormData(addPhotoForm);
    
    
        fetch("http://localhost:5678/api/works/", {
            method: "POST",
            headers: {
                Authorization: "Bearer " + window.sessionStorage.getItem("Token"),
            },
            body: formData,
        })
        .then(handleResponse)
        .then((data) => {
            renderWorks(data);
            displaySuccessMessage();
        })
        .then(closeModal)
        .catch(handleError);
    }
    
    // Function to handle the response from the server
    function handleResponse(response) {
        console.log(response.status);
    
        if (response.ok) {
            return response.json();
        } else {
            throw new Error("Erreur de la requête");
        }
    }
    
    // Function to render the uploaded works in the gallery
    function renderWorks(data) {
        const gallery = document.querySelector('.gallery');
        const miniGallery = document.querySelector('.miniGallery');
        
        const figureGallery = document.createElement('figure');
        const title = document.createElement('figcaption');
        const img = document.createElement('img');
        
        img.src = data.imageUrl;
        title.innerText = data.title;
    
        figureGallery.appendChild(img);
        figureGallery.appendChild(title);
        gallery.appendChild(figureGallery);
    
        const figureClone = figureGallery.cloneNode(true);
        miniGallery.appendChild(figureClone);
    
        console.log("Success:", data);
    }
    
    // Function to display success message using Swal library
    function displaySuccessMessage() {
        Swal.fire({
            icon: 'success',
            title: 'Succès!',
            text: 'Photo téléchargée avec succès.',
        });
    }
    
    // Function to handle errors during the upload process
    function handleError(error) {
        console.error("Error:", error);
    }
    
    
    // Call the functions to set up the modal
    createModal();
    createModalContent();
    addPhotoContent();
    openModal();
    closeModal();
}