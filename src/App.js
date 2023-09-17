import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import Progress from "./components/Progress";
import { db } from "./firebase";
import {
  query,
  collection,
  onSnapshot,
  updateDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import Completed from "./components/Completed";

const style = {
  bg: `min-h-screen h-full w-screen p-10 bg-gradient-to-r from-[#0d9488] to-[#99f6e4] flex items-center `,
  container: `h-full container grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 mx-auto gap-10`,
  grid_1st: `bg-slate-100 rounded-md shadow-lg p-4 col-span-1 md:col-span-2 xl:col-span-1 h-[200px]`,
  grid_2nd: `bg-slate-100 rounded-md shadow-lg p-4 col-span-1 items-center overflow-y-auto`,
  grid_3rd: `bg-slate-100 rounded-md shadow-lg p-4 col-span-1 items-center overflow-y-auto `,
  heading: `text-2xl font-bold text-left border-b-2 border-b-gray-200 text-gray-800 mb-4 pb-4`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-md px-4 rounded-md`,
  button: `border p-4 bg-teal-500 text-slate-100 rounded-md hover:bg-teal-00`,
  flown: `overflow-y-auto h-[300px] md:h-[500px] xl:h-[700px] mx-5`,
  urgent: ``,
  routine: ``,
  ahead: ``,
};

function App() {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");
  const [priority, setPriority] = useState("Routine");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const handleCategory = (e) => {
    setSelectedCategory(e.target.value);
  };

  const toDisplay = todos.filter((todo) => {
    if (selectedCategory === "All") {
      return true;
    }
    return todo.priority === selectedCategory;
  });

  const createTodo = async (e) => {
    e.preventDefault(e);
    if (input === "") {
      alert("Please enter a valid to do");
      return;
    }
    await addDoc(collection(db, "todos"), {
      text: input,
      completed: false,
      priority: priority,
    });
    setInput("");
  };

  useEffect(() => {
    const q = query(collection(db, "todos"));
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let todosArr = [];
      QuerySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, "todos", todo.id), {
      completed: !todo.completed,
    });
  };

  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, "todos", id));
  };
  const option_bg =
    priority === "Routine"
      ? "bg-[#f97316]"
      : priority === "Urgent"
      ? "bg-[#dc2626]"
      : "bg-[#f59e0b]";
  return (
    <div className={style.bg}>
      <div className={style.container}>
        <div className={style.grid_1st}>
          <h3 className={style.heading}>What to do</h3>
          <form className={style.form} onSubmit={createTodo}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className={style.input}
              type="text"
              placeholder="Add to do"
            ></input>
            <div>
              <select
                className={`mx-2 px-4 py-1 rounded-md border h-full font-bold text-white ${option_bg}`}
                name="priority"
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
              >
                <option
                  className="text-[#f97316] font-bold bg-white"
                  value="Routine"
                >
                  Routine
                </option>
                <option
                  className="text-[#dc2626] font-bold bg-white"
                  value="Urgent"
                >
                  Urgent
                </option>
                <option
                  className="text-[#f59e0b] font-bold bg-white"
                  value="Ahead"
                >
                  Ahead
                </option>
              </select>
            </div>
            <button className={style.button}>
              <AiOutlinePlus size={30} />
            </button>
          </form>
        </div>

        <div className={style.grid_2nd}>
          <h3 className={style.heading}>In progress</h3>
          <div className="flex justify-center">
            <select
              onChange={handleCategory}
              id="category"
              name="filter"
              className={`mx-5 mb-2 w-full px-4 py-2 rounded-md border h-full `}
            >
              <option className="bg-white" value="All">
                Filter by priority
              </option>
              <option className="bg-white" value="Routine">
                Routine
              </option>
              <option className="bg-white" value="Urgent">
                Urgent
              </option>
              <option className="bg-white" value="Ahead">
                Ahead
              </option>
            </select>
          </div>
          <div className={style.flown}>
            <ul>
              {toDisplay.map((todo, index) => (
                <Progress
                  key={index}
                  todo={todo}
                  category={todo.priority}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </div>
        </div>
        <div className={style.grid_3rd}>
          <h3 className={style.heading}>Completed ones</h3>
          <div className={style.flown}>
            <ul>
              {todos.map((todo, index) => (
                <Completed
                  key={index}
                  todo={todo}
                  toggleComplete={toggleComplete}
                  deleteTodo={deleteTodo}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
