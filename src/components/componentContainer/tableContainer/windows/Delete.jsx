import { useContext } from "react";
import AuthContext from "../../../../context/AuthContext";

function Delete({ id, data, setDelete, state, updateState }) {
  const { dispatch } = useContext(AuthContext);

  const handleDelete = async (id) => {
    dispatch({ type: "DARKEN", payload: false });
    if (data === "Salary") {
      await fetch(`http://localhost:8000/delete-salary/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      });
    } else {
      await fetch(`http://localhost:8000/delete-employee/${id}`, {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
      }).then(() => {
        updateState(!state);
        setDelete(false);
      });
    }
  };
  return (
    <div className="delete">
      <h4>Are you sure you want to delete this {data} ?</h4>
      <div className="deleteOptions">
        <button type="button" className="btn" onClick={() => handleDelete(id)}>
          Delete
        </button>
        <button
          type="button"
          className="btn"
          onClick={() => {
            setDelete(false);
            dispatch({ type: "DARKEN", payload: false });
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}

export default Delete;
