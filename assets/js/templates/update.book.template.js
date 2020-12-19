const updateBookTemplate = function(book) {
    return `
        <div class="form-modal_header">
            <h2>Update Book</h2>
            <button id="close-modal" class="btn">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 16 16"><path d="M13.957 3.457l-1.414-1.414-4.543 4.543-4.543-4.543-1.414 1.414 4.543 4.543-4.543 4.543 1.414 1.414 4.543-4.543 4.543 4.543 1.414-1.414-4.543-4.543z"></path></svg>
            </button>
        </div>
        <form id="form" autocomplete="off">
            <div class="input-wrapper">
                <label for="title"><span>*</span>Title:</label>
                <input type="text" id="title" name="title" value="${book.title}">
            </div>
            <div class="input-wrapper">
                <label for="author"><span>*</span>Author:</label>
                <input type="text" id="author" name="author" value="${book.author}">
            </div>
            <div class="input-wrapper">
                <label for="pages"><span>*</span>Number Of Pages:</label>
                <input type="number" id="pages" name="pages" value="${book.pages}">
            </div>
            <div class="input-wrapper">
                <label for="image-url">Cover Image URL:</label>
                <input type="text" id="image-url" name="image-url" value="${book.imageUrl}">
            </div>
            <div class="input-wrapper">
                <label for="read-status"><span>*</span>Read Status:</label>
                <select id="read-status" name="read-status">
                    <option value="">-- Please select an option --</option>
                    <option value="Read">Read</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Not Read">Not Read</option>
                </select>
            </div>
            <div class="input-wrapper submit">
                <button class="btn btn-solid">Update Book</button>
            </div>
        </form>
    `;
};