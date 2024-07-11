import { useEffect } from 'react';
import s from './Skeleton.module.scss';

const Skeleton = () => {
  const arr = new Array(15).fill(2);

  useEffect(() => {
    console.log(arr.length);
  }, []);

  return (
    <div className={s.container}>
      {arr.map((_, index) => (
        <div key={index} className={s.user}></div>
      ))}
    </div>
  );
};

export default Skeleton;
