const gallery = document.querySelector(".gallery");
const buttons = document.querySelector(".filter-buttons");
// Variable to store the selected category


export let selectedCategory = "";

// Function to fetch and render works in the photo gallery

export async function photoGallery() {
  const dataWorks = await fetch("http://localhost:5678/api/works");
  const works = await dataWorks.json();

  renderGallery(works);
}
// Function to render the photo gallery based on the selected category

export function renderGallery(works) {
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


export async function filterfunc() {
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

