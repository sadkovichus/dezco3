import { Link } from 'react-router-dom';
import s from './AuthBtn.module.scss';
import { useAppSelector } from '../../../../store';

const AuthBtn = () => {
  const selector = useAppSelector(state => state.userSlice);

  return (
    <div className={s.auth}>
      {!selector.email ? (
        <>
          <Link className={s.log_in} to={'/auth'}>
            Log in
          </Link>
          <Link className={s.create_acc} to={'/auth?state=create'}>
            Create account
          </Link>
        </>
      ) : (
        <Link className={s.profile_link} to={`/users/${selector.id}`}>
          {selector.photoURL && <img src={selector.photoURL} alt='' />}
        </Link>
      )}
    </div>
  );
};

export default AuthBtn;
