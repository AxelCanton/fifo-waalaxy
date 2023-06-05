type Props = {
    inputClass?: string
    onChange: (newValue: string) => void
    type?: 'number' | 'text',
    value?: string | number
}

const Input = ({
    inputClass,
    onChange,
    type = 'text',
    value
}: Props) => {

    return (
        <input
            className={inputClass}
            type={type}
            onChange={(event) => onChange(event.target.value)}
            value={value}
        />
    );
};

export default Input;