import styled from 'styled-components/native';

export const Container = styled.SafeAreaView`
  flex: 1;
`;

export const CheckinList = styled.FlatList.attrs({
  showsVerticalScrollIndicator: false,
  contentContainerStyle: { padding: 30 },
})``;

export const CheckinItem = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border: 1px solid #ddd;
  height: 46px;
  padding: 0px 15px;
  border-radius: 4px;
  margin-top: 15px;
`;

export const CheckinNumber = styled.Text`
  color: #444;
  font-weight: bold;
  font-size: 14px;
`;

export const CheckinDate = styled.Text`
  color: #666;
  font-size: 14px;
`;

export const ActivityContainer = styled.View`
  margin-top: 20px;
`;
