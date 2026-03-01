// Highlight active page
const links = document.querySelectorAll(".navbar a");
links.forEach(link => {
    if (link.href === window.location.href) {
        link.style.fontWeight = "bold";
        link.style.color = "#ff6600"; // Highlight active link with accent color
    }
});

// Sample Products (only data, no images)
const products = [
    { id: 1, name: "Apple", price: 100 },
    { id: 2, name: "Carrot", price: 50 },
    { id: 3, name: "Turmeric", price: 200 }
];

// Add to Cart
function addToCart(id) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let product = products.find(p => p.id === id);
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to Cart`);
}

// Add to Wishlist
function addToWishlist(id) {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let product = products.find(p => p.id === id);
    wishlist.push(product);
    localStorage.setItem("wishlist", JSON.stringify(wishlist));
    alert(`${product.name} added to Wishlist`);
}

// Load Cart
function loadCart() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let table = document.getElementById("cartTable");
    if (!table) return;

    table.innerHTML = ""; // Clear old rows
    let total = 0;
    cart.forEach(item => {
        total += item.price;
        table.innerHTML += `<tr><td>${item.name}</td><td>₹${item.price}</td></tr>`;
    });

    document.getElementById("total").innerText = total;
}

// Load Wishlist
function loadWishlist() {
    let wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    let table = document.getElementById("wishlistTable");
    if (!table) return;

    table.innerHTML = ""; // Clear old rows
    wishlist.forEach(item => {
        table.innerHTML += `<tr><td>${item.name}</td><td>₹${item.price}</td></tr>`;
    });
}

// Signup
function signup() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    if (!email || !pass) {
        alert("Fill all fields");
        return false;
    }

    localStorage.setItem("user", JSON.stringify({ email, pass }));
    alert("Signup Successful");
    return true;
}

// Login
function login() {
    let email = document.getElementById("email").value;
    let pass = document.getElementById("password").value;

    let user = JSON.parse(localStorage.getItem("user"));
    if (user && user.email === email && user.pass === pass) {
        alert("Login Successful");
        return true;
    } else {
        alert("Invalid Login");
        return false;
    }
}

// Contact Validation
function validateContact() {
    let name = document.getElementById("name").value;
    let email = document.getElementById("contactEmail").value;
    let message = document.getElementById("message").value;

    if (!name || !email || !message) {
        alert("Please fill all fields");
        return false;
    }

    alert("Message Sent Successfully!");
    return true;
}

// Checkout Total
function loadCheckout() {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    let total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById("checkoutTotal").innerText = total;
}