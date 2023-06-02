import './Button.css'

type Props = {
    disabled?: boolean
    label: string
    onPress: () => void
};

const Button = ({
    disabled = false,
    label,
    onPress
}: Props) => {
    let classes = 'button-content';
    if (disabled) {
        classes += ' disabled';
    }

    return (
        <>
            <button className={classes} disabled={disabled} onClick={onPress}>
                {label}
            </button>
        </>
    )
};

export default Button;