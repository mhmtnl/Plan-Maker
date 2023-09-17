import React from "react";
import { FaRegTrashAlt } from "react-icons/fa"

const style = {
    li: `flex justify-between bg-slate-200 px-4 my-1`,
    row: `flex col-span-4`,
    text: `m-5 cursor-pointer text-left`,
    button: `cursor-pointer hover:text-teal-500 text-slate-800`,
    urgent: `text-xs bg-[#dc2626] h-7 rounded-md px-5 mx-4 pt-1 self-center  text-white `,
    routine: `text-xs bg-[#f97316] h-7 rounded-md px-5 mx-4 pt-1  self-center text-white`,
    ahead: `text-xs bg-[#f59e0b] h-7 rounded-md px-5 mx-4  pt-1 self-center text-white`,
}

const Progress = ({ todo, toggleComplete, deleteTodo }) => {
    
    return (
        <span>
            {!todo.completed ? <li className={style.li}>
                <div className={style.row} >
                    <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? "checked" : ""} />
                    <p onClick={() => toggleComplete(todo)} className={style.text}>{`${todo.text.charAt(0).toUpperCase()}${todo.text.slice(1)}`}</p>
                </div>
                <div className="flex justify-between ">
                    <p className={todo.priority === "Urgent" ? style.urgent : todo.priority === "Routine" ? style.routine : style.ahead}>{todo.priority}</p>
                    <button className={style.button} onClick={() => deleteTodo(todo.id)}><FaRegTrashAlt /></button>
                </div>
            </li> : null}

        </span>
    )
}

export default Progress
