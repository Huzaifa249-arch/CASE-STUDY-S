// ================= NAVBAR LOGIN LOGIC =================
const loggedInUser = localStorage.getItem("loggedInUser");

const loginLink = document.getElementById("loginLink");
const signupLink = document.getElementById("signupLink");
const logoutLink = document.getElementById("logoutLink");

if (loggedInUser) {
  if (loginLink) loginLink.style.display = "none";
  if (signupLink) signupLink.style.display = "none";
  if (logoutLink) logoutLink.style.display = "block";
}

logoutLink?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  window.location.href = "login.html";
});

// ================= SIGNUP =================
document.getElementById("signupForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;
  const phone = document.getElementById("phone").value;

  if (!name || !email || !password || !confirmPassword || !phone) {
    alert("All fields are required!");
    return;
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  localStorage.setItem(email, JSON.stringify({ name, email, password, phone }));
  alert("Registration Successful!");
  window.location.href = "login.html";
});

// ================= LOGIN =================
document.getElementById("loginForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const email = document.getElementById("loginEmail").value;
  const password = document.getElementById("loginPassword").value;

  const user = JSON.parse(localStorage.getItem(email));

  if (user && user.password === password) {
    localStorage.setItem("loggedInUser", email);
    alert("Login Successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid Credentials!");
  }
});

// ================= DOCTORS =================
const doctors = [
  {name: "Dr. Sharma", spec: "Cardiologist", exp: "10 Years"},
  {name: "Dr. Reddy", spec: "Neurologist", exp: "8 Years"},
  {name: "Dr. Khan", spec: "Orthopedic", exp: "12 Years"}
];

const doctorList = document.getElementById("doctorList");
const doctorSelect = document.getElementById("doctorSelect");

if (doctorList) {
  doctors.forEach(doc => {
    doctorList.innerHTML += `
      <div class="card">
        <h3>${doc.name}</h3>
        <p>${doc.spec}</p>
        <p>${doc.exp}</p>
      </div>`;
  });
}

if (doctorSelect) {
  doctors.forEach(doc => {
    doctorSelect.innerHTML += `<option>${doc.name}</option>`;
  });
}

// ================= APPOINTMENTS =================
document.getElementById("appointmentForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const patient = document.getElementById("patientName").value;
  const doctor = document.getElementById("doctorSelect").value;
  const date = document.getElementById("dateTime").value;
  const reason = document.getElementById("reason").value;

  let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.push({ patient, doctor, date, reason });
  localStorage.setItem("appointments", JSON.stringify(appointments));

  alert("Appointment Booked!");
  location.reload();
});

// SHOW APPOINTMENTS
const table = document.getElementById("appointmentTable");
if (table) {
  const appointments = JSON.parse(localStorage.getItem("appointments")) || [];
  appointments.forEach((app, index) => {
    table.innerHTML += `
      <tr>
        <td>${app.doctor}</td>
        <td>${app.date}</td>
        <td>${app.reason}</td>
        <td><button onclick="cancelAppointment(${index})">Cancel</button></td>
      </tr>`;
  });
}

function cancelAppointment(index) {
  let appointments = JSON.parse(localStorage.getItem("appointments"));
  appointments.splice(index, 1);
  localStorage.setItem("appointments", JSON.stringify(appointments));
  location.reload();
}

// ================= CONTACT =================
document.getElementById("contactForm")?.addEventListener("submit", function(e){
  e.preventDefault();

  const name = document.getElementById("contactName").value;
  const email = document.getElementById("contactEmail").value;
  const message = document.getElementById("contactMessage").value;

  if (!name || !email || !message) {
    alert("All fields required!");
    return;
  }

  alert("Message Sent Successfully!");
  this.reset();
});