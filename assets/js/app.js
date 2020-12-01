const infoAddBookBtn = document.querySelector("#info-add-book");
const overlayBackdrop = document.querySelector(".overlay-backdrop");
const formModal = document.querySelector(".form-modal");
const addBookModal = document.querySelector("#add-book-modal");



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



infoAddBookBtn.addEventListener("click", openModal);