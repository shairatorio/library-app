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

class Book {
  constructor(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
  }

  toggleStatus() {
    this.status = this.status === 'Read' ? 'Unread' : 'Read';
  }
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
    cell.classList.add('align-middle');
  });

  const cellAction = row.insertCell();

  const toggleStatusButton = createButton("Change Status", "btn-primary", () => {
    book.toggleStatus();
    updateTableAndBookCounts();
  });
  cellAction.appendChild(toggleStatusButton);

  const removeButton = createButton("Remove", "btn-danger", () => {
    deleteRowInTable(arrLibrary.indexOf(book));
  });
  cellAction.appendChild(removeButton);
}

function updateBookCounts() {
  const totalBooksCount = arrLibrary.length;
  const totalReadCount = arrLibrary.filter(book => book.status === 'Read').length;
  const totalUnreadCount = arrLibrary.filter(book => book.status === 'Unread').length;

  totalBooks.innerText = totalBooksCount.toString();
  totalRead.innerText = totalReadCount.toString();
  totalUnread.innerText = totalUnreadCount.toString();
}

function createButton(text, className, clickHandler) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `btn btn-sm border-0 me-1 my-1 ${className}`;
  button.innerText = text;
  button.addEventListener("click", clickHandler);
  return button;
}

function deleteRowInTable(index) {
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