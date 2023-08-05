import { addToggleShowArchivedListener, renderNotes} from "./createNote.js";
import { initModalEventListeners } from "./modal.js";
import { updateSummaryTable } from "./createSummaryTable.js";

renderNotes();

initModalEventListeners();

updateSummaryTable();

addToggleShowArchivedListener()

