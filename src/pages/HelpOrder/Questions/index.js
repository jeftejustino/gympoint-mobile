import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import Icon from 'react-native-vector-icons/MaterialIcons';

import Button from '~/components/Button';

import {
  Container,
  List,
  Item,
  ItemContent,
  Status,
  StatusText,
  DateUpdate,
  Question,
} from './styles';

import api from '~/services/api';

function Questions({ isFocused, navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const userId = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function getHelpOrders() {
      const response = await api.get(`students/${userId}/help-orders`);

      const data = response.data.map(item => ({
        ...item,
        dateFormatted: formatRelative(parseISO(item.updatedAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      setHelpOrders(data);
    }

    getHelpOrders();
  }, [isFocused, userId]);

  return (
    <Container>
      <List
        ListHeaderComponent={
          <Button onPress={() => navigation.navigate('HelpOrderCreate')}>
            Novo pedido de auxílio
          </Button>
        }
        data={helpOrders}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <Item
            onPress={() =>
              navigation.navigate('HelpOrderAnswer', { helpOrder: item })
            }
          >
            <ItemContent>
              <Status>
                <Icon
                  name="check-circle"
                  size={16}
                  color={item.answer ? '#42cb59' : '#999'}
                />
                <StatusText answer={item.answer && true}>
                  {item.answer ? 'Respondido' : 'Sem Resposta'}
                </StatusText>
              </Status>
              <DateUpdate>{item.dateFormatted}</DateUpdate>
              <Question>{item.question}</Question>
            </ItemContent>
          </Item>
        )}
      />
    </Container>
  );
}

export default withNavigationFocus(Questions);
