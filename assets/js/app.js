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
        const records = this.getAll();
        records.push(attributes);
        this.writeAll(records);
    }
    getAll() {
        return myLibrary;
    }
    writeAll(records) {
        myLibrary = records;
    }
    bookId() {
        return `${myLibrary.length + 1}`;
    }
    delete(bookId) {
        const records = this.getAll();
        const filtered = records.filter(function(record){
            return record.id !== bookId;
        });
        this.writeAll(filtered);
    }
};


const deleteBook = function(target) {
    const bookId = target.closest(".grid-item").id;
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

const openModal = function() {
    formModalInner.innerHTML = addBookTemplate();
    formModal.style.display = "flex";
    formModal.style.opacity = "1";
    document.body.style.overflow = "hidden";
    setTimeout(function() {
        overlayBackdrop.classList.add("active");
        formModalInner.classList.add("active");
    }, 25);
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

const showBookDetails = function(target) {
    target.closest(".grid-item").querySelector(".grid-item_details").classList.add("active");
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




addBookBtn.addEventListener("click", openModal);
document.addEventListener("click", function(event) {
    const { target } = event;

    if (target.id === "close-modal") {
        closeModal();
    } else if (target.id === "submit-book") {
        event.preventDefault();
        submitBook();
    } else if (target.classList.contains("show-details")) {
        showBookDetails(target);
    } else if (target.classList.contains("close-details")) {
        hideBookDetails();
    }
    else if (target.classList.contains("delete-btn")) {
        deleteBook(target);
    }
});