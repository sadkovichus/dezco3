import { ReactNode } from "react";
import s from './SendBtn.module.scss'

type Props = {
    children: ReactNode;
    className?: string;
}

const SendBtn = ({ children, className = '' }: Props) => {
    return (
        <button className={`${className} ${s.btn}`}>{children}</button>
    )
};

export default SendBtn;
