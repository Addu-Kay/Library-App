const library = [];
const template = document.getElementsByTagName("template")[0];
const bookCount = document.getElementsByClassName("books-read")[0];
const pageCount = document.getElementsByClassName("pages-read")[0];

function showInput() {
  const modal = document.getElementById("modal");
  modal.showModal();
}

function book() {
  const bookObject = {};
  bookObject.title = document.getElementById("title").value;
  bookObject.author = document.getElementById("author").value;
  bookObject.pages = document.getElementById("pages").value;
  bookObject.checked = document.getElementById("read-status").checked;
  if (
    bookObject.title == "" ||
    bookObject.author == "" ||
    bookObject.pages == ""
  ) {
    return;
  }
  library.push(bookObject);
  if (bookObject.checked) {
    pageCount.textContent =
      Number(pageCount.textContent) + Number(bookObject.pages);
    bookCount.textContent = Number(bookCount.textContent) + 1;
  }
  addBook();
}

function addBook() {
  const bookContainer = document.getElementById("book-container");
  bookContainer.innerHTML = "";
  let index = 0;
  library.map((bookObject) => {
    const bookCard = template.content.cloneNode(true).children[0];
    bookCard.classList.add(index);
    bookCard.children[2].textContent = bookObject.title;
    bookCard.children[5].textContent = bookObject.author;
    bookCard.children[8].textContent = bookObject.pages;
    bookCard.children[11].children[0].checked = bookObject.checked;
    bookContainer.appendChild(bookCard);
    index++;
  });
}

function removeBook(event) {
  const bookArray = Array.from(document.getElementsByClassName("book-details"));
  const bookObject = event.currentTarget.parentElement;
  const bookId = event.currentTarget.parentElement.classList[1];
  if (bookObject.children[11].children[0].checked) {
    pageCount.textContent =
      Number(pageCount.textContent) -
      Number(bookObject.children[8].textContent);
    bookCount.textContent = Number(bookCount.textContent) - 1;
  }
  bookArray[bookId].remove();
  library.splice(bookId, 1);
  addBook();
}

function updateBookCount(event) {
  const bookObject = event.target.parentElement.parentElement;
  if (event.target.checked) {
    pageCount.textContent =
      Number(pageCount.textContent) +
      Number(bookObject.children[8].textContent);
    bookCount.textContent = Number(bookCount.textContent) + 1;
    library[bookObject.classList[1]].checked = true;
  } else {
    pageCount.textContent =
      Number(pageCount.textContent) -
      Number(bookObject.children[8].textContent);
    bookCount.textContent = Number(bookCount.textContent) - 1;
  }
}
