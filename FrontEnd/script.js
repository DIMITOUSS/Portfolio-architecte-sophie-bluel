const tous = document.getElementById("tous");
const object = document.getElementById("object");
const hotels = document.getElementById("hotels");
const appartements = document.getElementById("appartements");
const gallery = document.querySelector(".gallery");

let selectedCategory = ""; // Track the selected category

async function filterfunc() {
  const data = await fetch("http://localhost:5678/api/categories");
  const categories = await data.json();

  tous.addEventListener("click", () => {
    selectedCategory = "";
    renderGallery();
  });

  object.addEventListener("click", () => {
    renderGallery();
  });

  appartements.addEventListener("click", () => {
    renderGallery();
  });

  hotels.addEventListener("click", () => {
    renderGallery();
  });
}

async function photoGallery() {
  const data = await fetch("http://localhost:5678/api/works");
  const works = await data.json();
  console.log(works);

  renderGallery(works);
}

function renderGallery(works) {
  gallery.innerHTML = ""; // Clear the existing content

  for (let i in works) {
    if (!selectedCategory || works[i].category === selectedCategory) {
      const figure = document.createElement("figure");
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
}

// Call the functions
filterfunc();
photoGallery();
