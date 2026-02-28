// ================= DATA =================
const store = {
    products: [
        {id:1, name:"Fresh Apples", category:"Fruits", price:120, stock:50, image:"🍎"},
        {id:2, name:"Organic Bananas", category:"Fruits", price:60, stock:100, image:"🍌"},
        {id:3, name:"Tomatoes", category:"Vegetables", price:40, stock:75, image:"🍅"},
        {id:4, name:"Potatoes", category:"Vegetables", price:30, stock:200, image:"🥔"},
        {id:5, name:"Cinnamon", category:"Spices", price:80, stock:30, image:"🌿"},
        {id:6, name:"Brown Rice", category:"Millets", price:90, stock:60, image:"🌾"}
    ],
    users: JSON.parse(localStorage.getItem("users")) || [],
    currentUser: JSON.parse(localStorage.getItem("currentUser")) || null,
    cart: JSON.parse(localStorage.getItem("cart")) || []
};

// Save helper
function save(key, data){
    localStorage.setItem(key, JSON.stringify(data));
}

// ================= AUTH =================
function signup(e){
    e.preventDefault();

    const name = fullName.value;
    const email = emailInput.value;
    const pass = password.value;
    const confirm = confirmPassword.value;

    if(!name || !email || !pass) return alert("All fields required");
    if(pass !== confirm) return alert("Passwords do not match");

    store.users.push({id:Date.now(), name, email, pass});
    save("users", store.users);

    alert("Signup successful!");
    window.location="login.html";
}

function login(e){
    e.preventDefault();
    const email = loginEmail.value;
    const pass = loginPassword.value;

    const user = store.users.find(u=>u.email===email && u.pass===pass);
    if(!user) return alert("Invalid credentials");

    store.currentUser = user;
    save("currentUser", user);

    window.location="index.html";
}

function logout(){
    localStorage.removeItem("currentUser");
    window.location="index.html";
}

// ================= PRODUCTS =================
function renderProducts(){
    const grid = document.getElementById("productsGrid");
    if(!grid) return;

    grid.innerHTML = store.products.map(p=>`
        <div class="product-card">
            <div style="font-size:50px">${p.image}</div>
            <h3>${p.name}</h3>
            <p>₹${p.price}</p>
            <p>${p.stock>0?"In Stock":"Out of Stock"}</p>
            <button onclick="addToCart(${p.id})" ${p.stock===0?"disabled":""}>
                Add to Cart
            </button>
        </div>
    `).join("");
}

// ================= CART =================
function addToCart(id){
    if(!store.currentUser){
        alert("Login first");
        return window.location="login.html";
    }

    const product = store.products.find(p=>p.id===id);
    if(product.stock<=0) return alert("Out of stock");

    const item = store.cart.find(i=>i.id===id);
    if(item){
        item.qty++;
    }else{
        store.cart.push({...product, qty:1});
    }

    product.stock--;
    save("cart", store.cart);
    save("products", store.products);

    alert("Added to cart");
}

function renderCart(){
    const container = document.getElementById("cartItems");
    if(!container) return;

    if(store.cart.length===0){
        container.innerHTML="<p>Your cart is empty</p>";
        return;
    }

    container.innerHTML = store.cart.map(i=>`
        <div class="cart-item">
            <div>${i.name}</div>
            <div>₹${i.price}</div>
            <div>
                <button onclick="updateQty(${i.id},-1)">-</button>
                ${i.qty}
                <button onclick="updateQty(${i.id},1)">+</button>
            </div>
            <div>₹${i.price*i.qty}</div>
            <button onclick="removeItem(${i.id})">X</button>
        </div>
    `).join("");

    calculateTotal();
}

function updateQty(id,change){
    const item = store.cart.find(i=>i.id===id);
    const product = store.products.find(p=>p.id===id);

    item.qty+=change;
    product.stock-=change;

    if(item.qty<=0){
        removeItem(id);
        return;
    }

    save("cart",store.cart);
    save("products",store.products);
    renderCart();
}

function removeItem(id){
    const item = store.cart.find(i=>i.id===id);
    const product = store.products.find(p=>p.id===id);
    product.stock+=item.qty;

    store.cart=store.cart.filter(i=>i.id!==id);
    save("cart",store.cart);
    save("products",store.products);
    renderCart();
}

function calculateTotal(){
    const subtotal = store.cart.reduce((sum,i)=>sum+i.price*i.qty,0);
    const tax = subtotal*0.18;
    const total = subtotal+tax;

    document.getElementById("subtotal").innerText=subtotal.toFixed(2);
    document.getElementById("tax").innerText=tax.toFixed(2);
    document.getElementById("total").innerText=total.toFixed(2);
}

// ================= INIT =================
document.addEventListener("DOMContentLoaded",()=>{
    renderProducts();
    renderCart();
});