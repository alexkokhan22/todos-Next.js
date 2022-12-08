import ArrowIcon from "../images/arrow.svg";
import {Input} from "./Input";
import React, {FormEvent, useState} from "react";
import {IHeaderToDoListProps} from "../types/types";
import styles from '../styles/HeaderToDoList.module.scss'
import Button from "./Button";

export default function HeaderToDoList(props: IHeaderToDoListProps) {
    const {selectAllTasks, addNewTask} = props;

    const [inputValue, setInputValue] = useState<string>('');

    const [selectedAllTasks, setSelectedAllTask] = useState<boolean>(false);

    const onChangeInputValue = (e: FormEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value)
    };

    const addTask = () => {
        addNewTask(inputValue);
        setInputValue('');
    }

    const selectTasks = () => {
        if (!selectedAllTasks) {
            selectAllTasks(true);
            setSelectedAllTask(true);
        } else {
            selectAllTasks(false);
            setSelectedAllTask(false);
        }
    }

    return (
        <div className={styles.formContainer}>
            <Button className={styles.button} icon={<ArrowIcon/>} onClick={selectTasks}/>
            <Input
                type={'text'}
                value={inputValue}
                onChange={onChangeInputValue}
                placeholder={'What needs to be done?'}
                onEnterPress={addTask}
            />
        </div>
    )
}
