import './Button.css'

type Props = {
    disabled?: boolean
    Icon?: React.ReactNode
    label?: string
    onPress?: () => void
};

const Button = ({
    disabled = false,
    Icon = null,
    label = '',
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
                {Icon}
            </button>
        </>
    )
};

export default Button;