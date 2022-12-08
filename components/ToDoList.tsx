//react
import React, {FormEvent, useEffect, useReducer, useState} from "react";

//components
import ToDoListTask from "./ToDoListTask";
import {Input} from "./Input";
import FooterToDoList from "./FooterToDoList";

//images
import ArrowIcon from '../images/arrow.svg';

//styles
import styles from '../styles/ToDoList.module.scss'

//types
import {IAction, ITask, IToDoListState} from "../types/types";

//helpers
import {ADD_TASK, CHANGE_TASK, REMOVE_TASK, SELECT_ALL_TASKS} from "../constants/constant";
import {classes} from "../utils/classes/classes";
import {v1} from "uuid";
import HeaderToDoList from "./HeaderToDoList";

export default function ToDoList() {
    const initialState: IToDoListState = {tasks: []};

    const reducer = (state: IToDoListState, action: IAction) => {
        const {type, payload} = action;
        switch (type) {
            case ADD_TASK:
                return {...state, tasks: [...state.tasks, payload]};
            case REMOVE_TASK:
                return {...state, tasks: state.tasks.filter(t => !payload.includes(t.id))};
            case CHANGE_TASK:
                return {
                    ...state,
                    tasks: state.tasks.map(el =>
                        el.id === payload.id ? {...payload} : el
                    )
                };
            case SELECT_ALL_TASKS:
                return {
                    ...state,
                    tasks: state.tasks.map(el => ({...el, isCompleted: payload}))
                }
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [taskForToDoList, setTaskForTodolist] = useState<Array<ITask>>(state.tasks)


    useEffect(() => {
        setTaskForTodolist(state.tasks);
    }, [state.tasks]);


    const addNewTask = (value: string) => {
        dispatch({
            type: ADD_TASK,
            payload: {
                id: v1(),
                title: value,
                isCompleted: false,
            }
        })
    };

    const changeTask = (id: string, title: string, isCompleted: boolean) => {
        dispatch({
            type: CHANGE_TASK,
            payload: {
                id,
                title,
                isCompleted,
            }
        })
    };

    const removeTask = (id: Array<string>) => () => {
        dispatch({
            type: REMOVE_TASK,
            payload: id,
        });
    };

    const selectAllTasks = (selectAll: boolean) => {
        dispatch({
            type: SELECT_ALL_TASKS,
            payload: selectAll,
        });
    };

    const filteredTask = (filter: string) => {
        switch (filter) {
            case 'Active':
                const activeTask = state.tasks.filter(t => !t.isCompleted);
                return setTaskForTodolist(activeTask);
            case 'Completed':
                const completedTask = state.tasks.filter(t => t.isCompleted)
                return setTaskForTodolist(completedTask);
            case 'All':
                return setTaskForTodolist(state.tasks);
            default:
                return taskForToDoList;
        }
    }


    return (
        <div className={classes(styles.toDoListContainer, !!state.tasks.length && styles.paperLists)}>
            <HeaderToDoList selectAllTasks={selectAllTasks} addNewTask={addNewTask}/>
            {taskForToDoList.map(t => {
                return <ToDoListTask key={t.id} task={t} removeTask={removeTask} changeTask={changeTask}/>
            })}
            {!!state.tasks.length &&
                <FooterToDoList
                    tasks={state.tasks}
                    filteredTask={filteredTask}
                    removeTask={removeTask}
                />
            }
        </div>
    )
}
