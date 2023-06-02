type Props = {
    onChange: (newValue: string) => void
    type?: 'number' | 'text'
    value?: string | number
}

const Input = ({
    onChange,
    type = 'text',
    value
}: Props) => {

    return (
        <input value={value} type={type} onChange={(event) => onChange(event.target.value)}/>
    );
};

export default Input;