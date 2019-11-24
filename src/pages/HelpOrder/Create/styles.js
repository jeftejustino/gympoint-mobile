import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  padding: 30px 30px 0px;
  flex: 1;
`;

export const TextArea = styled.TextInput.attrs({
  multiline: true,
  numberOfLines: 15,
  textAlignVertical: 'top',
})`
  font-size: 16px;
  line-height: 19px;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 5px 15px;
  margin-bottom: 20px;
`;
