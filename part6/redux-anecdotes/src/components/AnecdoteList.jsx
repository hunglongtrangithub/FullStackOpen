import { useSelector, useDispatch } from "react-redux";
import { voteAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
    dispatch(voteAnecdote(id));
    const content = anecdotes.find((anecdote) => anecdote.id === id).content;
    dispatch(setNotification(`you voted '${content}'`, 5));
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
