import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Container, Form, Logo, Input } from './styles';

import Button from '~/components/Button';

import logo from '~/assets/images/logo.png';

import { SignInRequest } from '~/store/modules/auth/actions';

export default function SignIn() {
  const [userId, setUserId] = useState('');

  const dispatch = useDispatch();

  const loading = useSelector(state => state.auth.loading);

  function handleSubmit() {
    dispatch(SignInRequest(userId));
  }

  return (
    <Container>
      <Form>
        <Logo source={logo} />
        <Input
          autoCorrect={false}
          autoCapitalize="none"
          keyboardType="numeric"
          placeholder="Informe seu ID de cadastro"
          returnKeyType="next"
          onSubmitEditing={() => handleSubmit()}
          value={userId}
          onChangeText={setUserId}
        />
        <Button loading={loading} onPress={() => handleSubmit()}>
          Entrar no sistema
        </Button>
      </Form>
    </Container>
  );
}
