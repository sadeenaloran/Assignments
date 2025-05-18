function validate() {
  let isvalid = true;
  const nameErrorMessage = document.getElementById("nameErrorMessage");
  const emailErrorMessage = document.getElementById("emailErrorMessage");
  const phoneErrorMessage = document.getElementById("phoneErrorMessage");
  const genderErrorMessage = document.getElementById("genderErrorMessage");
  const addressErrorMessage = document.getElementById("addressErrorMessage");

  const fullName = document.getElementById("full_name").value;
  const email = document.getElementById("email").value;
  const phoneNumber = document.getElementById("phone_number").value;
  const gender = document.getElementById("gender").value;
  const address = document.getElementById("address").value;

  if (fullName.trim() === "") {
    nameErrorMessage.textContent = "Please enter your full name.";
    isvalid = false;
  } else if (!/^[A-Za-z\s]+$/.test(fullName)) {
    nameErrorMessage.textContent =
      "Full name must not contain numbers or symbols!";
    isvalid = false;
  } else {
    nameErrorMessage.textContent = "";
  }

  if (email === "" || !email.includes("@") || !email.includes(".")) {
    emailErrorMessage.textContent = "Please enter a valid email address.";
    isvalid = false;
  } else {
    emailErrorMessage.textContent = "";
  }

  if (
    phoneNumber.trim() === "" ||
    phoneNumber.length < 10 ||
    !/^\d{10}$/.test(phoneNumber)
  ) {
    phoneErrorMessage.textContent = "Please enter a valid phone number.";
    isvalid = false;
  } else {
    phoneErrorMessage.textContent = "";
  }

  if (gender === "") {
    genderErrorMessage.textContent = "Please select your gender.";
    isvalid = false;
  } else {
    genderErrorMessage.textContent = "";
  }

  if (address === "") {
    addressErrorMessage.textContent = "Please enter your address.";
    isvalid = false;
  } else {
    addressErrorMessage.textContent = "";
  }

  return isvalid;
}

let userList = [];
class User {
  constructor(fullName, email, phoneNumber, gender, address) {
    this.fullName = fullName;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.gender = gender;
    this.address = address;
  }
}

function addUser() {
  if (validate()) {
    const fullName = document.getElementById("full_name").value;
    const email = document.getElementById("email").value;
    const phoneNumber = document.getElementById("phone_number").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;

    const user = new User(fullName, email, phoneNumber, gender, address);
    userList.push(user);
    console.log(user);

    document.getElementById("userform").reset();

    const successMessage = document.getElementById("successMessage");
    successMessage.textContent = "User added successfully!";
    setTimeout(() => {
      successMessage.textContent = "";
    }, 3000);
  }
}

function previewUsers() {
  const table = document.getElementById("table-view").getElementsByTagName("tbody")[0];
  table.innerHTML = "";
  userList.forEach((elements) => {
    const row = document.createElement("tr");
    const nameTd = document.createElement("td");
    nameTd.textContent = elements.fullName;

    const emailTd = document.createElement("td");
    emailTd.textContent = elements.email;

    const phonenumberTd = document.createElement("td");
    phonenumberTd.textContent = elements.phoneNumber;

    const genderTd = document.createElement("td");
    genderTd.textContent = elements.gender;

    const addressTd = document.createElement("td");
    addressTd.textContent = elements.address;

    row.appendChild(nameTd);
    row.appendChild(emailTd);
    row.appendChild(phonenumberTd);
    row.appendChild(genderTd);
    row.appendChild(addressTd);

    table.appendChild(row);
  });

  const card = document.getElementById("card-view");
  card.innerHTML = "";
  userList.forEach((elements) => {
    const cardContent = document.createElement("div");
    cardContent.className = "col-12 col-sm-6 col-md-4 col-lg-3";

    const cardElement = document.createElement("div");
    cardElement.className = "card mybg text-white h-100 w-100";

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";

    const nameCard = document.createElement("h4");
    nameCard.className = "border-bottom border-warning text-warning";
    const nameIcon = document.createElement("i");
    nameIcon.className = "bi bi-person-fill me-2";
    const nameContent = document.createTextNode(elements.fullName);
    nameCard.appendChild(nameIcon);
    nameCard.appendChild(nameContent);

    const emailCard = document.createElement("p");
    const emailIcon = document.createElement("i");
    emailIcon.className = "bi bi-envelope-fill me-2";
    const emailContent = document.createTextNode(elements.email);
    emailCard.appendChild(emailIcon);
    emailCard.appendChild(emailContent);

    const phonenumberCard = document.createElement("p");
    const phoneIcon = document.createElement("i");
    phoneIcon.className = "bi bi-telephone-fill me-2";
    const phonenumberContent = document.createTextNode(elements.phoneNumber);
    phonenumberCard.appendChild(phoneIcon);
    phonenumberCard.appendChild(phonenumberContent);

    const genderCard = document.createElement("p");
    const genderIcon = document.createElement("i");
    genderIcon.className = "bi bi-gender-ambiguous me-2";
    const genderContent = document.createTextNode(elements.gender);
    genderCard.appendChild(genderIcon);
    genderCard.appendChild(genderContent);

    const addressCard = document.createElement("p");
    const addressIcon = document.createElement("i");
    addressIcon.className = "bi bi-geo-alt-fill me-2";
    const addressContent = document.createTextNode(elements.address);
    addressCard.appendChild(addressIcon);
    addressCard.appendChild(addressContent);

    cardBody.appendChild(nameCard);
    cardBody.appendChild(emailCard);
    cardBody.appendChild(phonenumberCard);
    cardBody.appendChild(genderCard);
    cardBody.appendChild(addressCard);

    cardElement.appendChild(cardBody);
    cardContent.appendChild(cardElement);
    card.appendChild(cardContent);
  });
}

function Switch() {
  const tableView = document.getElementById("table-view");
  const cardView = document.getElementById("card-view");

  if (tableView.style.display === "none") {
    tableView.style.display = "table";
    cardView.style.display = "none";
    Switch.textContent = "Cards";
  } else {
    tableView.style.display = "none";
    cardView.style.display = "flex";
    Switch.textContent = "Table";
  }
}
