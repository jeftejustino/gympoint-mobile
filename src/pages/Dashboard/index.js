import React, { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useSelector } from 'react-redux';
import { formatRelative, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';

import Button from '~/components/Button';

import {
  Container,
  CheckinList,
  CheckinItem,
  CheckinNumber,
  CheckinDate,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);
  const [loading, setLoading] = useState(false);
  const userId = useSelector(state => state.user.profile.id);

  useEffect(() => {
    async function getCheckins() {
      try {
        const response = await api.get(`students/${userId}/checkin`);

        let total = response.data.length;
        const data = response.data.map(item => ({
          ...item,
          order: total--,
          dateFormatted: formatRelative(parseISO(item.createdAt), new Date(), {
            locale: pt,
            addSuffix: true,
          }),
        }));

        setCheckins(data);
      } catch (error) {
        console.tron.log(error);
      }
    }

    getCheckins();
  }, [userId]);

  async function handleCheckin() {
    setLoading(true);
    try {
      const response = await api.post(`students/${userId}/checkin`);

      const total = checkins[0] ? checkins[0].order + 1 : 1;
      const data = {
        ...response.data,
        order: total,
        dateFormatted: formatRelative(
          parseISO(response.data.createdAt),
          new Date(),
          {
            locale: pt,
            addSuffix: true,
          }
        ),
      };

      setCheckins([data, ...checkins]);
    } catch (error) {
      Alert.alert(
        'Falha ao fazer check-in',
        'Você não pode mais realizar check-ins por enquanto!'
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <CheckinList
        ListHeaderComponent={
          <Button loading={loading} onPress={() => handleCheckin()}>
            Novo check-in
          </Button>
        }
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CheckinItem>
            <CheckinNumber>Check-in # {item.order}</CheckinNumber>
            <CheckinDate>{item.dateFormatted}</CheckinDate>
          </CheckinItem>
        )}
      />
    </Container>
  );
}

Dashboard.navigationOptions = {
  tabBarLabel: 'Check-ins',
  tabBarIcon: ({ tintColor }) => (
    <Icon name="edit-location" size={20} color={tintColor} />
  ),
};
