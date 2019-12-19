import React, { useState, useEffect } from 'react';
import { Alert, ActivityIndicator } from 'react-native';
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
  ActivityContainer,
} from './styles';

import api from '~/services/api';

export default function Dashboard() {
  const [checkins, setCheckins] = useState([]);
  const [page, setPage] = useState(1);
  const [refreshing, setRefreshing] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stopLoadingMore, setStopLoadingMore] = useState(false);
  const userId = useSelector(state => state.user.profile.id);

  async function getCheckins() {
    try {
      if (page > 1) setLoadingMore(true);
      else setRefreshing(true);

      const response = await api.get(`students/${userId}/checkin`, {
        params: {
          page,
        },
      });

      let total = response.headers.count - (page - 1) * 10;
      const data = response.data.map(item => ({
        ...item,
        // eslint-disable-next-line no-plusplus
        order: total--,
        dateFormatted: formatRelative(parseISO(item.createdAt), new Date(), {
          locale: pt,
          addSuffix: true,
        }),
      }));

      if (data.length === 0) {
        setStopLoadingMore(true);
        return;
      }
      if (page > 1) setCheckins([...checkins, ...data]);
      else setCheckins(data);
    } catch (error) {
      console.tron.log(error);
    } finally {
      setLoadingMore(false);
      setRefreshing(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  useEffect(() => {
    getCheckins();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  function nextPage() {
    if (stopLoadingMore) return;
    console.tron.log(`STOP LOADING ${stopLoadingMore}`);
    setPage(page + 1);
  }

  function reload() {
    setPage(1);
    setStopLoadingMore(false);
  }

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
        onRefresh={() => {
          reload();
        }}
        refreshing={refreshing}
        onEndReached={() => {
          nextPage();
        }}
        onEndReachedThreshold={0.1}
        data={checkins}
        keyExtractor={item => String(item.id)}
        renderItem={({ item }) => (
          <CheckinItem>
            <CheckinNumber>Check-in # {item.order}</CheckinNumber>
            <CheckinDate>{item.dateFormatted}</CheckinDate>
          </CheckinItem>
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
