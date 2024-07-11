import { Link } from 'react-router-dom';
import { UserState } from '../../../../types/slice';
import s from './UsersList.module.scss';
import { useAppSelector } from '../../../../store';
import useStorage from '../../../../hooks/useStorage';

type Props = {
  users: UserState[];
};

const UsersList = ({ users }: Props) => {
  const selector = useAppSelector(state => state.userSlice);
  const {storageValue} = useStorage('userData', selector);

  return (
    <ul className={s.users_list}>
      <p className={s.title}>users</p>
      {users.map((item, index) => (
        <li key={index}>
          <Link data-id={item.id} className={s.user} to={`${item.id};${storageValue.id}`}>
            <div className={s.photo}>
              <img src={item.photoURL} alt='' />
            </div>
            <div className={s.right}>
              <div className={s.top}>
                <p className={s.name}>{item.name}</p>
              </div>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default UsersList;
