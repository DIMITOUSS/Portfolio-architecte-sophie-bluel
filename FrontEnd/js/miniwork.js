//modale sur l'affichage des travaux en miniature
export function renderMiniWorks(category) {
	const modalWrapper = document.createElement("div");
	modalWrapper.className = "miniGallery";
	const divider = document.querySelector(".divider");
//appel à API avec attente de réponse en JSON
	fetch("http://localhost:5678/api/works")
		.then((response) => {
			console.log(response.status);
	
			if (response.ok) {
				return response.json();
			} else {
				throw new Error("Erreur de la requête");
			}
		})
		//mettre en place chaque travaux dans works
		.then((works) => {
			//je cherche à mettre les flèches directionnelle sur la première image
			let isFirstImage = true;
			//
			works.forEach((work) => {
				//transformer en fonction!!!!
				const newFigure = document.createElement("figure");
				const newImage = document.createElement("img");
				const trashCan = document.createElement("i");
				trashCan.classList.add("fa-regular", "fa-trash-can", "deleteWork");
				newFigure.setAttribute("id", `edit-${work.id}`);

				newImage.src = work.imageUrl;
				newImage.alt = "Photo du projet";
// création d'une structure HTML avec image texte et corbeille

				//les flèches directionnelle doit être présent seulement sur la première image
				if (isFirstImage) {
					const arrowsIcon = document.createElement("i");
					arrowsIcon.classList.add("fa-solid", "fa-arrows-up-down-left-right");
					newFigure.appendChild(arrowsIcon);
					isFirstImage = false;
				}
				//
				newFigure.appendChild(newImage);
				const newFigcaption = document.createElement("figcaption");
				newFigcaption.innerText = "éditer";
				newFigure.append(trashCan);
				newFigure.appendChild(newFigcaption);
				modalWrapper.appendChild(newFigure);
				divider.insertAdjacentElement("beforeBegin", modalWrapper);

				// traitement des élèments supprimé
				 trashCan.addEventListener("click", function (e) {
                    e.preventDefault();
        const id = work.id;

        Swal.fire({
            title: 'Voulez-vous supprimer cet élément ?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Oui, supprimer',
            cancelButtonText: 'Annuler',
            timer:5000,
        }).then((result) => {
            if (result.isConfirmed) {
                deleteWorks(id);
            }
        });
    });

    // ...

    const deleteWorks = async function (id) {
        try {
            const response = await fetch(
                "http://localhost:5678/api/works/" + id,
                {
                    method: "DELETE",
                    headers: {
                        "content-type": "application/json",
                        Authorization: "Bearer " + sessionStorage.getItem("Token"),
                    },
                }
            );

            if (response.ok) {
                document.getElementById(`edit-${id}`).remove();
                Swal.fire({
                    icon: 'success',
                    title: 'Supprimé!',
                    text: 'L\'élément a été supprimé avec succès.',
                });
            } else {
                console.error("Error deleting work");
                Swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: 'Une erreur s\'est produite lors de la suppression.',
                });
            }
        } catch (error) {
            console.error("Error deleting work", error);
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Une erreur s\'est produite lors de la suppression.',
            });
        }
    };

    });

    })

}