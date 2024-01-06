// DOM elements
const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputStatus = document.getElementById("status");
const btnAddBook = document.getElementById("addBookBtn");
const tableBooks = document.getElementById("table-body");
const form = document.getElementById("form");

// Library array
const arrLibrary = [];

// Book constructor
function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

// Function to add a book to the library
function addBookToLibrary() {
  const title = inputTitle.value.trim();
  const author = inputAuthor.value.trim();
  const pages = inputPages.value.trim();
  const status = inputStatus.value.trim();

  if (validateInput(title, author, pages, status)) {
    const newBook = new Book(title, author, pages, status);

    arrLibrary.push(newBook);
    addRowInTable(newBook);
    clearInputValue();
    console.log(arrLibrary);
  }
}

// Function to validate input values
function validateInput(title, author, pages, status) {
  if (!title || !author || !pages || !status) {
    return false;
  }
  return true; 
}

// Function to add a row in the table for a book
function addRowInTable(book) {
  const row = tableBooks.insertRow(-1);

  for (let i in book) {
    const cell = row.insertCell();
    cell.innerText = book[i];
  }

  const cellAction = row.insertCell();
  const removeButton = createRemoveButton(arrLibrary.indexOf(book));
  cellAction.appendChild(removeButton);
}

// Function to create a "Remove" button for a book
function createRemoveButton(index) {
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn-danger btn-sm delete border-0";
  removeButton.innerText = "Remove";
  removeButton.setAttribute("data-index", index);
  removeButton.addEventListener("click", deleteRowInTable);
  return removeButton;
}

// Function to handle the removal of a book row
function deleteRowInTable(e) {
  const index = e.target.getAttribute("data-index");
  arrLibrary.splice(index, 1);
  updateTable();
}

// Function to update the entire table
function updateTable() {
  // Clear the existing table
  tableBooks.innerHTML = "";

  // Add rows for each book in the library
  arrLibrary.forEach(addRowInTable);
}

// Function to clear input values
function clearInputValue() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputStatus.value = "";
}

// Event listener for adding a book
form.addEventListener("submit", (e) => {
  debugger;
  // Prevent the default form submission behavior
  e.preventDefault(); 
  addBookToLibrary();
});