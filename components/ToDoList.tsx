//react
import React, {FormEvent, useReducer, useState} from "react";

//components
import ToDoListTask from "./ToDoListTask";
import {Input} from "./Input";

//images
import ArrowIcon from '../images/arrow.svg';

//styles
import styles from '../styles/ToDoList.module.scss'

//types
import {IAction, IToDoListState} from "../types/types";

//helpers
import {ADD_TASK, CHANGE_TASK, REMOVE_TASK} from "../constants/constant";

export default function ToDoList() {
    const initialState: IToDoListState = {tasks: []};

    const reducer = (state: IToDoListState, action: IAction) => {
        const {type, payload} = action;
        switch (type) {
            case ADD_TASK:
                return {...state, tasks: [...state.tasks, payload]};
            case REMOVE_TASK:
                return {...state, tasks: state.tasks.filter(t => t.id !== payload)};
            case CHANGE_TASK:
                return {
                    ...state,
                    tasks: state.tasks.map(el =>
                        el.id === payload.id ? {...payload} : el
                    )
                };
            default:
                throw new Error();
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    const [inputValue, setInputValue] = useState<string>('');

    const onChangeInputValue = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    };

    const addNewTask = () => {
        dispatch({
            type: ADD_TASK,
            payload: {
                id: state.tasks.length + 1,
                title: inputValue,
                isCompleted: true,
            }
        })
        setInputValue('');
    };

    const changeTask = (id: number, title: string, isCompleted: boolean) => {
        dispatch({
            type: CHANGE_TASK,
            payload: {
                id,
                title,
                isCompleted,
            }
        })
    };

    const removeTask = (id: number) => () => {
        dispatch({
            type: REMOVE_TASK,
            payload: id,
        });
    };


    return (
        <div className={styles.toDoListContainer}>
            <div className={styles.formContainer}>
                <button>
                    <ArrowIcon/>
                </button>
                <Input
                    type={'text'}
                    value={inputValue}
                    onChange={onChangeInputValue}
                    placeholder={'What needs to be done?'}
                    onEnterPress={addNewTask}
                />
            </div>
            {state.tasks.map(t => {
                return <ToDoListTask key={t.id} task={t} removeTask={removeTask} changeTask={changeTask}/>
            })}
        </div>
    )
}
