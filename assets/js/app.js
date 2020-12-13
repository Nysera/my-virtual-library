const addBookBtn = document.querySelector("#add-book");
const formModal = document.querySelector(".form-modal");
const formModalInner = document.querySelector(".form-modal_inner")
const overlayBackdrop = document.querySelector(".overlay-backdrop");
const bookContainer = document.querySelector(".book-container");
const infoContainer = document.querySelector(".info-container");

let myLibrary = [];


class Book {
    constructor() {}

    createBook(attributes) {
        attributes.id = this.bookId();
        const records = myLibrary;
        records.push(attributes);
    }
    getAll() {
        return myLibrary;
    }
    bookId() {
        return `${myLibrary.length + 1}`;
    }
    delete(bookId) {
        const records = myLibrary;
        const filtered = records.filter(function(record){
            return record.id !== bookId;
        });
        myLibrary = filtered;
    }
    getOne(bookId) {
        const records = myLibrary;
        return records.find(function(record) {
            return record.id === bookId;
        });
    }
    update(bookId, attributes) {
        const records = myLibrary;
        const record = records.find(function(record) {
            return record.id === bookId;
        });
        Object.assign(record, attributes);
        console.log(records, record);
    }
};

const updateBook = function(bookId) {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const imageUrl = document.querySelector("#image-url").value;
    const readStatus = document.querySelector("#read-status").value;

    const book = new Book();
    book.update(bookId, { title, author, pages, imageUrl, readStatus });

    const books = book.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();
};

const deleteBook = function(button) {
    const bookId = button.closest(".grid-item").id;
    const book = new Book();
    book.delete(bookId);

    const books = book.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();

};

const submitBook = function() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const imageUrl = document.querySelector("#image-url").value;
    const readStatus = document.querySelector("#read-status").value;

    const newBook = new Book();
    newBook.createBook({ title, author, pages, imageUrl, readStatus });

    const books = newBook.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();
};

const openModal = function(modal, button) {
    if (modal === "addBook") {
        formModalInner.innerHTML = addBookTemplate();
        document.querySelector("#submit-book").addEventListener("click", submitBook);
    } else if (modal === "updateBook") {
        const bookId = button.closest(".grid-item").id;
        console.log("book ID: ", bookId);
        const book = new Book();
        const selectedBook = book.getOne(bookId);

        formModalInner.innerHTML = updateBookTemplate(selectedBook);
        document.querySelector("#update-book").addEventListener("click", function(){
            updateBook(bookId);
        });
    }

    formModal.style.display = "flex";
    formModal.style.opacity = "1";
    document.body.style.overflow = "hidden";
    setTimeout(function() {
        overlayBackdrop.classList.add("active");
        formModalInner.classList.add("active");
    }, 25);

    document.querySelector("#close-modal").addEventListener("click", closeModal);
};

const closeModal = function() {
    overlayBackdrop.classList.remove("active");
    formModalInner.classList.remove("active");
    setTimeout(function() {
        formModal.style.display = "none";
        formModal.style.opacity = "0";
        formModalInner.innerHTML = "";
        document.body.style.overflow = "";
    }, 400);
};

const hideInfoContainer = function() {
    const bookContainerHeader = document.querySelector(".book-container_header");

    if (myLibrary.length >= 1) {
        infoContainer.style.display = "none";
        bookContainerHeader.append(addBookBtn);
    } else {
        infoContainer.style.display = "flex";
        infoContainer.querySelector(".info-container_content").append(addBookBtn);
    }
}

const showBookDetails = function(button) {
    button.closest(".grid-item").querySelector(".grid-item_details").classList.add("active");
    overlayBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
}

const hideBookDetails = function() {
    document.querySelectorAll(".grid-item_details").forEach(function(button){
        button.classList.remove("active");
    });
    overlayBackdrop.classList.remove("active");
    document.body.style.overflow = "";
};




addBookBtn.addEventListener("click", function() {
    openModal("addBook", null);
});
document.addEventListener("click", function(event){
    const clickedButton = event.target;

    if (clickedButton.classList.contains("show-details")) {
        showBookDetails(clickedButton);
    } else if (clickedButton.classList.contains("close-details")) {
        hideBookDetails();
    } else if (clickedButton.classList.contains("delete-btn")) {
        deleteBook(clickedButton);
    } else if (clickedButton.classList.contains("edit-btn")) {
        openModal("updateBook", clickedButton);
        hideBookDetails();
    }
});