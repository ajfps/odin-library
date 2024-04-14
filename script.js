const dialog = document.querySelector(".dialog");
const addBook = document.querySelector(".addBook");
const submitBtn = document.querySelector(".submit");
const closeBtn = document.querySelector(".close");
const form = document.querySelector("#myForm");

const title = document.querySelector(".title");
const author = document.querySelector(".author");
const pages = document.querySelector(".pages");
const read = document.querySelector(".haveRead");
const section = document.querySelector("section");

addBook.addEventListener("click", () => {
  dialog.showModal();
});

closeBtn.addEventListener("click", () => {
  dialog.close();
});

function Book(title, author, pages, read) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.read = read;
}

function addBookToLibrary(book) {
  myLibrary.push(book);
}

const myLibrary = [];

let booksContainer;

submitBtn.addEventListener("click", () => {
  let bookTitle = title.value;
  let bookAuthor = author.value;
  let bookPages = pages.value;
  let bookRead = read.checked;

  let newBook = new Book(bookTitle, bookAuthor, bookPages, bookRead);
  addBookToLibrary(newBook);

  if (!booksContainer) {
    booksContainer = document.createElement("div");
    booksContainer.classList.add("books");
    section.appendChild(booksContainer);
  }

  booksContainer.innerHTML = "";

  myLibrary.forEach((book) => {
    const bookElement = document.createElement("div");
    bookElement.classList.add("book");

    const libTitle = document.createElement("h1");
    libTitle.textContent = book.title;
    const libAuthor = document.createElement("h1");
    libAuthor.textContent = book.author;
    const libPages = document.createElement("h1");
    libPages.textContent = book.pages;

    bookElement.appendChild(libTitle);
    bookElement.appendChild(libAuthor);
    bookElement.appendChild(libPages);

    const libRead = document.createElement("h1");

    if (book.read) {
      libRead.textContent = "Have read";
      libRead.setAttribute(
        "style",
        "position: absolute; bottom: 5px; left: 5px; font-size: 12px; color: green;"
      );
      bookElement.appendChild(libRead);
    } else {
      libRead.textContent = "Not read";
      libRead.setAttribute(
        "style",
        "position: absolute; bottom: 5px; left: 5px; font-size: 12px; color: red;"
      );
      bookElement.appendChild(libRead);
    }

    const removeBtn = document.createElement("div");
    removeBtn.textContent = "Remove";
    removeBtn.setAttribute(
      "style",
      "position: absolute; top: 5px; right: 5px; background-color: transparent; color: red; font-size: 12px;"
    );
    bookElement.appendChild(removeBtn);

    libRead.addEventListener("click", () => {
      book.read = !book.read;
      libRead.textContent = book.read ? "Have read" : "Not read";
      libRead.style.color = book.read ? "green" : "red";
    })

    removeBtn.addEventListener("click", () => {
      const index = myLibrary.indexOf(book);
      bookElement.remove();
      myLibrary.splice(index, 1);
    });

    booksContainer.appendChild(bookElement);
  });
  form.reset();
});
