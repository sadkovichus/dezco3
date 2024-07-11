import s from './PostImgFocus.module.scss';

type Props = {
  img: string;
  isActive: boolean;
  setIsActive: (state: boolean) => void;
};

const PostImgFocus = ({ img, isActive, setIsActive }: Props) => {
  return (
    <div onClick={() => setIsActive(false)} className={`${isActive ? s.active_bg : ''} ${s.bg}`}>
      <div onClick={() => setIsActive(true)} className={s.img_container}>
        <img src={img} alt='' />
      </div>
    </div>
  );
};

export default PostImgFocus;
