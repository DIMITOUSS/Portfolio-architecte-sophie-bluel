

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
    editIcon.classList.add('fa-regular', 'fa-pen-to-square');

    // Adjust the class for the correct Font Awesome icon
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

export { setupAdminMode, createModalLink, createAdminNav, logOutBtn };



