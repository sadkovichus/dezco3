import { ReactNode } from 'react';
import s from './Button.module.scss';

type Props = {
  className?: string;
  children: ReactNode
};

const Button = ({ className, children }: Props) => {
  return <button className={`${className} ${s.default_style}`}>{children}</button>;
};

export default Button;
