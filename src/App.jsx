import React from "react";
import { Provider, useSelector, useDispatch } from "react-redux";
import { addData, editData, removes } from "./redux/reducers/global";
import { store } from "./redux/store.js";
import { FaTrashCan } from "react-icons/fa6";
import { FaPenToSquare } from "react-icons/fa6";
import { FaSquareCheck } from "react-icons/fa6";
import { FaSquareXmark } from "react-icons/fa6";
import "./index.css";
import { Container } from "postcss";

function CounterDisplay() {
  async function newData() {
    try {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/users"
      );
      if (!response.ok) {
        throw new Error(`response status ${response.status}`);
      }
      const json = await response.json();
      json.forEach((items) =>
        dispatch(
          addData({
            name: items.name,
            email: items.email,
          })
        )
      );
    } catch (error) {
      console.error(error.message);
    }
  }
  const dispatch = useDispatch();
  const forms = useSelector((state) => state.global.forms);
  // function data(event) {
  //   event.preventDefault();
  //   const data = event.target.list.value;
  //   // const age = event.target.age.value;
  //   dispatch(addData({ data }));
  // }
  const [edit, setEdit] = React.useState(true);
  function btnEdit() {
    if (edit === true) {
      setEdit(false);
    } else {
      setEdit(true);
    }
  }
  const [remove, setRemove] = React.useState(true);
  function btnRemove() {
    if (remove === true) {
      setRemove(false);
    } else {
      setRemove(true);
    }
  }

  function deletItems(index) {
    dispatch(removes(index));
    if (remove === true) {
      setRemove(false);
    } else {
      setRemove(true);
    }
  }

  return (
    <div className="flex flex-col gap-[20px] justify-center items-center h-screen">
      <button type="button" onClick={newData} className="bg-green-400 p-[10px]">
        click
      </button>
      <div className="p-[30px] rounded-xl  bg-purple-400">
        <table className="w-full">
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>REMOVE</th>
              <th>EDIT</th>
            </tr>
          </thead>
          <tbody>
            {forms.map((element, index) => {
              return (
                <tr>
                  <td>{element.name}</td>
                  <td>{element.email}</td> 
                  <td>
                    <button
                      type="button"
                      onClick={() => btnRemove(index)}
                      className="bg-white p-[10px] rounded-[10px]"
                    >
                      <FaTrashCan />
                    </button>
                  </td>
                  <td>
                    <button
                      type="button"
                      onClick={btnEdit}
                      className="bg-white p-[10px] rounded-[10px]"
                    >
                      <FaPenToSquare />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <div className={remove ? "hidden " : ""}>
        <div className="bg-black/50 top-[0] left-[0] w-full flex absolute items-center justify-center  h-screen">
          <div className="w-[300px] rounded-[20px] text-black p-[40px] h-auto bg-indigo-500">
            <div className="text-white">
              Are you sure you want to delete data🚮?
            </div>
            <div>
              <button
                type="button"
                onClick={deletItems}
                className="bg-white p-[10px] rounded-xl"
              >
                <FaSquareCheck />
              </button>
              <button
                type="button"
                onClick={btnRemove}
                className="bg-white p-[10px] rounded-xl"
              >
                <FaSquareXmark />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className={edit ? "hidden " : ""}>
        <div className="bg-black/50 top-[0] left-[0] w-full flex absolute items-center justify-center  h-screen">
          <form>
            <div className="flex flex-col w-[300px] rounded-[20px] text-black p-[40px] gap-[40px] h-auto bg-indigo-500">
              <div className="text-white">do you want to edit the data?</div>
              <div className="flex flex-col gap-[10px]">
                <input
                  className="p-[10px] rounded-xl"
                  type="text"
                  placeholder="NAME"
                />
                <input
                  className="p-[10px] rounded-xl"
                  type="email"
                  placeholder="EMAIL"
                />
              </div>
              <button
                type="button"
                onClick={btnEdit}
                className="bg-white p-[5px] rounded-xl"
              >
                confirm
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <CounterDisplay />
    </Provider>
  );
}

export default App;
