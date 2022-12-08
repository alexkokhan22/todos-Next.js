//react
import React, {useRef} from "react";

// utils
import {classes} from '../utils/classes/classes';
import {handleEnterDown, handleEscapeDown} from "../utils/keyDownHandler/keyDownHandler";

// styles
import styles from '../styles/Input.module.scss';

// types
import {IInputProps} from "../types/types";
import {useClickOutside} from "../utils/useClickOutside/useClickOutside";

export const Input = (props: IInputProps) => {
    const {
        label,
        className,
        classNameInput,
        autofocus,
        onEnterPress,
        onEscPress,
        maxLength,
        closeInput,
        ...otherProps
    } = props;

    const inputRef = useRef(null);

    useClickOutside(inputRef, () => closeInput && closeInput());

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLElement>) => {
        onEnterPress && handleEnterDown(e, onEnterPress);
        onEscPress && handleEscapeDown(e, onEscPress)
    };

    return (
        <div className={classes(styles.inputContainer, className)}>
            {label && (
                <div
                    className={styles.inputLabel}
                >
                    {label}
                </div>
            )}
            <input
                ref={inputRef}
                {...otherProps}
                className={classes(
                    styles.input,
                    classNameInput
                )}
                autoFocus={autofocus}
                onKeyDown={onKeyDownHandler}
                maxLength={maxLength}
            />
        </div>
    );
};
