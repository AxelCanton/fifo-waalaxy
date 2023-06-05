import './QueueDisplay.css';

type Props = {
    queueContent: string[]
}

const QueueDisplay = ({
    queueContent
}: Props) => {
    return (
        <div className='queue-display-content'>
            {queueContent.length > 0 ? (
                <>
                    <span className='queue-display-text'>OUT</span>
                        {queueContent.map((action) => (
                            <span className='queue-display-action-container'>{action}</span>
                        ))}
                    <span className='queue-display-text'>IN</span>
                </>
            ) : <span>EMPTY</span>}
        </div>
    );
};

export default QueueDisplay;