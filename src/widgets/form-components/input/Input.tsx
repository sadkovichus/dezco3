import { ComponentProps, ElementType } from 'react';
import s from './Input.module.scss';

type InputOwnProps<E extends ElementType = ElementType> = {
  className?: string;
  name?: string;
  type: string;
  bg?: boolean;
  as?: E;
};

type InputProps<E extends ElementType> = InputOwnProps<E> & Omit<ComponentProps<E>, keyof InputOwnProps>;

const defaultElement = 'input';

function Input<E extends ElementType = typeof defaultElement>({ className, name, type, as, bg, ...otherProps }: InputProps<E>) {
  const TagName = as || defaultElement;

  return (
    <>
      <TagName {...otherProps} className={`${bg && s.bg} ${className} ${s.default_style}`} name={name || type} type={type} />
    </>
  );
}

export default Input;
