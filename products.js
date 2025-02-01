document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get("id");

    if (!productId) {
        document.body.innerHTML = "<h2>Product not found</h2>";
        return;
    }

    fetch(`https://dummyjson.com/products/${productId}`)
        .then((res) => res.json())
        .then((product) => {
            document.getElementById("product-img").src = product.thumbnail;
            document.getElementById("product-title").textContent =
                product.title;
            document.getElementById("product-description").textContent =
                product.description;
            document.getElementById(
                "product-price"
            ).textContent = `Price: $${product.price}`;
            document.getElementById(
                "product-rating"
            ).textContent = `Rating: ${product.rating}`;
            document.getElementById(
                "product-type"
            ).textContent = `Type: ${product.category}`;

            fetchRelatedProducts(product.category, product.id);
        })
        .catch((error) => {
            document.body.innerHTML = "<h2>Error loading product details</h2>";
        });
});

function fetchRelatedProducts(category, productId) {
    fetch("https://dummyjson.com/products?limit=194")
        .then((res) => res.json())
        .then((data) => {
            const relatedProducts = data.products.filter(
                (p) => p.category === category && p.id !== parseInt(productId)
            );
            const container = document.querySelector(".related-products");

            relatedProducts.slice(0, 4).forEach((product) => {
                const card = document.createElement("div");
                card.classList.add("card");
                card.innerHTML = `
                    <img class="product-img" src="${product.thumbnail}" alt="${product.title}" />
                    <h2 class="product-title">${product.title}</h2>
                    <p class="product-price">Price: $${product.price}</p>
                    <a href="product.html?id=${product.id}" class="btn btn-primary">View</a>
                `;
                container.appendChild(card);
            });
        });
}

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

    // Check localStorage for dark mode preference
    const isDarkMode = localStorage.getItem("darkMode") === "true";
    applyDarkMode(isDarkMode);

    toggleDarkMode.addEventListener("click", () => {
        const isDark = document.body.classList.toggle("dark-mode");
        localStorage.setItem("darkMode", isDark);
        applyDarkMode(isDark);
    });
});
