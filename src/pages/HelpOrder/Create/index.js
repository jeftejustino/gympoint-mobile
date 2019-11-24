import React, { useState } from 'react';
import { TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';

import { Container, TextArea } from './styles';

import Button from '~/components/Button';
import api from '~/services/api';

export default function Create({ navigation }) {
  const [question, setQuestion] = useState('');
  const [loading, setLoading] = useState(false);

  const userId = useSelector(state => state.user.profile.id);

  async function handleSubmit() {
    setLoading(true);
    try {
      const response = await api.post(`students/${userId}/help-orders`, {
        question,
      });

      navigation.goBack();
      Alert.alert(
        'Pedido enviado com sucesso!',
        'Assim que possivel responderemos o seu pedido!'
      );
    } catch (error) {
      Alert.alert(
        'Falha ao Enviar Pedido',
        'Ocorreu um erro ao enviar pedido, por favor tente novamente mais tarde!'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <TextArea
        value={question}
        onChangeText={setQuestion}
        placeholder="Inclua seu pedido de auxílio"
        returnKeyType="none"
        onSubmitEditing={() => handleSubmit()}
      />
      <Button
        onPress={() => {
          handleSubmit();
        }}
        loading={loading}
      >
        Enviar pedido
      </Button>
    </Container>
  );
}

Create.navigationOptions = ({ navigation }) => ({
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
