import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchUserList } from "../reducers/userListReducer";

const UserDetail = () => {
  const dispatch = useDispatch();
  const id = useParams().id;
  const userList = useSelector((state) => state.userList);
  const user = userList.find((user) => user.id === id);

  useEffect(() => {
    dispatch(fetchUserList());
  }, [dispatch]);

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog) => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default UserDetail;
