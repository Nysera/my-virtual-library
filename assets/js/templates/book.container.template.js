const bookContainerTemplate = function(books){
    const renderedBooks = books.map(function(book) {

    const readStatus = function() {
        if (book.readStatus === "read") {
            return "read";
        } else if (book.readStatus === "in progress") {
            return "in-progress";
        } else if (book.readStatus === "not read") {
            return "not-read";
        }
    };
    const image = function() {
        if (book.imageUrl != "") {
            return book.imageUrl;
        } else {
            // add a proper placeholder image
            return "http://via.placeholder.com/180x270";
        }
    }

    return `
        <div id="${book.id}" class="book">
            <div class="book-image">
            <div class="book-image_read-status ${readStatus()}">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 226.9" width="20px" height="15px"><path d="M45.43,0h0A10.62,10.62,0,0,0,34.83,10.63V170a10.67,10.67,0,0,0,10.64,10.63c24.74.06,66.19,5.21,94.78,35.14V49a10.23,10.23,0,0,0-1.46-5.39C115.32,5.8,70.23.06,45.43,0Z"/><path d="M262.17,170V10.63A10.61,10.61,0,0,0,259,3.08,10.49,10.49,0,0,0,251.59,0h0c-24.8.06-69.89,5.8-93.36,43.59A10.22,10.22,0,0,0,156.75,49V215.75c28.59-29.92,70-35.07,94.78-35.13A10.67,10.67,0,0,0,262.17,170Z"/><path d="M286.37,36.75h-7.7V170a27.2,27.2,0,0,1-27.1,27.13c-21,0-55.59,4.15-80.09,27.34,42.38-10.37,87-3.63,112.51,2.17a10.63,10.63,0,0,0,13-10.35V47.38A10.64,10.64,0,0,0,286.37,36.75Z"/><path d="M18.33,170V36.75h-7.7A10.64,10.64,0,0,0,0,47.38v168.9a10.62,10.62,0,0,0,13,10.35c25.46-5.8,70.14-12.55,112.52-2.17-24.51-23.19-59.1-27.29-80.09-27.34A27.2,27.2,0,0,1,18.33,170Z"/></svg>
            </div>
                <img src="${image()}">
                <div class="book-image_details-overlay">
                    <button class="btn btn-solid show-details">View details</button>
                </div>
            </div>
            <div class="book-title">${book.title}</div>
            <div class="book-details"></div>
        </div>
    `;
    }).join("");

    return `
        <div class="book-container_header"></div>
        <div class="book-container_grid">${renderedBooks}</div>
    `;
};