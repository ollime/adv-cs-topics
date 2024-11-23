import { useState } from "react";
import { useRef } from "react";

function TaskItem(props) {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(props.text)
    const count = props.count;
    const textRef = useRef(null);
    
    function openEdit() {
        fetch("/api")
        .then((response) => {
            return response.text();
        })
        .then((text) => {
            console.log(text)
        })
        .catch((err) => {
            console.log(err)
        })
        setEdit(!edit)
    }

    function editText() {
        let txt = textRef.current.value;
        props.updateTask(count, txt)
        setText(txt)
        openEdit();
    }

    function deleteTask() {
        props.deleteTask(count)
        openEdit();
    }

    return (
        <>
            <div className={"list-item flex-center"}>
                <div className={`display-panel ${edit ? "hidden" : "flex"}`}>
                    <span className="small-square-btn">{count}</span>
                    <span className="item-label">{text}</span>
                    <span className="edit-btn" onClick={openEdit}>E</span>
                </div>

                <div className={`edit-panel ${edit ? "flex" : "hidden"}`}>
                    <input type="text" className="item-label" defaultValue={text} ref={textRef} />
                    <span className="confirm-btn" onClick={editText}>O</span>
                    <span className="delete-btn" onClick={deleteTask}>X</span>
                    <span className="edit-btn" onClick={openEdit}>C</span>
                </div>
            </div>
        </>
    )
}

export default TaskItem;