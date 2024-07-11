import { Link, useSearchParams } from "react-router-dom";
import s from './Auth.module.scss'
import LogIn from "../../widgets/auth/log-in/LogIn";
import CreateUser from "../../widgets/auth/create/CreateUser";
import Another from "../../widgets/auth/another/Another";
import Pattern from "../../types/auth/pattern";

const Auth = () => {
  const [searchParams, _] = useSearchParams();
  const data = (searchParams.get('state') || 'signIn') as 'create' | 'signIn';

  const pattern: Pattern = {
    create: {
      title: 'Sign up with',
      component: <p className={s.go_another}>Already have an account? <Link to='/auth'>Log in</Link>.</p>,
      form: <CreateUser/>
    },
    signIn: {
      title: 'Continue with',
      component: <p className={s.go_another}>New to DEV Community? <Link to='/auth?state=create'>Create account</Link>.</p>,
      form: <LogIn/>
    }
  }

  return (
    <div className={s.wrapper}>
      <div className={s.container}>
        <header className={s.header}>
          <img className={s.logo} src='../../../public/assets/Logo.svg' alt='' />
          <p className={s.title}>Join the DEZ Community</p>
          <p className={s.info}>DEZ Community is a community of 1,211,184 amazing developers</p>
        </header>
        <Another pattern={pattern} data={data} />
        <span className={s.or}>OR</span>
        {pattern[data].form}
        <p className={s.policy}>
          By signing in, you are agreeing to our <Link to='/'>privacy policy</Link>, <Link to={'/'}>terms of use</Link> and{' '}
          <Link to='/'>code of conduct</Link>.
        </p>
        <span className={s.interval}></span>
        {pattern[data].component}
      </div>
    </div>
  );
}

export default Auth