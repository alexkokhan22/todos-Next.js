//react
import React, {FormEvent, useState} from "react";

//components
import CloseIcon from "../images/close.svg";
import Checkbox from "./Checkbox";
import {Input} from "./Input";

//types
import {IToDoListTaskProps} from "../types/types";

//styles
import styles from "../styles/ToDoListTask.module.scss"

//helpers
import {classes} from "../utils/classes/classes";


export default function ToDoListTask(props: IToDoListTaskProps) {
    const {task, removeTask, changeTask} = props;

    const [showIcon, setShowIcon] = useState<boolean>(false);
    const [changeTaskTitle, setChangeTaskTitle] = useState<boolean>(false);
    const [inputValue, setInputValue] = useState<string>(task.title);

    const isShowIcon = (show: boolean) => () => setShowIcon(show);

    const isChangeTaskTitle = (change: boolean) => () => setChangeTaskTitle(change);

    const onChangeInputValue = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    };

    const editTask = () => {
        changeTask(task.id, inputValue, task.isCompleted);
        setChangeTaskTitle(false);
    };

    const resetEditTask = () => {
        setInputValue(task.title);
        setChangeTaskTitle(false);
    };

    return (
        <div
            className={styles.taskContainer}
            onMouseEnter={isShowIcon(true)}
            onMouseLeave={isShowIcon(false)}
        >
            <div className={styles.taskTitle}>
                <Checkbox
                    checked={task.isCompleted}
                    onChange={() => changeTask(task.id, task.title, !task.isCompleted)}
                />
                {!changeTaskTitle
                    ?
                    <span
                        className={classes(styles.title, task.isCompleted && styles.strikethroughTitle)}
                        onDoubleClick={isChangeTaskTitle(true)}
                        onKeyDown={editTask}>{task.title}
                    </span>
                    :
                    <Input
                        type={"text"}
                        value={inputValue}
                        onChange={onChangeInputValue}
                        onEnterPress={editTask}
                        onEscPress={resetEditTask}
                        closeInput={resetEditTask}
                    />
                }
            </div>
            {showIcon && !changeTaskTitle && <button onClick={removeTask([task.id])}><CloseIcon/></button>}
        </div>
    )
}
