import { createSlice } from "@reduxjs/toolkit";

const generateId = () => Number((Math.random() * 1000000).toFixed(0));

const noteSlice = createSlice({
  name: "notes",
  initialState: [],
  reducers: {
    createNote(state, action) {
      const newNote = action.payload;
      state.push(newNote);
    },
    toggleImportanceOf(state, action) {
      const id = action.payload;
      const noteToChange = state.find((n) => n.id === id);
      const changedNote = {
        ...noteToChange,
        important: !noteToChange.important,
      };
      console.log(JSON.parse(JSON.stringify(state)));
      return state.map((note) => (note.id !== id ? note : changedNote));
    },
  },
});

export const { createNote, toggleImportanceOf, appendNote, setNotes } =
  noteSlice.actions;
export default noteSlice.reducer;
