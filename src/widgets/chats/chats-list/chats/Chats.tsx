import { Link } from 'react-router-dom';
import { Chat } from '../../../../types/chats/chats';
import s from './Chats.module.scss'

type Props = {
    isLoading: boolean;
    chats: Chat[];
}

const Chats = ({isLoading, chats}: Props) => {
  return (
    <ul className={s.list}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        chats.map((item, index) => (
          <li key={index}>
            <Link className={s.chat} to={`${item.id}`}>
              <div className={s.photo}>
                <img src={item.chatPhoto} alt='' />
              </div>
              <div className={s.right}>
                <div className={s.top}>
                  <p className={s.name}>{item.name}</p>
                  <p className={s.last_msg_time}>{item.lastMsg?.time}</p>
                </div>
                <p className={s.last_msg}>{item.lastMsg?.message || 'Not messages'}</p>
              </div>
            </Link>
          </li>
        ))
      )}
    </ul>
  );
};

export default Chats;
