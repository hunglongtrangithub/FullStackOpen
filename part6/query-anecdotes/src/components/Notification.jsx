import Context from "../Context";
import { useContext } from "react";

const Notification = () => {
  const [state, dispatch] = useContext(Context);
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
  };
  if (state === "") {
    return null;
  }
  return <div style={style}>{state}</div>;
};

export default Notification;
