import styled from 'styled-components';

export const Container = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const Logo = styled.Image`
  width: 123px;
  height: 80px;
  align-self: center;
  margin-bottom: 20px;
`;

export const Input = styled.TextInput.attrs({ placeholderTextColor: '#999' })`
  height: 45px;
  border-radius: 4px;
  border: 1px solid #ddd;
  color: #333;
  margin-bottom: 15px;
  padding: 0px 10px;
`;

export const Form = styled.View`
  width: 350px;
  padding: 0px 25px;
`;
