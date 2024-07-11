import { useEffect, useState } from 'react';
import s from './ChatsList.module.scss';
import { Chat } from '../../../types/chats/chats';
import { get, getDatabase, ref, set } from 'firebase/database';
import { useAppSelector } from '../../../store';
import useStorage from '../../../hooks/useStorage';
import { UserState } from '../../../types/slice';
import UsersList from './users-list/UsersList';
import Chats from './chats/Chats';

const ChatsList = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const [users, setUsers] = useState<UserState[]>([]);
  const db = getDatabase();
  const [name, setName] = useState('');
  const [id, setId] = useState('');
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchErrorMessage, setSearchErrorMessage] = useState('');
  const [isCreate, setIsCreate] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(true);
    const getChats = async () => {
      await get(ref(db, `chats/${storageValue.id}`)).then(result => {
        if (!result.val()) {
          console.log('Err');
          return false;
        }
        setChats(Object.values(result.val()));
      });
      setIsLoading(false);
    };
    getChats();
  }, [isCreate]);

  const createChat = async () => {
    // TODO Сделать так что бы при переходе в чат которого нет, он будет автоматически создаваться
    setIsLoading(true);
    let sendData: Chat = {
      id,
      name,
      isGroup: false,
      chatPhoto: '',
      lastMsg: {
        message: 'Hello',
        viewed: false,
        time: '13:26',
      },
      users: [],
    };
    await set(ref(db, `chats/${storageValue.id}/${id}`), sendData);
    setIsLoading(false);
    setIsCreate(prev => !prev);
  };

  const search = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setIsLoading(!!e.target.value.length);
    setSearchLoading(!!e.target.value.length);
    setUsers([]);
    if (e.target.value.length) {
      await get(ref(db, `chats/`)).then(result => {
        if (result.val()) {
          const chat = Object.values(result.val()).filter((item: any) => item.name.includes(e.target.value)) as UserState[];
          if (chat.length) {
            setUsers(chat);
          } else {
            setChats(Object.values(result.val()));
          }
          console.log(result.val());
        } else {
          console.log('Нихуя нет');
        }
      });
      await get(ref(db, `users/`)).then(async result => {
        if (result.val()) {
          const user = (await Object.values(result.val()).filter((item: any) => item.name.includes(e.target.value))) as UserState[];
          console.log(user);
          if (user.length) {
            setUsers(user);
          }
        } else {
          console.log('Нихуя нет');
        }
      });
      setSearchLoading(false);
      setIsLoading(false);
    } else {
      setSearchErrorMessage('');
    }
  };

  return (
    <div className={s.chats_list}>
      <div className={`${searchLoading && s.active_search_container} ${s.search_container}`}>
        <input onInput={search} className={`${searchLoading && s.active_search} ${s.search}`} type='text' placeholder='Search...' />
      </div>
      <Chats isLoading={isLoading} chats={chats} />
      {users.length && <UsersList users={users} />}
    </div>
  );
};

export default ChatsList;
