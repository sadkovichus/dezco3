import s from './CreatePost.module.scss';
import { useAppSelector } from '../../store';
import useStorage from '../../hooks/useStorage';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import createPostFn from '../../features/posts/create-post/createPostFn';
import { useEffect, useState } from 'react';
import Input from '../../widgets/form-components/input/Input';
import Button from '../../widgets/form-components/btn/Button';

const CreatePost = () => {
  const selector = useAppSelector(state => state.userSlice);
  const { storageValue } = useStorage('userData', selector);
  const [isWrong, setIsWrong] = useState(false);
  const navigate = useNavigate();
  const [postPhoto, setPostPhoto] = useState<string[]>([]);

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { title, text } = e.currentTarget.elements as any;
    if (title.value.length === 0 || text.value.length === 0) return setIsWrong(true);
    setIsWrong(false);
    createPostFn(e, storageValue, navigate, postPhoto);
  };

  const createPhoto = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files as FileList) {
      for (let i = 0; i < e.target.files.length; i++) {
        let reader = new FileReader();
        reader.readAsDataURL(e.target.files[i]);
        reader.onload = async function () {
          if (reader.result) {
            setPostPhoto(prev => [reader.result.toString(), ...prev]);
          } else {
            throw new Error('Null reader result');
          }
        };
        reader.onerror = function () {
          console.log('Error path file');
        };
      }
    } else console.log('Error path file');
  };

  useEffect(() => {
    console.log(postPhoto);
  }, [postPhoto]);

  return (
    <section className={s.create}>
      {!storageValue.email ? (
        <div className={s.info}>
          <p>
            To create posts you need to be logged in to the system. Want to <Link to={'/auth?state=create'}>register</Link>?
          </p>
        </div>
      ) : (
        <form className={s.form} onSubmit={handleFormSubmit}>
          <Input className={s.title} name='title' type='text' placeholder='Title of your post' />
          <Input as='textarea' type='text' cols={30} rows={10} placeholder='Hello, this is the text of my post' />
          <label className={`${s.btn} ${s.post_photo}`} htmlFor={'id'}>
            <input multiple onChange={createPhoto} type='file' id={'id'} />
            Add photo for post
          </label>
          {postPhoto && (
            <div className={s.imgs}>
              {postPhoto.map(item => (
                <div key={item}>
                  <img className={s.post_photo_img} src={item} alt='' />
                </div>
              ))}
            </div>
          )}
          {isWrong && <p className={s.wrong}>All fields must be completed</p>}
          <Button className={s.send}>Create</Button>
        </form>
      )}
    </section>
  );
};

export default CreatePost;
