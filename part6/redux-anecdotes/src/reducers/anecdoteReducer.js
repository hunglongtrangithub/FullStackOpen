import { createSlice } from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes";

const anecdoteSlice = createSlice({
  name: "anecdotes",
  initialState: [],
  reducers: {
    vote: (state, action) => {
      const id = action.payload;
      return state.map((anecdote) =>
        anecdote.id !== id
          ? anecdote
          : { ...anecdote, votes: anecdote.votes + 1 }
      );
    },
    create: (state, action) => [...state, action.payload],
    initialize: (state, action) => action.payload,
  },
});

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch(initialize(anecdotes));
  };
};

export const createAnecdote = (content) => {
  return async (dispatch) => {
    const newAnecdote = await anecdoteService.createNew(content);
    dispatch(create(newAnecdote));
  };
};

export const voteAnecdote = (anecdoteId) => {
  return async (dispatch, getState) => {
    const anecdote = getState().anecdotes.find((a) => a.id === anecdoteId);
    const updatedAnecdote = {
      ...anecdote,
      votes: anecdote.votes + 1,
    };
    await anecdoteService.update(anecdoteId, updatedAnecdote);
    dispatch(vote(anecdoteId));
  };
};

export default anecdoteSlice.reducer;
export const { vote, create, initialize } = anecdoteSlice.actions;
