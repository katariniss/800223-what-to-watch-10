import { Link } from 'react-router-dom';
import { logoutAction } from '../../store/api-actions';
import { useAppDispatch, useAppSelector } from '../../hooks';
import { AuthorizationStatus } from '../../const';

function UserBlock(): JSX.Element {
  const dispatch = useAppDispatch();

  const {
    authorizationStatus,
    userInfo: {
      name,
      avatarUrl,
    }
  } = useAppSelector((state) => state);

  return (
    <ul className="user-block">
      {
        authorizationStatus === AuthorizationStatus.Auth && (
          <li className="user-block__item">
            <div className="user-block__avatar">
              <img src={avatarUrl} alt={name} width="63" height="63" />
            </div>
          </li>
        )
      }
      <li className="user-block__item">
        {
          authorizationStatus === AuthorizationStatus.Auth && (
            <Link
              className="user-block__link"
              onClick={(evt) => {
                evt.preventDefault();
                dispatch(logoutAction());
              }}
              to="/"
            >
              Sign out
            </Link>
          )
        }
        {
          authorizationStatus !== AuthorizationStatus.Auth && (
            <Link
              className="user-block__link"
              to="/login"
            >
              Login
            </Link>
          )
        }
      </li>
    </ul>
  );
}

export default UserBlock;
