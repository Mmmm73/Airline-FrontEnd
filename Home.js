import React, { useState } from 'react';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { StyleSheet, View, TextInput, Button, Text } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Search from './Search';
import Profile from './Profile';
import Bookings from './Bookings';
import Flights from './Flights';
import FlightDetails from './FlightDetails';
import BookingDetails from './BookingDetails';
import PhoneNumber from './PhoneNumber';


const Home = ({ route }) => {
    const Tab = createBottomTabNavigator();
    const Stack = createNativeStackNavigator();
    const {jwtToken } = route.params;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === 'Search') {
            iconName = 'search';
          } else if (route.name === 'Bookings') {
            iconName = 'book';
          } else if (route.name === 'Profile') {
            iconName = 'user';
          }

          return <FontAwesome5 name={iconName} size={15} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#45B39D',
        inactiveTintColor: 'gray',
        labelStyle: {
          fontSize: 12,
        },
      }}
    >
      <Tab.Screen
        name="Search"
        options={{ headerShown: false }}
      >
        {() => (
          <Stack.Navigator>
            <Stack.Screen name="Search" component={Search} options={{ headerShown: false }} />
            <Stack.Screen name="Flights" component={Flights} />
            <Stack.Screen name="FlightDetails" component={FlightDetails} />
            <Stack.Screen name="PhoneNumber" component={PhoneNumber} />
            <Stack.Screen name="BookingDetails" component={BookingDetails} options={{ title: 'Booking Details' }} />
          </Stack.Navigator>
        )}
      </Tab.Screen>
      <Tab.Screen name="Bookings" options={{ headerShown: false }} component={Bookings} />
      <Tab.Screen name="Profile" options={{ headerShown: false }} component={Profile} />
    </Tab.Navigator>
  );
};


export default Home;