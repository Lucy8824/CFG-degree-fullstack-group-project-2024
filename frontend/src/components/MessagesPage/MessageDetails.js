const MessageDetails = ({ message }) => {
    return (
        <>
            {message && <p>Message is: {message}</p>}
        </>
    )
}

export default MessageDetails;