function handleResponse(response) {
    if (!response.ok) {
        throw { response };
    }
    return response.json();
}

function handleError(error) {
    console.error("Error:", error);
}

function displayUnauthorizedError() {
    Swal.fire({
        icon: 'error',
        title: 'Unauthorized',
        text: 'Vous n\'êtes pas autorisé à effectuer cette action.',
    });
}

function displayUnexpectedError() {
    Swal.fire({
        icon: 'error',
        title: 'Unexpected Behaviour',
        text: 'Une comportement inattendu s\'est produit.',
    });
}

function displayGenericError() {
    Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Une erreur s\'est produite.',
    });}