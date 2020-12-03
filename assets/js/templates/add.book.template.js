const addBookTemplate = function(){
    return `
        <div class="form-modal_header">
            <h2>Add a new book</h2>
            <button id="close-modal" class="btn">
                <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 16 16"><path d="M13.957 3.457l-1.414-1.414-4.543 4.543-4.543-4.543-1.414 1.414 4.543 4.543-4.543 4.543 1.414 1.414 4.543-4.543 4.543 4.543 1.414-1.414-4.543-4.543z"></path></svg>
            </button>
        </div>
        <form autocomplete="off">
            <div class="input-wrapper">
                <label for="title">Title:</label>
                <input type="text" id="title" name="title">
            </div>
            <div class="input-wrapper">
                <label for="author">Author:</label>
                <input type="text" id="author" name="author">
            </div>
            <div class="input-wrapper">
                <label for="pages">Number Of Pages:</label>
                <input type="number" id="pages" name="pages">
            </div>
            <div class="input-wrapper">
                <label for="image-url">Cover Image URL:</label>
                <input type="text" id="image-url" name="image-url">
            </div>
            <div class="input-wrapper">
                <label for="read-status">Read Status:</label>
                <select id="read-status" name="read-status">
                    <option value="">-- Please select an option --</option>
                    <option value="read">Read</option>
                    <option value="in progress">In Progress</option>
                    <option value="not read">Not Read</option>
                </select>
            </div>
            <div class="input-wrapper submit">
                <button type="button" id="submit-book" class="btn btn-solid">Add Book</button>
            </div>
        </form>
    `;
};