import { all, put, call, takeLatest } from 'redux-saga/effects';
import { Alert } from 'react-native';

import { SignInSuccess, SignInFailure } from './actions';

import api from '~/services/api';

export function* SignIn({ payload }) {
  try {
    const { userId } = payload;

    const response = yield call(api.get, `student/${userId}`);

    const profile = response.data;

    yield put(SignInSuccess(profile));
  } catch (error) {
    yield put(SignInFailure());
    Alert.alert(
      'Falha na autenticação',
      'O ID informado não consta no nosso cadastro!'
    );
  }
}

export default all([takeLatest('@auth/SIGN_IN_REQUEST', SignIn)]);
