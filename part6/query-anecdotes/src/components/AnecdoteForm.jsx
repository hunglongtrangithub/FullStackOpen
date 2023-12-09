import { useMutation, useQueryClient } from "@tanstack/react-query";
import Context from "../Context";
import { useContext } from "react";
import axios from "axios";

const AnecdoteForm = () => {
  const [state, dispatch] = useContext(Context);

  const queryClient = useQueryClient();

  const newAnecdoteMutation = useMutation({
    mutationFn: (anecdote) =>
      axios
        .post("http://localhost:3001/anecdotes", anecdote)
        .then((res) => res.data),

    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({
        type: "SET_NOTIFICATION",
        content: `anecdote '${newAnecdote.content}' created`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },

    onError: (error) => {
      dispatch({
        type: "SET_NOTIFICATION",
        content: error.response.data.error,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const onCreate = (event) => {
    event.preventDefault();
    const content = event.target.anecdote.value;

    newAnecdoteMutation.mutate({ content, votes: 0 });

    event.target.anecdote.value = "";
    console.log("new anecdote");
  };

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name="anecdote" />
        <button type="submit">create</button>
      </form>
    </div>
  );
};

export default AnecdoteForm;
