import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity  } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useIp } from './IpProvider';
import { useNavigation } from '@react-navigation/native';

const Profile = () => {
  const navigation = useNavigation();
  const [jwtToken, setJwtToken] = useState('');
  const [userEmail, setUserEmail] = useState(null);
  const { ipAddress, setIp } = useIp();

  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const token = await AsyncStorage.getItem('usertoken');
        setJwtToken(token);

        const apiUrl = `http://${ipAddress}:3000/nodejs/getUserEmail`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ token }),
        });
        
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }

        const responseData = await response.json();

        setUserEmail(responseData.data);

      } catch (error) {
        console.error('Error fetching user email:', error);
      }
    };

    getJwtToken();
  }, []);

  
  const handleLogout = async () => {
    try {
        const apiUrl = `http://${ipAddress}:3000/nodejs/logout`;

        const response = await fetch(apiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({jwtToken}),
        });

        if(response.ok){
          navigation.navigate('Login'); 
          await AsyncStorage.removeItem('usertoken');
        }
  
      } catch (error) {

        console.error('Login Error:', error);

      }
    };

  return (
    <View style={styles.container}>
      <Icon name="user" size={80} color="#45B39D" style={styles.profileIcon} />
      <Text style={styles.emailaddressText}>{userEmail}</Text>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#45B39D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '70%',
    marginTop: 35,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  profileIcon: {
    marginTop: 100,
    marginBottom: 20,
  },
  emailaddressText: {
    fontSize: 18,
    fontWeight: 'normal',
    color: 'fff', // White
    marginTop: 10,
  },
});

export default Profile;
