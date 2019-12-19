import React, { useState, useEffect } from 'react';
import { withNavigationFocus } from 'react-navigation';
import { ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
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
  ActivityContainer,
} from './styles';

import api from '~/services/api';

import { reloadHelpOrders } from '~/store/modules/user/actions';

function Questions({ navigation }) {
  const [helpOrders, setHelpOrders] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [stopLoadingMore, setStopLoadingMore] = useState(false);
  const userId = useSelector(state => state.user.profile.id);
  const reloadHORders = useSelector(state => state.user.reloadHelpOrders);

  const dispatch = useDispatch();

  async function getHelpOrders() {
    try {
      if (page > 1) setLoadingMore(true);
      else setRefreshing(true);
      const response = await api.get(`students/${userId}/help-orders`, {
        params: {
          page,
        },
      });

      const data = response.data.map(item => ({
        ...item,
        dateAnswerFormatted: item.answer_at
          ? formatRelative(parseISO(item.answer_at), new Date(), {
              locale: pt,
              addSuffix: true,
            })
          : null,
        dateQuestionFormatted: formatRelative(
          parseISO(item.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      }));

      if (data.length === 0) {
        setStopLoadingMore(true);
        return;
      }
      if (page > 1) setHelpOrders([...helpOrders, ...data]);
      else setHelpOrders(data);
    } catch (error) {
      console.tron.log(error);
    } finally {
      setLoadingMore(false);
      setRefreshing(false);
    }
  }

  useEffect(() => {
    getHelpOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function nextPage() {
    if (stopLoadingMore) return;
    setPage(page + 1);
  }

  function reload() {
    console.tron.log('Reload');
    setStopLoadingMore(false);
    if (page === 1) getHelpOrders();
    setPage(1);
  }

  useEffect(() => {
    if (reloadHORders) {
      dispatch(reloadHelpOrders(false));
      reload();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadHORders]);

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
        onRefresh={() => {
          reload();
        }}
        refreshing={refreshing}
        onEndReached={() => {
          nextPage();
        }}
        onEndReachedThreshold={0.1}
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
              <DateUpdate>
                {item.dateQuestionFormatted || item.dateAwnserFormatted}
              </DateUpdate>
              <Question>{item.question}</Question>
            </ItemContent>
          </Item>
        )}
        ListFooterComponent={() => {
          if (!loadingMore) return null;
          return (
            <ActivityContainer>
              <ActivityIndicator size="large" color="#ee4e62" />
            </ActivityContainer>
          );
        }}
      />
    </Container>
  );
}

export default withNavigationFocus(Questions);
