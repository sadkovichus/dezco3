import { useParams } from 'react-router';

const Chat = () => {
  const { id } = useParams();

  return <div>{id}</div>;
};
//f

export default Chat;
