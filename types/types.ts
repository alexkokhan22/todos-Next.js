import React, {FormEvent, ReactElement, ReactNode} from 'react';

// reducer interfaces
export interface ITask {
    id: string;
    title: string;
    isCompleted: boolean;
}

export interface IToDoListState {
    tasks: Array<ITask>;
}

export interface IAction {
    type: string;
    payload?: any;
}

//HeaderToDoList props
export interface IHeaderToDoListProps {
    selectAllTasks: (selectAll: boolean) => void;
    addNewTask: (value: string) => void;
}

//ToDoListTask props
export interface IToDoListTaskProps {
    task: ITask;
    removeTask: (id: Array<string>) => () => void;
    changeTask: (id: string, title: string, isCompleted: boolean) => void;
}

//FooterToDoList props
export interface IFooterToDoListProps {
    tasks: Array<ITask>;
    filteredTask: (filter: string) => void;
    removeTask: (id: Array<string>) => () => void;
}


//checkbox props
export interface ICheckbox {
    label?: ReactNode;
    checked: boolean;
    onChange: (value?: React.MouseEvent<HTMLElement>) => void;
    labelClassName?: string;
}

//input props
export type IInputProps = {
    type: 'text' | 'password' | 'reset' | 'submit' | 'email',
    value: string | number,
    placeholder?: string,
    label?: string | ReactNode,
    name?: string,
    disabled?: boolean,
    onChange?: (e: FormEvent<HTMLInputElement>) => void,
    onClick?: () => void,
    onEnterPress?: () => void,
    onEscPress?: () => void,
    className?: string,
    classNameInput?: string,
    autofocus?: boolean,
    maxLength?: number,
    closeInput?: () => void,
};

//button props
export interface IButtonProps {
    title?: string | ReactElement;
    disabled?: boolean;
    onClick?: (e: React.MouseEvent<HTMLElement>) => void;
    onKeyDown?: () => void;
    icon?: ReactElement | null;
    className?: string;
    autoFocus?: boolean;
}
