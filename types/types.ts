import React, {FormEvent, ReactNode} from 'react';

// reducer interfaces
export interface  ITask {
   id: number;
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

//ToDoListTask props
export interface IToDoListTaskProps {
   task: ITask;
   removeTask: (id: number) => () => void;
   changeTask: (id: number, title: string, isCompleted: boolean) => void;
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
