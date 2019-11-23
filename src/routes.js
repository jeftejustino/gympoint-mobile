import React from 'react';
import { Image, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';

import HelpOrderQuestions from '~/pages/HelpOrder/Questions';
import HelpOrderAnswer from '~/pages/HelpOrder/Answer';
import HelpOrderCreate from '~/pages/HelpOrder/Create';

import logo from '~/assets/images/header_logo.png';

export default (Signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createBottomTabNavigator(
          {
            Checkins: {
              screen: createStackNavigator(
                {
                  Dashboard,
                },
                {
                  resetOnBlur: true,
                  defaultNavigationOptions: {
                    headerTitle: <Image source={logo} />,
                    headerTitleContainerStyle: {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    headerRight: <View />,
                    headerLeft: <View />,
                  },
                }
              ),

              navigationOptions: {
                tabBarLabel: 'Check-ins',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="edit-location" size={20} color={tintColor} />
                ),
              },
            },
            HelpOrder: {
              screen: createStackNavigator(
                {
                  HelpOrderQuestions,
                  HelpOrderAnswer,
                  HelpOrderCreate,
                },
                {
                  resetOnBlur: true,
                  defaultNavigationOptions: {
                    headerTitle: <Image source={logo} />,
                    headerTitleContainerStyle: {
                      alignItems: 'center',
                      justifyContent: 'center',
                    },
                    headerRight: <View />,
                    headerLeft: <View />,
                  },
                }
              ),

              navigationOptions: {
                tabBarLabel: 'Pedir ajuda',
                tabBarIcon: ({ tintColor }) => (
                  <Icon name="live-help" size={20} color={tintColor} />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              style: {
                paddingTop: 5,
                paddingBottom: 5,
              },
              keyboardHidesTabBar: true,
              activeTintColor: '#EE4E62',
              inactiveTintColor: '#999',
            },
          }
        ),
      },
      {
        initialRouteName: Signed ? 'App' : 'SignIn',
      }
    )
  );
