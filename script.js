/*
 * Name: Hugh Gramelspacher
 * Date: October 17, 2024
 * Section: CSE 154 AE
 *
 * This is my JS script for my book library / book tracker website.
 * It provides functionality for tracking books and their read status, and
 * adding and removing them. It starts with two books to show the functionality
 * of the website
 *
 * NOTE: This project idea was from the web development course The odin project,
 * the link shown here to the spec / prompt.
 * https://www.theodinproject.com/lessons/node-path-javascript-library#project-solution
 * While I used the idea, it didn't provide any help or tutorials at all. (Just
 * loose guidelines regarding the goals).
 */

const MY_LIBRARY = [];

class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

/**
 * Renders all the books in the `MY_LIBRARY` array to the DOM.
 * Removes any existing book elements and then loops through
 * the array, creating and displaying each book with  buttons.
 * Each book has buttons for toggling its read status and removing
 * it from the library.
 */
function displayAllBooks() {

    // first, remove all books
    const bookContainer = document.querySelector("main > section")
    bookContainer.innerHTML = ""; // removes all divs

    // now loop through book array, display each one
    for (let i = 0; i < MY_LIBRARY.length; i++) {

        // get main container, create book container
        const container = document.querySelector("main > section");
        const childElement = document.createElement("div");

        // get current book
        const currBook = MY_LIBRARY[i];

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
        if (MY_LIBRARY[i].read) {
            toggleReadButton.classList.add("read");
            toggleReadButton.textContent = "Read";
        } else {
            toggleReadButton.classList.add("unread");
            toggleReadButton.textContent = "Unread";
        }

        toggleReadButton.addEventListener('click', () => {
            // anonymous function that toggles if it's read or not
            MY_LIBRARY[i].read = !MY_LIBRARY[i].read
            displayAllBooks()
        })

        buttonContainer.appendChild(toggleReadButton);

        const removeButton = document.createElement("button");
        removeButton.classList.add("remove-button");
        removeButton.textContent = "Remove";
        removeButton.addEventListener("click", (event) => {
            removeBook(event, i)
        })
        buttonContainer.appendChild(removeButton);

        // append to container
        childElement.appendChild(buttonContainer)
        container.appendChild(childElement);
    }
}

/**
 * Toggles the read status of a book in the MY_LIBRARY array.
 * @param {number} index - The index of the book in the library array.
 * Changes the 'read' property and then updates the display of all books.
 */
function toggleReadStatus(index) {
    MY_LIBRARY[index].read = !MY_LIBRARY[index].read
    displayAllBooks()
}

/**
 * Removes a book from the DOM and from the `MY_LIBRARY` array.
 * Triggered by the remove button. It removes the book from the array
 * at the corresponding index and rerenders the updated library.
 * @param {Event} event - The event object associated with the button click.
 */
function removeBook(event, index) {
    const parentContainer = event.target.parentElement.parentElement;
    parentContainer.remove;
    MY_LIBRARY.splice(index, 1);
    // rerun display all books to "rerender"
    displayAllBooks();
}

/**
 * Handles form submission, creates a new Book object, adds it to MY_LIBRARY,
 * and clears the form fields. Then calls `displayAllBooks()` to update the display.
 */
function handleForm() {
    const titleInput = document.getElementById("title");
    const authorInput = document.getElementById("author");
    const pageCount = document.getElementById("pages");

    // Create new book and add it to the library
    MY_LIBRARY.push(new Book(titleInput.value, authorInput.value, pageCount.value, false));

    // Clear form inputs
    titleInput.value = "";
    authorInput.value = "";
    pageCount.value = "";

    // Rerender the updated book list
    displayAllBooks();
}

MY_LIBRARY.push(new Book("The Hobbit", "J.R.R. Tolkien", 123, true));
MY_LIBRARY.push(new Book("A Game of Thrones ", "George R.R. Martin ", 547, false));
displayAllBooks();