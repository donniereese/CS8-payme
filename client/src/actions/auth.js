import axios from 'axios';

export const AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR';
export const USER_INVOICES = 'USER_INVOICES';
export const USER = 'USER';
export const DE_AUTH = 'DE_AUTH';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';

const token = localStorage.getItem('id');
axios.defaults.headers.common.Authorization = `bearer ${token}`;

////////////////////////////////////
// Auth
////////////////////////////////////

export function authError(error) {
  if (error) {
    return {
      type: AUTHENTICATION_ERROR,
      payload: error,
    };
  }
}

export function login(credentials, history) {
  return dispatch => {
    axios
      .post('/api/login', credentials, {
        headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
      })
      .then(res => {
        localStorage.setItem('id', res.data.token);
        axios.defaults.headers.common.Authorization = `bearer ${res.data.token}`;
        console.log(res.data.user);
        dispatch({ type: 'USER_INVOICES', payload: res.data.user.invoices });
        dispatch({ type: 'USER', payload: res.data.user });
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
        if (err.response) {
          dispatch(authError('Username/Password invalid.'));
        }
      });
  };
}

export function autoLogin(token, history) {
  return dispatch => {
    axios
      .get('/api/login', { headers: { Authorization: `bearer ${token}` } })
      .then(res => {
        localStorage.setItem('id', res.data.token);
        dispatch({ type: 'USER_INVOICES', payload: res.data.user.invoices });
        dispatch({ type: 'USER', payload: res.data.user });
        history.push('/invoices');
      })
      .catch(err => {
        if (err) console.log('error: ', err);
      });
  };
}

export function register(credentials, history) {
  return dispatch => {
    axios
      .post('/api/register', credentials, {
        headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
      })
      .then(res => {
        localStorage.setItem('id', res.data.token);
        // dispatch({ type: LOGIN, payload: res.data });
        history.push('/invoices');
      })
      .catch(error => {
        if (error) console.log('error: ', error.response);
        else if (error.response.data.err.errors) {
          dispatch(authError('Your username must be a valid email address.'));
        } else if (error.response.data.err.errmsg) {
          dispatch(authError('This username already exists.'));
        }
      });
  };
}

export function logout(history) {
  return dispatch => {
    dispatch({ type: 'DE_AUTH' });
    localStorage.removeItem('id');
    history.push('/');
  };
}
// { header: { Authorization: `bearer ${token}` } }

export function changePassword(newPassword, history) {
  return dispatch => {
    axios
      .post('/api/changepassword', newPassword, {
        headers: { Authorization: `bearer ${localStorage.getItem('id')}` },
      })
      .then(res => {
        dispatch({ type: 'AUTH_SUCCESS', payload: 'Successfully changed your password' });
        // history.push('/invoices');
      })
      .catch(error => {
        if (error) console.log('error: ', error.response);
        dispatch(authError('Error changing your password', error));
      });
  };
}
