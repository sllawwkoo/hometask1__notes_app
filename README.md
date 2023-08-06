### Notes App
This project is a web application for managing notes. Users can create, edit, archive, and delete notes.

##### Main Features:
1. Adding Notes: Users can create new notes by selecting a category ("Task," "Random Thought," "Idea," "Quote"), providing a title, and adding content. When creating a note, dates mentioned in the text will be automatically displayed in a special column.
2. Editing Notes: Users can edit existing notes by changing the category, title, and content. The modified data will be automatically saved.
3. Archiving Notes: Users can archive notes to hide them from the main notes list. Archived notes can be viewed in a separate section and restored if needed.

##### App Structure:
1. Notes List: Displayed as a table with columns for creation time, category, title, content, and dates mentioned in the note. Categories and dates are automatically recognized and displayed accordingly.

2. Archived Notes: In this section, users can view all archived notes and restore them if necessary.

3. Summary Table: Shows the count of notes by categories (separately for active and archived notes). The summary table updates automatically when the state of notes changes.

##### Technologies Used:
* HTML, CSS, and JavaScript: For building and styling the web application.
* DOM Manipulation: For dynamically creating and updating page elements.
* Regular Expressions: For recognizing and extracting dates from note text.
* Modular Approach: The code is divided into separate modules for improved readability and maintainability.

This project provides users with an easy-to-use interface and functionality for organizing and saving their important information in notes.