import React from "react";
import { FaRegTrashAlt } from "react-icons/fa"

const style = {
    liComplete: `flex justify-between bg-slate-400 px-4 my-1 text-md text-center content-center `,
    row: `flex`,
    textComplete: `m-5 cursor-pointer line-through text-left`,
    button: `cursor-pointer hover:text-teal-300 text-slate-100`,
    urgent: `opacity-25 text-xs bg-[#dc2626] h-5 rounded-md px-2 mx-4 self-center text-white `,
    routine: `opacity-25 text-xs bg-[#f97316] h-5 rounded-md px-2 mx-4 self-center text-white`,
    ahead: `opacity-25 text-xs bg-[#f59e0b] h-5 rounded-md px-2 mx-4 self-center text-white`,
}

const Completed = ({ todo, toggleComplete, deleteTodo }) => {
    return (
        <span>
            {todo.completed ? <li className={style.liComplete}>
                <div className={style.row} >
                    <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? "checked" : ""} />
                    <p onClick={() => toggleComplete(todo)} className={style.textComplete}>{`${todo.text.charAt(0).toUpperCase()}${todo.text.slice(1)}`}</p>
                </div>
                <div className="flex justify-between">
                    <p className={todo.priority === "Urgent" ? style.urgent : todo.priority === "Routine" ? style.routine : style.ahead}>{todo.priority}</p>
                    <button className={style.button} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
                </div>
            </li> : null}
        </span>
    )
}

export default Completed
