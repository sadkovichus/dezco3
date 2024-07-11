import { Link } from 'react-router-dom';
import s from './Nav.module.scss';
import { RoutesName } from '../../../../app/Routing/Routing';
import useTheme from '../../../../hooks/theme/useTheme';
import { useEffect, useState } from 'react';
import TypeThemes from '../../../../types/theme/themes';

type NavType = {
  img: string;
  to: string;
};

const Nav = () => {
  const [countTheme, setCountTheme] = useState(0);
  const allThemes: TypeThemes[] = ['dark', 'midle'];
  const [theme, setTheme] = useTheme(allThemes[countTheme]);

  useEffect(() => {
    console.log(theme);
  }, [theme]);
  const navList: NavType[] = [
    {
      img: '../../../../../public/assets/layout/header/nav/icons8-вопросительный-знак-100 1.svg',
      to: RoutesName.I,
    },
    {
      img: '/public/assets/layout/header/nav/icons8-news-96 2 (1).svg',
      to: RoutesName.News,
    },
    {
      img: '/public/assets/layout/header/nav/icons8-облако-диалога-с-точками-100 1 (1).svg',
      to: RoutesName.Chats,
    },
    {
      img: '/public/assets/layout/header/nav/icons8-добавить-100 1 (1).svg',
      to: RoutesName.NewPost,
    },
    {
      img: '/public/assets/layout/header/nav/icons8-напоминания-64 1 (1).svg',
      to: RoutesName.Notifications,
    },
  ];

  const themeHandle = () => {
    console.log('click');
    if (allThemes.length-1 === countTheme) {
      setCountTheme(0);
    } else {
      setCountTheme(prev => (prev += 1));
    }
  };

  useEffect(() => {
    console.log(countTheme)
    setTheme(allThemes[countTheme]);
  }, [countTheme]);

  return (
    <ul className={s.nav}>
      <button onClick={themeHandle} className={s.theme}>
        {allThemes[countTheme]}
      </button>
      {navList.map(({ to, img }) => (
        <li key={to}>
          <Link to={to}>
            <img src={img} alt='f' />
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default Nav;
