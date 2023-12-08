import { useSelector, useDispatch } from "react-redux";
import { vote } from "../reducers/anecdoteReducer";
import {
  clearNotification,
  displayNotification,
} from "../reducers/notificationReducer";

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => {
    if (state.filter === "") {
      return state.anecdotes;
    }
    return state.anecdotes.filter((anecdote) =>
      anecdote.content.toLowerCase().includes(state.filter.toLowerCase())
    );
  });
  const dispatch = useDispatch();

  const addVote = (id) => {
    dispatch(vote(id));
    const content = anecdotes.find((anecdote) => anecdote.id === id).content;
    dispatch(displayNotification(`you voted '${content}'`));
    setTimeout(() => {
      dispatch(clearNotification());
    }, 5000);
    console.log("vote", id);
  };
  console.log("anecdotes", anecdotes);
  return [...anecdotes] // copy the array because sort mutates the array
    .sort((a1, a2) => a2.votes - a1.votes)
    .map((anecdote) => (
      <div key={anecdote.id}>
        <div>{anecdote.content}</div>
        <div>
          has {anecdote.votes}
          <button onClick={() => addVote(anecdote.id)}>vote</button>
        </div>
      </div>
    ));
};

export default AnecdoteList;
