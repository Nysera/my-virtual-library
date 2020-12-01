const infoAddBookBtn = document.querySelector("#info-add-book");
const overlayBackdrop = document.querySelector(".overlay-backdrop");
const formModal = document.querySelector(".form-modal");
const formWrapper = document.querySelector(".form-wrapper");
const addBookModal = document.querySelector("#add-book-modal");
const closeModalBtn = document.querySelector(".close-modal");



const openModal = function() {
    formModal.style.display = "flex";
    formModal.style.opacity = "1";
    if (this.id === "info-add-book") {
        addBookModal.style.display = "block";
    }
    setTimeout( () => {
        overlayBackdrop.classList.add("active");
        if (this.id === "info-add-book") {
            addBookModal.classList.add("active");
        }
    }, 25);
};

const closeModal = function() {
    overlayBackdrop.classList.remove("active");
    formWrapper.classList.remove("active");
    setTimeout(function() {
        formModal.style.display = "none";
        formModal.style.opacity = "0";
        formWrapper.style.display = "none";
    }, 400);
};



infoAddBookBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
formModal.addEventListener("click", function(event){
    if (event.target === this) {
        closeModal();
    }
});