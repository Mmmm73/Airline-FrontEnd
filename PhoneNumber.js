import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import { useIp } from './IpProvider';


const PhoneNumber = ({ route }) => {
    const navigation = useNavigation();
    const [phoneNumber, setPhoneNumber] = useState('');
    const { ipAddress, setIp } = useIp();

    const flight = route.params.flight;  
    console.log("flight: ", flight);
    const jwtToken = route.params.jwtToken;  
    console.log("jwtToken: ", jwtToken);

    const submitPhoneNumber = async () => {

      const apiUrl = `http://${ipAddress}:3000/nodejs/paymentforflight`;


        console.log("phoneNumber: ", phoneNumber);
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ flight, jwtToken, phoneNumber}),
        });
        
        console.log("response", response);
        console.log("response.ok", response.ok);
        
        if(response.ok === true){
          console.log("True6786876");
//            navigation.navigate('Bookings');
            }
        };
        

  return (
    <View style={styles.container}>
        <Text style={styles.enterText}>Enter Phone Number</Text>

        <TextInput style={styles.input}
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={(text) => setPhoneNumber(text)}/>
        
        <TouchableOpacity onPress={submitPhoneNumber} style={styles.submitButton}>
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'top',
    },
    enterText: {
        fontSize: 18,
        fontWeight: 'normal',
        color: '#45B39D', // White
        marginBottom: 16,
        marginTop: 100,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
      width: '75%',
      marginTop: 30,
      borderRadius: 8, 
    },
    submitButton:{
      marginTop: 40,
      width: '75%',
  //    marginRight: 20, 
    },
    buttonText: {
      padding: 10,
      backgroundColor: '#45B39D',
      color: '#FFFFFF',
      borderRadius: 6,
      textAlign: 'center',
    },
  });


export default PhoneNumber;