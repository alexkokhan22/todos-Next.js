//components
import Button from "./Button";

//styles
import styles from "../styles/FooterToDoList.module.scss"

//types
import {IFooterToDoListProps} from "../types/types";
import {useState} from "react";
import {Active, All, Completed} from "../constants/constant";
import {classes} from "../utils/classes/classes";
import {v1} from "uuid";

export default function FooterToDoList(props: IFooterToDoListProps) {
    const {tasks, filteredTask, removeTask} = props;
    const [activeClass, setActiveClass] = useState<string>(All)

    const completedTasks = tasks.filter(t => t.isCompleted).map(t => t.id);
    const tasksNotCompleted = tasks.filter(t => !t.isCompleted);

    const buttonsForFilter = [
        {
            id: v1(), title: All, onClick: () => {
                filteredTask(All);
                setActiveClass(All);
            }
        },
        {
            id: v1(), title: Active, onClick: () => {
                filteredTask(Active);
                setActiveClass(Active);
            }
        },
        {
            id: v1(), title: Completed, onClick: () => {
                filteredTask(Completed);
                setActiveClass(Completed);
            }
        },
    ];


    return (
        <div className={styles.footerContainer}>
            <div className={styles.countContainer}>
                <span>
                {tasksNotCompleted.length} {tasksNotCompleted.length > 1 ? 'items' : 'item'} left
            </span>
            </div>
            <div className={styles.filterButtonsContainer}>
                {buttonsForFilter.map(b => {
                    return (
                        <Button
                            className={classes(styles.button, activeClass === b.title && styles.activeButton)}
                            key={b.id}
                            onClick={b.onClick}
                            title={b.title}
                        />
                    )
                })}
            </div>
            <div className={styles.removeCompletedTaskButton}>
                {!!completedTasks.length && <Button title={'Clear completed'} onClick={removeTask(completedTasks)}/>}
            </div>
        </div>
    )
}
