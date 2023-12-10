

import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import Modal from 'react-native-modal';
import { useNavigation } from '@react-navigation/native';
import { useIp } from './IpProvider';

const Signup = () => {
  const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const { ipAddress, setIp } = useIp();

    const isEmailValid = (email) => {

      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    };

    const handleSignup = async () => {

      if (!email || !password) {

        setErrorMessage('Invalid email or password.');
        setIsErrorModalVisible(true);
        return;
      }

      if (!isEmailValid(email)) {

        setErrorMessage('Invalid email or password.');
        setIsErrorModalVisible(true);
        return;
      }

       
      const apiUrl = `http://${ipAddress}:3000/nodejs/signup`;


        try {
            console.log("email: ", email, "password: ",password);
          const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });


          if (response.ok) {

            const jsonResponse = await response.json();
            const user = jsonResponse.user;
            const userid = user.userid;
            const useremail = user.useremail;

            navigation.navigate('Login');

          } else {
            setErrorMessage('Email already in use');
            setIsErrorModalVisible(true);

          }
        } catch (error) {

          console.error('Login Error:', error);

        }
      };

      const navigateToLogin = () => {

        navigation.navigate('Login'); 
      };
      
    

  return (
    <View style={styles.container}>
      
      <Text style={styles.signupText}>Sign Up</Text>

      <Text style={styles.errorMessage} isVisible={isErrorModalVisible}>{errorMessage}</Text>
      
      <TextInput style={styles.input}
      placeholder="Email"
      value={email}
      onChangeText={(text) => setEmail(text)}/>
      
      <TextInput style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry
      />
      
      <TouchableOpacity style={styles.button} onPress={handleSignup}>
        <Text style={styles.buttonText}>Signup</Text>
      </TouchableOpacity>
      

      <TouchableOpacity>
        <Text style={styles.LoginText}>Already have an account?
        <Text onPress={navigateToLogin} style={styles.LoginLinkText}> Login</Text></Text>
        
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
    width: '100%',
    borderRadius: 8, 
  },
  signupText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#45B39D', // White
    marginBottom: 16,
  }
  ,
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
  },
  button: {
    backgroundColor: '#45B39D',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    width: '100%',
    marginTop: 5,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  LoginText: {
    color: 'black',
    marginTop: 40,
  },
  LoginLinkText: {
    color: '#45B39D',
  }
  
});


export default Signup;
