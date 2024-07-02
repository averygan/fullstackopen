const Notification = ({message}) =>
{
    if (message === null) {
        return null
    }
    const className = message.includes("error") ? 'error' : 'notification'
    return (
        <div className={className}>
            {message}
        </div>
    )
}

export default Notification