const inputTitle = document.getElementById("title");
const inputAuthor = document.getElementById("author");
const inputPages = document.getElementById("pages");
const inputStatus = document.getElementById("status");
const btnAddBook = document.getElementById("addBookBtn");
const tableBooks = document.getElementById("table-body");

const arrLibrary = [];

function Book(title, author, pages, status) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.status = status;
}

function addGlobalEventListener(type, selector, callback) {
  document.addEventListener(type, e => {
    if (e.target.matches(selector)) {
      callback(e);
    }
  });
}

function addBookToLibrary() {
  const title = inputTitle.value;
  const author = inputAuthor.value;
  const pages = inputPages.value;
  const status = inputStatus.value;

  const newBook = new Book(title, author, pages, status);

  arrLibrary.push(newBook);
  addRowInTable(newBook);
  clearInputValue();
  console.log(arrLibrary);
}

function addRowInTable(book) {
  const row = tableBooks.insertRow(-1);

  const cellTitle = row.insertCell(0);
  const cellAuthor = row.insertCell(1);
  const cellPages = row.insertCell(2);
  const cellStatus = row.insertCell(3);
  const cellAction = row.insertCell(4);

  cellTitle.innerText = book.title;
  cellAuthor.innerText = book.author;
  cellPages.innerText = book.pages;
  cellStatus.innerText = book.status;

  const removeButton = createRemoveButton(arrLibrary.indexOf(book));
  cellAction.appendChild(removeButton);
}

function createRemoveButton(index) {
  const removeButton = document.createElement("button");
  removeButton.type = "button";
  removeButton.className = "btn btn-danger btn-sm delete border-0";
  removeButton.innerText = "Remove";
  removeButton.setAttribute("data-index", index);
  return removeButton;
}

function removeBookFromLibrary(e) {
  const index = e.target.getAttribute("data-index");
  arrLibrary.splice(index, 1);
  renderLibrary();
}

function renderLibrary() {
  const tbody = tableBooks.getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";
  arrLibrary.forEach(book => addRowInTable(book));
}

function clearInputValue() {
  inputTitle.value = "";
  inputAuthor.value = "";
  inputPages.value = "";
  inputStatus.value = "";
}

addGlobalEventListener('click', 'button', function (e) {
  if (e.target.matches('.btn-danger')) {
    removeBookFromLibrary(e);
  } else {
    addBookToLibrary(e);
  }
});