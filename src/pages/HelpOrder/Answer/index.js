import React from 'react';
import { TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import {
  Container,
  Content,
  Question,
  Awnser,
  Title,
  InfoDate,
  Text,
} from './styles';

export default function Answer({ navigation }) {
  const helpOrder = navigation.getParam('helpOrder');

  return (
    <Container>
      <Content>
        <Question>
          <Title>PERGUNTA</Title>
          <InfoDate>{helpOrder.dateQuestionFormatted}</InfoDate>
          <Text>{helpOrder.question}</Text>
        </Question>
        {helpOrder.answer && (
          <Awnser>
            <Title>RESPOSTA</Title>
            <InfoDate>{helpOrder.dateAnswerFormatted}</InfoDate>
            <Text>{helpOrder.answer}</Text>
          </Awnser>
        )}
      </Content>
    </Container>
  );
}

Answer.navigationOptions = ({ navigation }) => ({
  headerLeft: () => (
    <TouchableOpacity
      onPress={() => {
        navigation.goBack();
      }}
    >
      <Icon name="chevron-left" size={24} color="#333" />
    </TouchableOpacity>
  ),
  headerLeftContainerStyle: {
    paddingLeft: 15,
  },
});
