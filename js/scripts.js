// Business Logic for AddressBook ---------
function AddressBook() {
  this.contacts = {};
  this.currentId = 0;
}

AddressBook.prototype.addContact = function(contact) {
  contact.id = this.assignId();
  this.contacts[contact.id] = contact;
};

AddressBook.prototype.assignId = function() {
  this.currentId += 1;
  return this.currentId;
};

AddressBook.prototype.findContact = function(id) {
  if (this.contacts[id] !== undefined) {
    return this.contacts[id];
  }
  return false;
};

AddressBook.prototype.deleteContact = function(id) {
  if (this.contacts[id] === undefined) {
    return false;
  }
  delete this.contacts[id];
  return true;
};

// Business Logic for Contacts ---------
function Contact(firstName, lastName, phoneNumber, /*emailAddress, homeAddress*/) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.phoneNumber = phoneNumber;
  //this.emailAddress = emailAddress;
  //this.homeAddress = homeAddress;
}

Contact.prototype.theName = function() {
  return this.firstName + " " + this.lastName;
};

Contact.prototype.thePhone = function() {
  return this.phoneNumber;
};

/*Contact.prototype.theEmail = function() {
  return this.emailAddress;
};

Contact.prototype.theHome = function() {
  return this.homeAddress;
};*/


// User Interface Logic ---------
let addressBook = new AddressBook();

function listContacts(addressBookToDisplay) {
  let contactsDiv = document.querySelector("div#contacts");
  contactsDiv.innerText =  null;
  const ul = document.createElement("ul");
  Object.keys(addressBookToDisplay.contacts).forEach(function(key) {
    const contact = addressBookToDisplay.findContact(key);
    const li = document.createElement("li");
    const li2 = document.createElement("li");
    //const li3 = document.createElement("li");
    //const li4 = document.createElement("li");
    li.append(contact.theName());
    li2.append(contact.thePhone());
    //li3.append(contact.theEmail());
    //li4.append(contact.theHome());
    li.setAttribute("id", contact.id);
    li2.setAttribute("id", contact.id);
    //li3.setAttribute("id", contact.id);
    //li4.setAttribute("id", contact.id);
    ul.append(li);
    ul.append(li2);
    //ul.append(li3);
    //ul.append(li4);
  });
  contactsDiv.append(ul);
}

function handleFormSubmission(event) {
  event.preventDefault();
  const inputtedFirstName = document.querySelector("input#new-first-name").value;
  const inputtedLastName = document.querySelector("input#new-last-name").value;
  const inputtedPhoneNumber = document.querySelector("input#new-phone-number").value;
 // const inputtedEmailAddress = document.querySelector("input#emailAddress").value;
// const inputtedHomeAddress = document.querySelector("input#homeAddress").value;
  let newContact = new Contact(inputtedFirstName, inputtedLastName, inputtedPhoneNumber, /*inputtedEmailAddress, inputtedHomeAddress*/);
  addressBook.addContact(newContact);
  listContacts(addressBook);
  document.querySelector("input#new-first-name").value = null;
  document.querySelector("input#new-last-name").value = null;
  document.querySelector("input#new-phone-number").value = null;
};

function displayContactDetails(event) {
  const contact = addressBook.findContact(event.target.id);
  document.getElementById("first-name1").innerText = contact.firstName;
  document.getElementById("last-name1").innerText = contact.lastName;
  document.getElementById("phone-number1").innerText = contact.phoneNumber;
  document.querySelector("div#contact-details").removeAttribute("class");
  document.querySelector("button.delete").setAttribute("id", contact.id);
  document.querySelector("div#contact-details").removeAttribute("class");
};

function handleDelete(event) {
  addressBook.deleteContact(event.target.id);
  document.querySelector("button.delete").removeAttribute("id");
  document.querySelector("div#contact-details").setAttribute("class", "hidden");
  listContacts(addressBook);
};

window.addEventListener("load", function (){
  document.querySelector("form#new-contact").addEventListener("submit", handleFormSubmission);
  document.querySelector("div#contacts").addEventListener("click", displayContactDetails);
  document.querySelector("button.delete").addEventListener("click", handleDelete);
});
