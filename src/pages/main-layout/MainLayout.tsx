import { Suspense, lazy, useEffect, useState } from 'react';
import { Outlet } from 'react-router';
import s from './MainLayout.module.scss';
import { useAppDispatch, useAppSelector } from '../../store';
import useStorage from '../../hooks/useStorage';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { get, getDatabase, ref, set } from 'firebase/database';
import { setUser } from '../../store/slices/userSlices/userSlice';

const Header = lazy(() => import('../../widgets/main-layout/header/Header'));

const MainLayout = () => {
  const [error, setError] = useState('');
  const selector = useAppSelector(state => state.userSlice);
  const { setValue, storageValue } = useStorage('userData', selector);
  const auth = getAuth();
  const dispatch = useAppDispatch();
  const db = getDatabase();
  const [userId, setUserId] = useState('');

  useEffect(() => {
    //  const data = {
    //    name: 'Alice',
    //    age: 25,
    //  };

    //  // Encrypt
    //  const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), 'secret key').toString();
    //  console.log(encryptedData);

    //  // Decrypt
    //  const bytes = CryptoJS.AES.decrypt(encryptedData, 'secret key');
    //  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
    //  console.log(decryptedData)

    storageValue.email ? dispatch(setUser(storageValue)) : null;
    onAuthStateChanged(auth, async user => {
      if (user?.email) {
        await get(ref(db, `users/${user.uid}`)).then(result => {
          if (result.val()) {
            setValue(result.val());
            dispatch(setUser(result.val()));
          } else {
            setError('User is absent');
          }
        });
      }
    });
  }, []);

  return (
    <div className={s.wrapper}>
      {error ? (
        <p>{error}</p>
      ) : (
        <>
          <Header />
          <main className={s.content}>
            <Suspense fallback={<p>Loading...</p>}>
              <Outlet />
            </Suspense>
          </main>
        </>
      )}
    </div>
  );
};

export default MainLayout;
