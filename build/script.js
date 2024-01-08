const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputStatus = document.getElementById("status");
const btnAddBook = document.getElementById("addBookBtn");
const tableBooks = document.getElementById("table-body");
const totalRead = document.getElementById("booksRead");
const totalUnread = document.getElementById("booksUnread");
const totalBooks = document.getElementById("totalBooks");
const form = document.getElementById("form");

const arrLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addBookToLibrary() {
  const title = inputTitle.value.trim();
  const author = inputAuthor.value.trim();
  const pages = inputPages.value.trim();
  const status = inputStatus.value.trim();

  if (validateInput(title, author, pages, status)) {
    const newBook = new Book(title, author, pages, status);
    arrLibrary.push(newBook);
    updateTableAndBookCounts();
    clearInputValues();
  }
}

function validateInput(title, author, pages, status) {
  return title && author && pages && status;
}

function updateTableAndBookCounts() {
  updateTable();
  updateBookCounts();
}

function updateTable() {
  tableBooks.innerHTML = "";
  arrLibrary.forEach(addRowInTable);
}

function addRowInTable(book) {
  const row = tableBooks.insertRow(-1);

  Object.values(book).forEach(value => {
    const cell = row.insertCell();
    cell.innerText = value;
  });

  const cellAction = row.insertCell();
  const removeButton = createRemoveButton(arrLibrary.indexOf(book));
  cellAction.appendChild(removeButton);
}

function updateBookCounts() {
  const totalBooksCount = arrLibrary.length;
  let totalReadCount = arrLibrary.filter(book => book.status === 'Read').length;
  let totalUnReadCount = arrLibrary.filter(book => book.status === 'Unread').length;

  totalBooks.innerText = totalBooksCount.toString();
  totalRead.innerText = totalReadCount.toString();
  totalUnread.innerText = totalUnReadCount.toString();
}

function createRemoveButton(index) {
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn-danger btn-sm delete border-0";
  removeButton.innerText = "Remove";
  removeButton.setAttribute("data-index", index);
  removeButton.addEventListener("click", deleteRowInTable);
  return removeButton;
}

function deleteRowInTable(e) {
  const index = e.target.getAttribute("data-index");
  arrLibrary.splice(index, 1);
  updateTableAndBookCounts();
}

function clearInputValues() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputStatus.value = "";
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBookToLibrary();
});

window.onload = updateBookCounts;