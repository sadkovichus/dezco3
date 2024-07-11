import s from './Input.module.scss'

interface IProps {
    title: string;
    name?: string;
    type: string;
    placeholder?: string;
    className?: string;
    handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => string;
}

const Input = ({ title, name, type, placeholder = '', className }: IProps) => {
  return (
    <div className={`${s.input_wrapper} ${className}`}>
        <p className={s.title}>{title}</p>
        <input type={type} name={name || type} placeholder={placeholder} />
    </div>
  )
}

export default Input