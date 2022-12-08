//utils
import {classes} from '../utils/classes/classes';

// styles
import styles from '../styles/Checkbox.module.scss';

// models
import {ICheckbox} from "../types/types";

export default function Checkbox(props: ICheckbox) {
    const {
        label,
        checked,
        onChange,
        labelClassName,
    } = props;

    return (
        <div
            className={classes(styles.checkboxContainer)}
        >
            <div
                className={classes(styles.checkbox, checked && styles.checked)}
                onClick={onChange}
            />
            {label && (
                <span
                    className={classes(styles.checkboxLabel, labelClassName)}
                    onClick={onChange}
                >
          {label}
        </span>
            )}
        </div>
    );
};
