import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useIp } from './IpProvider';

const Login = () => {
  const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [message, setMessage] = useState('');
    const [isErrorModalVisible, setIsErrorModalVisible] = useState(false);
    const { ipAddress, setIp } = useIp();
    
    const checkForTokenAndNavigate = async () => {
      try {
        const jwtToken = await AsyncStorage.getItem('usertoken');
        console.log("jwtToken", jwtToken);
        if (jwtToken) {
          navigation.navigate('Home', {jwtToken});
        }
      } catch (error) {
        console.error('Token Check Error:', error);
      }
    };
    
    useEffect(() => {
      checkForTokenAndNavigate();
    }, []);

    const isEmailValid = (email) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(email);
    };

    const handleLogin = async () => {
      if (!email || !password || !isEmailValid(email)) {
        setErrorMessage('Invalid email or password.');

        setTimeout(() => {
          setIsErrorModalVisible(true);
        }, 1000);
        return;
      }
 
      const apiUrl = `http://${ipAddress}:3000/nodejs/login`;
      
      try {
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
          const usertoken = user.userjwt;
          await AsyncStorage.setItem('usertoken', usertoken);
           navigation.navigate('Home', { userid, useremail, usertoken });
        } else {
          setErrorMessage('Invalid email or password.');
          setTimeout(() => {
            setIsErrorModalVisible(true);
          }, 1000);
        }
      } catch (error) {
        console.error('Login Error:', error);
      }
    };
    
    const navigateToSignUp = () => {
      navigation.navigate('Signup'); 
    };
      
      


  return (
    <View style={styles.container}>
      <Text style={styles.loginText}>Login</Text>
      
      <Text style={styles.errorMessage} isVisible={isErrorModalVisible}>{errorMessage}</Text>
      
      <TextInput style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={(text) => setEmail(text)}/>
        
      <TextInput style={styles.input}
      placeholder="Password"
      value={password}
      onChangeText={(text) => setPassword(text)}
      secureTextEntry/>
      
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity>
        <Text style={styles.signUpText}>Don't have an account?
        <Text onPress={navigateToSignUp} style={styles.signUpLinkText}> Sign Up</Text></Text>        
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
  loginText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#45B39D', // White
    marginBottom: 16,
  },
  errorMessage: {
    color: 'red',
    marginTop: 10,
    marginBottom: 10,
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
  errorMessage: {
    color: 'red',
    marginBottom: 16,
  },
  signUpText: {
    color: 'black',
    marginTop: 40,
  },
  signUpLinkText: {
    color: '#45B39D',
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
});


export default Login;
