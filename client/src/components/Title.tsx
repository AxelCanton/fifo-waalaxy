import './Title.css';

type Props = {
    children: string
}

const Title = ({children}: Props) => {
    return <h2 className='title-content'>{children}</h2>;
};

export default Title;