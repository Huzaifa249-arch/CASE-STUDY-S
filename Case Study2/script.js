let books = JSON.parse(localStorage.getItem("books")) || [
  {id:1,title:"Atomic Habits",author:"James Clear",issued:false},
  {id:2,title:"Clean Code",author:"Robert Martin",issued:false},
  {id:3,title:"Python Basics",author:"Guido",issued:false}
];

function renderBooks(search=""){
  let html="";
  books.filter(b=>b.title.toLowerCase().includes(search.toLowerCase()))
  .forEach(b=>{
    html+=`<div class="card">
      <h4>${b.title}</h4>
      <p>${b.author}</p>
      <button ${b.issued?"disabled":""}
      onclick="issue(${b.id})">${b.issued?"Issued":"Issue"}</button>
    </div>`;
  });
  if(document.getElementById("bookList"))
    document.getElementById("bookList").innerHTML=html;
  localStorage.setItem("books",JSON.stringify(books));
}

function issue(id){
  books.find(b=>b.id===id).issued=true;
  renderBooks(); renderIssued();
}

function renderIssued(){
  let list=books.filter(b=>b.issued);
  if(document.getElementById("issuedList"))
    document.getElementById("issuedList").innerHTML=
      list.length ? list.map(b=>`
      <div class="card">${b.title}
      <button onclick="returnBook(${b.id})">Return</button></div>`).join("")
      : "<p>No books issued</p>";
}

function returnBook(id){
  books.find(b=>b.id===id).issued=false;
  renderBooks(); renderIssued();
}

function signup(){
  if(spass.value!==scpass.value){smsg.innerText="Password mismatch";return}
  localStorage.setItem("user",JSON.stringify({email:semail.value,pass:spass.value}));
  smsg.innerText="Signup successful";
}

function login(){
  let u=JSON.parse(localStorage.getItem("user"));
  if(u && u.email===lemail.value && u.pass===lpass.value){
    localStorage.setItem("login","true");
    window.location="index.html";
  } else lmsg.innerText="Invalid login";
}

function logout(){
  localStorage.removeItem("login");
  window.location="login.html";
}

function contact(){
  cinfo.innerText="Message sent successfully!";
}

renderBooks();
renderIssued();