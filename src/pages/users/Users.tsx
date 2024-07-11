import { useEffect, useState } from 'react';
import s from './Users.module.scss';
import { get, getDatabase, ref } from 'firebase/database';
import { UserState } from '../../types/slice';
import { Link, useSearchParams } from 'react-router-dom';
import { useAppSelector } from '../../store';
import useStorage from '../../hooks/useStorage';
import Skeleton from '../../widgets/users/skeleton/Skeleton';

const Users = () => {
  const [users, setUsers] = useState<UserState[]>([]);
  const db = getDatabase();
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const data = searchParams.get('options') || '';

  useEffect(() => {
    setLoading(true);
    setUsers([]);
    if (data === 'friends') {
      get(ref(db, `users`)).then(res => {
        if (res.val()) {
          let values = Object.values(res.val());
          values.forEach((item: any) => {
            console.log(item);
            if (item.id === storageValue.id) {
                console.log('no');
            } else {
            let arr = storageValue.friends
              .replaceAll("'", '')
              .replaceAll('[', '')
              .replaceAll(']', '')
              .replaceAll('"', '')
              .replaceAll(' ', '')
              .split(',');
            console.log(arr);
            arr.forEach((us: string) => {
              if (us.replace('  ', '') === item.id) {
                setUsers(prev => [...prev, item]);
              }
            });
            }
            // if (arr.includes(item.id)) {
            //   setUsers(prev => [...prev, item]);
            // }
            // if (item.friends.length === 2) {
            //   console.log();
            // } else {
            //   let arr = item.friends.replaceAll("'", '').replaceAll('[', '').replaceAll(']', '').replaceAll('"', '').split(',');
            //   arr.map(us => {
            //     if (us === storageValue.id) {
            //       setUsers(prev => [...prev, item]);
            //     }
            //   });
            // }
          });
        }
      });
      console.log('friends');
      setLoading(false);
    } else {
      get(ref(db, `users`)).then(res => {
        if (res.val()) {
          setUsers(Object.values(res.val()) as UserState[]);
          setLoading(false);
        }
      });
    }
  }, [searchParams]);

  return (
    <div className={s.users}>
      <div className={s.content}>
        <aside className={s.menu}>
          <button className={data === 'friends' ? s.active_btn : ''} onClick={() => setSearchParams({ options: 'friends' })}>
            <svg fill='none' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'>
              <g fill='#939393'>
                <g clip-rule='evenodd' fill-rule='evenodd'>
                  <path d='M6.25 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0zm-2.06 5.07c.96-.55 2.22-.82 3.56-.82s2.6.27 3.56.82c.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54H3.5c-.61 0-1.24-.15-1.72-.54-.5-.4-.78-1-.78-1.71 0-1.21.71-2.12 1.69-2.68zm.75 1.3c-.65.37-.94.84-.94 1.38 0 .3.1.44.22.54.14.11.4.21.78.21H9c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38-.66-.39-1.65-.62-2.81-.62s-2.15.23-2.81.62zM13.75 3.5a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm-1.5 3a1.5 1.5 0 1 0 3 0 1.5 1.5 0 0 0-3 0z'></path>
                </g>
                <path d='M13.75 12.25c-.23 0-.45.01-.68.03a.75.75 0 1 1-.14-1.49c.27-.03.54-.04.82-.04 1.34 0 2.6.27 3.56.82.98.56 1.69 1.47 1.69 2.68 0 .7-.28 1.3-.78 1.71-.48.39-1.1.54-1.72.54h-3a.75.75 0 0 1 0-1.5h3c.39 0 .64-.1.78-.21.12-.1.22-.25.22-.54 0-.54-.29-1-.94-1.38a5.77 5.77 0 0 0-2.81-.62z'></path>
              </g>
            </svg>
            Friends
          </button>
          <button className={data === 'all' ? s.active_btn : ''} onClick={() => setSearchParams({ options: 'all' })}>
            <svg fill='none' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'>
              <path
                clip-rule='evenodd'
                d='M10 7.75a1.25 1.25 0 1 1 0-2.5 1.25 1.25 0 0 1 0 2.5zM7.25 6.5a2.75 2.75 0 1 1 5.5 0 2.75 2.75 0 0 1-5.5 0zm-.5 7.25c0-.42.23-.83.8-1.17A4.81 4.81 0 0 1 10 12c1.03 0 1.88.23 2.45.58.57.34.8.75.8 1.17 0 .3-.1.44-.22.54-.14.11-.4.21-.78.21h-4.5c-.39 0-.64-.1-.78-.21-.12-.1-.22-.25-.22-.54zM10 10.5c-1.22 0-2.37.27-3.23.8-.88.53-1.52 1.37-1.52 2.45 0 .7.28 1.3.78 1.71.48.39 1.1.54 1.72.54h4.5c.61 0 1.24-.15 1.72-.54.5-.4.78-1 .78-1.71 0-1.08-.64-1.92-1.52-2.45-.86-.53-2-.8-3.23-.8zm4-5.59c.06-.4.44-.7.85-.64a2.5 2.5 0 0 1-.35 4.98.75.75 0 0 1 0-1.5 1 1 0 0 0 .14-1.99.75.75 0 0 1-.63-.85zM15.76 10a.75.75 0 0 0 0 1.5c1.16 0 1.75.67 1.75 1.25 0 .22-.07.41-.19.55-.1.12-.24.2-.46.2a.75.75 0 0 0 0 1.5c1.43 0 2.15-1.21 2.15-2.25 0-1.71-1.6-2.75-3.25-2.75zM5 10.75a.75.75 0 0 0-.75-.75C2.61 10 1 11.04 1 12.75 1 13.79 1.72 15 3.15 15a.75.75 0 0 0 0-1.5.57.57 0 0 1-.47-.2.86.86 0 0 1-.18-.55c0-.58.6-1.25 1.75-1.25.41 0 .75-.34.75-.75zm.14-6.47a.75.75 0 0 1 .22 1.48 1 1 0 0 0 .14 1.99.75.75 0 1 1 0 1.5 2.5 2.5 0 0 1-.36-4.97z'
                fill='#939393'
                fill-rule='evenodd'></path>
            </svg>
            All
          </button>
        </aside>
        {loading ? (
          <Skeleton />
        ) : (
          <section className={s.container}>
            {users.map(item => (
              <Link to={item.id} className={s.user} key={item.id}>
                <div className={s.photo}>{item.photoURL ? <img src={item.photoURL} alt='' /> : <div className={s.photo_img}></div>}</div>
                <p className={s.name_email}>
                  {item.name}
                  <span className={s.email}>{item.email}</span>
                </p>
                <div className={s.right}>
                  {storageValue.id === item.id && <p className={s.is_you}>You now</p>}
                  <p className={s.role}>{item.role}</p>
                </div>
              </Link>
            ))}
          </section>
        )}
      </div>
    </div>
  );
};

export default Users;
