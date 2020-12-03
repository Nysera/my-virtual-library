const addBook = document.querySelector("#add-book");
const formModal = document.querySelector(".form-modal");
const formModalInner = document.querySelector(".form-modal_inner")
const overlayBackdrop = document.querySelector(".overlay-backdrop");


const getBookValues = function() {
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const pages = document.querySelector("#pages").value;
    const imageUrl = document.querySelector("#image-url").value;
    const readStatus = document.querySelector("#read-status").value;
    
    closeModal();
};

const openModal = function() {
    formModalInner.innerHTML = addBookTemplate();
    formModal.style.display = "flex";
    formModal.style.opacity = "1";
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
    }, 400);
};



addBook.addEventListener("click", openModal);
document.addEventListener("click", function(event) {
    const { target } = event;

    if (target.id === "close-modal") {
        closeModal();
    } else if (target.id === "submit-book") {
        event.preventDefault();
        getBookValues();
    }
});