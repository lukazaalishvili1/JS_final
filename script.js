// Dropdown functionality
const dropdownToggle = document.querySelector(".dropdown-toggle");
const dropdownMenu = document.querySelector(".dropdown-menu");

dropdownToggle.addEventListener("click", () => {
    dropdownMenu.classList.toggle("show");
});

// // Fetch product data from API

let products = [];
let currentIndex = 0;
const initialLoad = 30;
const loadMoreCount = 15;

// Fetch product data from API
fetch("https://dummyjson.com/products?limit=194")
    .then((res) => res.json())
    .then((data) => {
        products = data.products;
        displayProducts();
    });

// Function to display products in the grid
function displayProducts() {
    const container = document.querySelector(".container");
    const loadMoreBtn = document.getElementById("load-more");

    // Load 15 products
    const nextProducts = products.slice(
        currentIndex,
        currentIndex + (currentIndex === 0 ? initialLoad : loadMoreCount)
    );

    nextProducts.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="product-img" src="${product.thumbnail}" alt="${product.title}" />
            <h2 class="product-title">${product.title}</h2>
            <div class="price-addCart-div">
                <p class="product-price">Price: $${product.price}</p>
                <button class="add-to-cart" type="button">Add to cart</button>
            </div>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
        `;
        container.appendChild(card);
    });

    currentIndex += nextProducts.length;

    // Show or hide the Load More button
    if (currentIndex >= products.length) {
        loadMoreBtn.style.display = "none";
    } else {
        loadMoreBtn.style.display = "block";
    }
}

// Event listener for "Load More" button
document.addEventListener("DOMContentLoaded", () => {
    const loadMoreBtn = document.getElementById("load-more");
    loadMoreBtn.addEventListener("click", displayProducts);
});

//   display products in the grid
function displayAllProducts(productList) {
    const container = document.querySelector(".container");
    container.innerHTML = "";
    productList.forEach((product) => {
        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img class="product-img" src="${product.thumbnail}" alt="${product.title}" />
            <h2 class="product-title">${product.title}</h2>
            <div class="price-addCart-div"><p class="product-price">Price: $${product.price}</p>
            <button class="add-to-cart" type="button">Add to cart</button></div>
            <a href="product.html?id=${product.id}" class="btn btn-primary">View Details</a>
        `;
        container.appendChild(card);
    });
}

// Search
const searchInput = document.getElementById("search_input");
const searchResults = document.createElement("div");
searchResults.classList.add("search-results");
document.body.appendChild(searchResults);

searchInput.addEventListener("input", function () {
    const query = this.value.toLowerCase().trim();
    searchResults.innerHTML = "";

    if (!query) {
        searchResults.style.display = "none";
        return;
    }

    const filteredProducts = products.filter((product) =>
        product.title.toLowerCase().includes(query)
    );

    searchResults.style.display = filteredProducts.length ? "block" : "none";

    filteredProducts.slice(0, 7).forEach((product) => {
        const div = document.createElement("div");
        div.classList.add("search-item");
        div.textContent = product.title;
        div.onclick = () => {
            searchInput.value = product.title;
            searchResults.style.display = "none";
            displayAllProducts([product]);
        };
        searchResults.appendChild(div);
    });
});

// Show  results on Enter
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        const query = this.value.toLowerCase().trim();
        searchResults.style.display = "none";

        const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(query)
        );

        if (filteredProducts.length === 0) {
            document.querySelector(".container").innerHTML =
                "<p>No results found.</p>";
        } else {
            displayAllProducts(filteredProducts);
        }
    }
});

// Hide dropdown
document.addEventListener("click", function (event) {
    if (
        !searchInput.contains(event.target) &&
        !searchResults.contains(event.target)
    ) {
        searchResults.style.display = "none";
    }
});

// dark mode
document.addEventListener("DOMContentLoaded", function () {
    const toggleDarkMode = document.getElementById("dark-mode-toggle");

    function applyDarkMode(isDark) {
        if (isDark) {
            document.body.classList.add("dark-mode");
            toggleDarkMode.textContent = "☀️ Light Mode";
        } else {
            document.body.classList.remove("dark-mode");
            toggleDarkMode.textContent = "🌙 Dark Mode";
        }
    }

    //  localStorage
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    applyDarkMode(isDarkMode);

    toggleDarkMode.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDark);
        applyDarkMode(isDark);
    });
});
