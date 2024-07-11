import { Outlet } from 'react-router';
import ChatsList from '../../widgets/chats/chats-list/ChatsList';
import s from './Chats.module.scss'

const Chats = () => {
    return (
        <div className={s.chats}>
            <ChatsList />
            <section className={s.chat}>
                <Outlet />
            </section>
        </div>
    )
};

export default Chats;
