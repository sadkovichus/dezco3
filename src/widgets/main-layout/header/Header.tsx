import { Link } from 'react-router-dom';
import s from './Header.module.scss';
import Nav from './nav/Nav';
import AuthBtn from './authBtn/AuthBtn';
import { useAppSelector } from '../../../store';
import { getAuth } from 'firebase/auth';
import useStorage from '../../../hooks/useStorage';

const Header = () => {
  let balance = useAppSelector(state => state.balanceSlice).value;
  const auth = getAuth();
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);

  return (
    <header className={s.header}>
      <div className={s.container}>
        <Link className={s.logo_link} to='/'>
          <img className={s.logo} src='/public/assets/Logo.svg' alt='' />
        </Link>
        <Nav />
        {storageValue.email ? <div className={s.balance}>{balance.toLocaleString('en').replaceAll(',', ' ')} $</div> : null}
        <AuthBtn />
      </div>
    </header>
  );
};

export default Header;
