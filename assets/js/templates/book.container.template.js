const bookContainerTemplate = function(books){
    const renderedBooks = books.map(function(book) {
    const readStatus = function() {
        if (book.readStatus === "Read") {
            return "read";
        } else if (book.readStatus === "In Progress") {
            return "in-progress";
        } else if (book.readStatus === "not read") {
            return "not-read";
        }
    };
    const image = function() {
        if (book.imageUrl != "") {
            return book.imageUrl;
        } else {
            return "assets/images/placeholder-cover.jpg";
        }
    }

    return `
        <div id="${book.id}" class="grid-item">
            <div class="grid-item_inner">
                <div class="grid-item_image">
                    <div class="grid-item_image-read-status ${readStatus()}">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 297 226.9" width="20px" height="15px"><path d="M45.43,0h0A10.62,10.62,0,0,0,34.83,10.63V170a10.67,10.67,0,0,0,10.64,10.63c24.74.06,66.19,5.21,94.78,35.14V49a10.23,10.23,0,0,0-1.46-5.39C115.32,5.8,70.23.06,45.43,0Z"/><path d="M262.17,170V10.63A10.61,10.61,0,0,0,259,3.08,10.49,10.49,0,0,0,251.59,0h0c-24.8.06-69.89,5.8-93.36,43.59A10.22,10.22,0,0,0,156.75,49V215.75c28.59-29.92,70-35.07,94.78-35.13A10.67,10.67,0,0,0,262.17,170Z"/><path d="M286.37,36.75h-7.7V170a27.2,27.2,0,0,1-27.1,27.13c-21,0-55.59,4.15-80.09,27.34,42.38-10.37,87-3.63,112.51,2.17a10.63,10.63,0,0,0,13-10.35V47.38A10.64,10.64,0,0,0,286.37,36.75Z"/><path d="M18.33,170V36.75h-7.7A10.64,10.64,0,0,0,0,47.38v168.9a10.62,10.62,0,0,0,13,10.35c25.46-5.8,70.14-12.55,112.52-2.17-24.51-23.19-59.1-27.29-80.09-27.34A27.2,27.2,0,0,1,18.33,170Z"/></svg>
                    </div>
                    <img src="${image()}">
                    <div class="grid-item_image-details-overlay">
                        <button class="btn btn-solid show-details">View Details</button>
                    </div>
                </div>
                <div class="grid-item_title">${book.title}</div>
            </div>
            <div class="grid-item_details">
                <div class="details-inner">
                    <button class="btn close-details">
                        <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path d="M13.957 3.457l-1.414-1.414-4.543 4.543-4.543-4.543-1.414 1.414 4.543 4.543-4.543 4.543 1.414 1.414 4.543-4.543 4.543 4.543 1.414-1.414-4.543-4.543z"></path></svg>
                    </button>
                    <div class="details-inner_image">
                        <img src="${image()}">
                    </div>
                    <div class="details-inner_content">
                        <div class="content_title"><h2>${book.title}</h2></div>
                        <div class="content_author">
                            <span>Author:</span> ${book.author}
                        </div>
                        <div class="content_pages">
                            <span>Number of pages:</span> ${book.pages}
                        </div>
                        <div class="content_status">
                        <span>Status:</span> ${book.readStatus}
                        </div>
                        <div class="content_buttons">
                            <button class="btn btn-solid edit-btn">Edit</button><button class="btn btn-hollow delete-btn">Delete</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `;
    }).join("");

    return `
        <div class="book-container_header"></div>
        <div class="book-container_grid">${renderedBooks}</div>
    `;
};