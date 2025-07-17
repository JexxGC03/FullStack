
const Notification = ({ message }) => {
  if (!message) return null;

  return (
    <div className={`Notification ${message.type}`}>
      {message.message}
    </div>
  );
}

export default Notification