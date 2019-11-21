import { all, put, call, takeLatest } from 'redux-saga/effects';
import { SignInSuccess, SignInFailure } from './actions';

import api from '~/services/api';

export function* SignIn({ payload }) {
  try {
    const { email, password } = payload;

    const response = yield call(api.post, 'session', {
      email,
      password,
    });

    const { user, token } = response.data;

    api.defaults.headers.Authorization = `Bearer ${token}`;

    yield put(SignInSuccess(token, user));
  } catch (error) {
    yield put(SignInFailure());
  }
}

export function setToken({ payload }) {
  const { token } = payload.auth;
  if (token) {
    api.defaults.headers.Authorization = `Bearer ${token}`;
  }
}

export default all([
  takeLatest('@auth/SIGN_IN_REQUEST', SignIn),
  takeLatest('persist/REHYDRATE', setToken),
]);
