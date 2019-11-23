import React from 'react';
import { Image, View } from 'react-native';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import SignIn from '~/pages/SignIn';
import Dashboard from '~/pages/Dashboard';

import logo from '~/assets/images/header_logo.png';

export default (Signed = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        SignIn,
        App: createStackNavigator(
          {
            App: createBottomTabNavigator(
              {
                Dashboard,
              },
              {
                resetOnBlur: true,
                tabBarOptions: {
                  keyboardHidesTabBar: true,
                  activeTintColor: '#EE4E62',
                  inactiveTintColor: '#999',
                },
              }
            ),
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
      },
      {
        initialRouteName: Signed ? 'App' : 'SignIn',
      }
    )
  );
