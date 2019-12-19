import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const List = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const Item = styled(RectButton)`
  margin-top: 15px;
`;
export const ItemContent = styled.View`
  flex-direction: row;
  justify-content: space-between;
  border: 1px solid #ddd;
  flex-wrap: wrap;
  border-radius: 4px;
  padding: 20px;
`;

export const Status = styled.View`
  flex-basis: 50%;
  font-size: 14px;
  font-weight: bold;

  flex-direction: row;
  align-items: center;
`;

export const StatusText = styled.Text`
  margin-left: 10px;
  color: ${props => (props.answer ? '#42cb59' : '#999')};
`;
export const DateUpdate = styled.Text`
  font-size: 14px;
  flex-basis: 50%;
  text-align: right;
  color: #666;
`;

export const Question = styled.Text`
  align-self: stretch;
  color: #666;
  line-height: 26px;
  margin-top: 16px;
`;

export const ActivityContainer = styled.View`
  margin-top: 20px;
`;
