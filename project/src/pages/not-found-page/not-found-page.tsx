import Logo from '../../components/logo/logo';
import { Link } from 'react-router-dom';

function NotFoundPage(): JSX.Element {
  return (
    <section style={{
      padding: '30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center'}}
    >
      <Logo />
      <h1>404. Страница не найдена</h1>
      <Link to="/">Вернуться на главную</Link>
    </section>
  );
}

export default NotFoundPage;
