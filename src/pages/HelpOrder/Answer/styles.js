import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
  padding: 30px;
`;

export const Content = styled.View`
  border: 1px solid #ddd;
  border-radius: 4px;
`;

export const Question = styled.View`
  padding: 20px;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Awnser = styled.View`
  padding: 0 20px 20px;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const Title = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
  flex-basis: 50%;
`;

export const InfoDate = styled.Text`
  color: #666;
  flex-basis: 50%;
  font-size: 14px;
  text-align: right;
`;

export const Text = styled.Text`
  color: #666;
  font-size: 14px;
  line-height: 26px;
  margin-top: 16px;
  flex-basis: 100%;
`;
