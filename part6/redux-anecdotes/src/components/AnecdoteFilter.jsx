import { useDispatch } from "react-redux";
import { setFilterAction } from "../reducers/filterReducer";

const AnecdoteFilter = () => {
  const dispatch = useDispatch();

  const handleChange = (event) => {
    const content = event.target.value;
    dispatch(setFilterAction(content));
  };

  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};

export default AnecdoteFilter;
