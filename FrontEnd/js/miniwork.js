export function renderMiniWorks() {
    // Create a modal wrapper element
    const modalWrapper = document.createElement("div");
    modalWrapper.className = "miniGallery";

    // Find the divider element
    const divider = document.querySelector(".divider");

    // Fetch works data from the API
    fetch("http://localhost:5678/api/works")
        .then((response) => {
            console.log(response.status);

            if (response.ok) {
                return response.json();
            } else {
                throw new Error("Erreur de la requête");
            }
        })
        .then((works) => {
            let isFirstImage = true;

            works.forEach((work) => {
                // Create elements for each work
                const newFigure = document.createElement("figure");
                const newImage = document.createElement("img");
                const trashCan = document.createElement("i");

                // Set attributes and classes
                newFigure.setAttribute("id", `edit-${work.id}`);
                trashCan.classList.add("fa-regular", "fa-trash-can", "deleteWork");

                // Set image source and alt text
                newImage.src = work.imageUrl;
                newImage.alt = "Photo du projet";

                // Add arrows icon to the first image
                if (isFirstImage) {
                    const arrowsIcon = document.createElement("i");
                    arrowsIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");
                    newFigure.appendChild(arrowsIcon);
                    isFirstImage = false;
                }

                // Append image and caption elements
                newFigure.appendChild(newImage);
                const newFigcaption = document.createElement("figcaption");
                newFigcaption.innerText = "éditer";
                newFigure.appendChild(trashCan);
                newFigure.appendChild(newFigcaption);
                modalWrapper.appendChild(newFigure);
                divider.insertAdjacentElement("beforeBegin", modalWrapper);

                // Add event listener for deleting works
                trashCan.addEventListener("click", function (e) {
                    e.preventDefault();
                    const id = work.id;

                    // Confirm deletion with a Swal (SweetAlert) dialog
                    Swal.fire({
                        title: 'Voulez-vous supprimer cet élément ?',
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#d33',
                        cancelButtonColor: '#3085d6',
                        confirmButtonText: 'Oui, supprimer',
                        cancelButtonText: 'Annuler',
                        timer: 5000,
                    }).then((result) => {
                        if (result.isConfirmed) {
                            deleteWork(id);
                        }
                    });
                });
            });
        })
        .catch((error) => {
            console.error("Error fetching or processing works", error);
        });

    // Function to delete a work
    const deleteWork = async function (id) {
        try {
            const response = await fetch(
                `http://localhost:5678/api/works/${id}`,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        Authorization: `Bearer ${sessionStorage.getItem("Token")}`,
                    },
                }
            );

            if (response.ok) {
                // Remove the deleted work element from the DOM
                document.getElementById(`edit-${id}`).remove();

                // Show a success Swal alert
                Swal.fire({
                    icon: 'success',
                    title: 'Supprimé!',
                    text: 'L\'élément a été supprimé avec succès.',
                });
            } else {
                console.error("Error deleting work");
                // Show an error Swal alert
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Une erreur s\'est produite lors de la suppression.',
                });
            }
        } catch (error) {
            console.error("Error deleting work", error);
            // Show an error Swal alert
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur s\'est produite lors de la suppression.',
            });
        }
    };
}
