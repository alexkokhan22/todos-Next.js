// React
import React from 'react';

// styles
import styles from '../styles/Button.module.scss';

// types
import {IButtonProps} from "../types/types";

// utils
import {classes} from '../utils/classes/classes';
import {handleEnterDown} from "../utils/keyDownHandler/keyDownHandler";

export default function Button(props: IButtonProps) {
    const {
        title,
        icon,
        className,
        onKeyDown,
        onClick,
        ...otherProps
    } = props;

    const enterInterception = (e: React.KeyboardEvent<HTMLElement>) => {
        onKeyDown && handleEnterDown(e, onKeyDown);
    };

    const clickInterception = (e: React.MouseEvent<HTMLElement>) => {
        e.preventDefault();
        e.stopPropagation();
        onClick && onClick(e);
    };

    return (
        <button
            {...otherProps}
            onClick={clickInterception}
            onKeyDown={enterInterception}
            className={classes(className, styles.button)}
        >
            {title} {icon}
        </button>
    );
};
