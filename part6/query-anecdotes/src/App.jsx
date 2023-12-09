import AnecdoteForm from "./components/AnecdoteForm";
import Notification from "./components/Notification";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useContext } from "react";
import Context from "./Context";
import axios from "axios";

const App = () => {
  const [state, dispatch] = useContext(Context);
  const result = useQuery({
    queryKey: ["anecdotes"],
    queryFn: () =>
      axios.get("http://localhost:3001/anecdotes").then((res) => res.data),
  });

  const queryClient = useQueryClient();
  const updateVoteMutation = useMutation({
    mutationFn: (updatedAnecdote) => {
      const { id, content, votes } = updatedAnecdote;
      return axios
        .put(`http://localhost:3001/anecdotes/${id}`, {
          content,
          votes: votes + 1,
        })
        .then((res) => res.data);
    },

    onSuccess: (votedAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ["anecdotes"] });
      dispatch({
        type: "SET_NOTIFICATION",
        content: `anecdote '${votedAnecdote.content}' voted`,
      });
      setTimeout(() => {
        dispatch({ type: "CLEAR_NOTIFICATION" });
      }, 5000);
    },
  });

  const handleVote = (anecdote) => {
    updateVoteMutation.mutate(anecdote);
    console.log("vote");
  };

  if (result.isLoading) {
    return <div>Loading...</div>;
  }

  if (result.error) {
    return (
      <div>Anecdote service is not available due to problems in server</div>
    );
  }

  const anecdotes = result.data;

  return (
    <div>
      <h3>Anecdote app</h3>

      <Notification />
      <AnecdoteForm />

      {anecdotes.map((anecdote) => (
        <div key={anecdote.id}>
          <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;
