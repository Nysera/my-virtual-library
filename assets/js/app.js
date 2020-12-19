const addBookBtn = document.querySelector("#add-book");
const formModal = document.querySelector(".form-modal");
const formModalInner = document.querySelector(".form-modal_inner")
const overlayBackdrop = document.querySelector(".overlay-backdrop");
const bookContainer = document.querySelector(".book-container");
const infoContainer = document.querySelector(".info-container");
const storageSettings = document.querySelector(".storage-settings");
const localStorageBtn = document.querySelector("#local-store");
const noStorageBtn = document.querySelector("#no-store");

let myLibrary = [];

class FormValidation {
    constructor(form, fields, modal, bookId) {
        this.form = form;
        this.fields = fields;
        this.modal = modal;
        this.bookId = bookId;
        this.status = [];
    }
    init() {
        this.validateOnSubmit();
        this.validateOnInput();
    }
    validateOnSubmit() {
        this.form.addEventListener("submit", event => {
            event.preventDefault()
            this.fields.forEach((field, idx) => {
                if (this.status.length < this.fields.length) {
                    this.status.push(this.validateFields(field)); 
                } else {
                    this.status[idx] = this.validateFields(field);
                }
            });
            if (!this.status.includes(false)) {
                if (this.modal === "addBook") {
                    submitBook(this.fields);
                } else if (this.modal === "updateBook") {
                    updateBook(this.fields, this.bookId);
                }
            }
        });
    }
    validateOnInput() {
        this.fields.forEach((field, idx) => {
            field.addEventListener("input", () =>{
                this.status[idx] = this.validateFields(field);
            });
        });
    }
    validateFields(field) {
        if (field.id === "title" || field.id === "author") {
            if (field.value.trim() === "" && field.value.length === 0) {
                return this.setFieldState(field, "This value is required.", "fail");
            }
            return this.setFieldState(field, null, "pass");
        }
        if (field.id === "pages") {
            if (field.value <= 0) {
                return this.setFieldState(field, "This value is required and must be 1 or more pages.", "fail");
            }
            return this.setFieldState(field, null, "pass");
        }
        if (field.id === "read-status") {
            if (field.value === "") {
                return this.setFieldState(field, "This value is required.", "fail");
            }
            return this.setFieldState(field, null, "pass");
        }
    }
    setFieldState(field, message, error) {
        const parent = field.parentElement;
        const errorSpan = document.createElement("span");
        if (error === "fail") {
            parent.classList.add("error");
            errorSpan.classList.add("error-list");
            errorSpan.innerHTML = message;
            if (!parent.querySelector(".error-list")) {
                parent.append(errorSpan);
            }
            return false;
        } else if (error === "pass") {
            parent.classList.remove("error");
            if (parent.querySelector(".error-list")) {
                parent.querySelector(".error-list").remove();
            }
            return true;
        }
    }
};

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
    }
};

const updateBook = function(fields, bookId) {
    const [ title, author, pages, imageUrl, readStatus ] = fields

    if (!imageUrl.value.trim().includes("http")) {
        imageUrl.value = "";
    }
    
    const book = new Book();
    book.update(bookId, { 
        title: title.value, 
        author: author.value, 
        pages: pages.value, 
        imageUrl: imageUrl.value, 
        readStatus: readStatus.value 
    });

    if (localStorage.storageIsLocal) {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }

    const books = book.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();
};

const deleteBook = function(button) {
    const bookId = button.closest(".grid-item").id;
    const book = new Book();
    book.delete(bookId);

    if (localStorage.storageIsLocal) {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }

    const books = book.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();
};

const submitBook = function(fields) {
    const [ title, author, pages, imageUrl, readStatus ] = fields

    if (!imageUrl.value.trim().includes("http")) {
        imageUrl.value = "";
    }
    
    const newBook = new Book();
    newBook.createBook({ 
        title: title.value, 
        author: author.value, 
        pages: pages.value, 
        imageUrl: imageUrl.value, 
        readStatus: readStatus.value
    });

    if (localStorage.storageIsLocal) {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    }

    const books = newBook.getAll();
    bookContainer.innerHTML = bookContainerTemplate(books);

    hideInfoContainer();
    closeModal();
};

const openModal = function(modal, button) {
    if (modal === "addBook") {
        formModalInner.innerHTML = addBookTemplate();

        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const imageUrl = document.querySelector("#image-url");
        const readStatus = document.querySelector("#read-status");

        const form = document.querySelector("#form");
        const validation = new FormValidation(form, [ title, author, pages, imageUrl, readStatus ], "addBook", null);
        validation.init();
    } else if (modal === "updateBook") {
        const bookId = button.closest(".grid-item").id;
        const book = new Book();
        const selectedBook = book.getOne(bookId);
        
        formModalInner.innerHTML = updateBookTemplate(selectedBook);

        const title = document.querySelector("#title");
        const author = document.querySelector("#author");
        const pages = document.querySelector("#pages");
        const imageUrl = document.querySelector("#image-url");
        const readStatus = document.querySelector("#read-status");

        if (selectedBook.readStatus === "Read") {
            readStatus.value = "Read";
        } else if (selectedBook.readStatus === "In Progress") {
            readStatus.value = "In Progress"; 
        } else if (selectedBook.readStatus === "Not Read") {
            readStatus.value = "Not Read"; 
        }

        const form = document.querySelector("#form");
        const validation = new FormValidation(form, [ title, author, pages, imageUrl, readStatus ], "updateBook", bookId);
        validation.init();
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
        bookContainer.innerHTML = "";
        infoContainer.style.display = "flex";
        infoContainer.querySelector(".info-container_content").append(addBookBtn);
    }
};

const showBookDetails = function(button) {
    button.closest(".grid-item").querySelector(".grid-item_details").classList.add("active");
    overlayBackdrop.classList.add("active");
    document.body.style.overflow = "hidden";
};

const hideBookDetails = function() {
    document.querySelectorAll(".grid-item_details").forEach(function(button){
        button.classList.remove("active");
    });
    overlayBackdrop.classList.remove("active");
    document.body.style.overflow = "";
};

const storeLibraryLocal = function() {
    if (localStorage.storageIsLocal && !localStorage.myLibrary) {
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
    } else if (localStorage.storageIsLocal && localStorage.myLibrary !== "[]") {
        const getBooks = JSON.parse(localStorage.getItem("myLibrary"));
        myLibrary = getBooks;
        bookContainer.innerHTML = bookContainerTemplate(myLibrary);
        hideInfoContainer();
    }
};


noStorageBtn.addEventListener("click", function() {
    localStorage.clear();
});
localStorageBtn.addEventListener("click", function(){
    localStorage.setItem("storageIsLocal", true);
    storeLibraryLocal();
});
storageSettings.addEventListener("click", function() {
    if (!storageSettings.classList.contains("active")) {
        this.classList.add("active");
    } else {
        this.classList.remove("active");
    }
});
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

    if (!storageSettings.contains(event.target)) {
        storageSettings.classList.remove("active");
    }
});

storeLibraryLocal();