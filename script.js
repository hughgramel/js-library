const myLibrary = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}


function addBookToLibrary() {
    // this should take new info and add it all to library
}

function displayAllBooks() {
    // first, remove all books

    const bookContainer = document.querySelector("main > section")
    bookContainer.innerHTML = ""; // removes all divs

    // now loop through book array, display each one
    for (let i = 0; i < myLibrary.length; i++) {

        // get main container, create book container
        const container = document.querySelector("main > section");
        const childElement = document.createElement("div");

        // get current book
        const currBook = myLibrary[i];

        // make <p>s for title, author, pages, read
        const titlePara = document.createElement("p");
        titlePara.textContent = currBook.title
        childElement.appendChild(titlePara);

        const authorPara = document.createElement("p");
        authorPara.textContent = currBook.author
        childElement.appendChild(authorPara);

        const pagePara = document.createElement("p");
        pagePara.textContent = currBook.pages + " pages"
        childElement.appendChild(pagePara);

        // make buttons for removing, and toggling read
        const buttonContainer = document.createElement("div")

        const toggleReadButton = document.createElement("button");
        toggleReadButton.classList.add("read-button");
        if (myLibrary[i].read) {
            toggleReadButton.classList.add("read");
            toggleReadButton.textContent = "Read";
        } else {
            toggleReadButton.classList.add("unread");
            toggleReadButton.textContent = "Unread";
        }

        toggleReadButton.addEventListener('click', () => {
            // anonymous function that toggles if it's read or not
            myLibrary[i].read = !myLibrary[i].read
            displayAllBooks()
        })

        buttonContainer.appendChild(toggleReadButton);

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", (event) => {
            const parentContainer = event.target.parentElement.parentElement;
            parentContainer.remove;
            myLibrary.splice(i, 1);
            // rerun display all books to "rerender"
            displayAllBooks();
        })
        buttonContainer.appendChild(removeButton);

        // append to container
        childElement.appendChild(buttonContainer)
        container.appendChild(childElement);
    }
}


function toggleReadStatus(index) {
    myLibrary[index].read = !myLibrary[index].read
    displayAllBooks()
}

function removeBook(event) {
    console.log("the target is " + event.target)
    const parentContainer = event.target.parentElement.parentElement;
    console.log("the parent container is " + parentContainer)
    parentContainer.remove;
    myLibrary.pop()
    console.log(myLibrary)

    // rerun display all books to "rerender"
    displayAllBooks();
}

function handleForm() {
    // now we get all of the values from the form
    // and create the book, then clear everything
    const titleInput = document.getElementById("title")
    const authorInput = document.getElementById("author")
    const pageCount = document.getElementById("pages")

    // now create new book
    myLibrary.push(new Book(titleInput.value, authorInput.value, pageCount.value, false))

    // now make all nothing
    titleInput.value = ""
    authorInput.value = ""
    pageCount.value = ""

    //"rerender"
    displayAllBooks()
}

myLibrary.push(new Book("The Hobbit", "J.R.R. Tolkien", 123, true));
myLibrary.push(new Book("A Game of Thrones ", "George R.R. Martin ", 547, false));
displayAllBooks();