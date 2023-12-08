

import React, { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StyleSheet, View, TextInput, Button, Text,  FlatList, TouchableOpacity, Image  } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useIp } from './IpProvider';
import { useIsFocused } from '@react-navigation/native';


const iataCityDictionary = {
  "JFK": "New York",
  "LAX": "Los Angeles",
  "ORD": "Chicago",
  "LHR": "London",
  "CDG": "Paris",
  "SYD": "Sydney",
  "HND": "Tokyo",
  "PEK": "Beijing",
  "DXB": "Dubai",
  "AMS": "Amsterdam",
  "SIN": "Singapore",
  "FRA": "Frankfurt",
  "ICN": "Seoul",
  "CAN": "Guangzhou",
  "MEX": "Mexico City",
  "DEL": "Delhi",
  "IST": "Istanbul",
  "GRU": "Sao Paulo",
  "MUC": "Munich",
  "ZRH": "Zurich",
  "BOM": "Mumbai",
};


const Bookings = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [flightreservations, setFlightReservations] = useState(null);
  let x;
  const navigation = useNavigation();
  const { ipAddress, setIp } = useIp();
  const isFocused = useIsFocused();

  console.log("Bookings.js: 001 ", isFocused);
//  if(isFocused == true){
//    console.log("LOLOIONDO");
//    getJwtTokenTwo();
//  }

  useEffect(() => {
    console.log("Bookings.js 2");
    const getJwtToken = async () => {
      try {
        console.log("Bookings.js 5");
        console.log("jwtToken 1");
        const token = await AsyncStorage.getItem('usertoken');
        console.log("jwtToken 2", token);
        fetchFLighReservations(token);
        setJwtToken(token);
        console.log("jwtToken", token);

        
      } catch (error) {
        console.error('Error fetching jwtToken', error);
      }
    };

    const fetchFLighReservations = async (jwtToken) => {
      console.log("jwtToken 3", jwtToken);
      console.log("ipAddress", ipAddress);
      try {
        const apiUrl = `http://${ipAddress}:3000/nodejs/getFlightReservations`;
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwtToken}`,
            // You may need to include authorization headers or other headers as needed
          },
        });
  
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
  
        const responseData = await response.json();
//        console.log("responseData.data: ", responseData.data);
        x = responseData.data;
        console.log("responseData.dataaaaaaaaaaaaaaaaaaaaaaaaa: ");
        setFlightReservations(responseData.data); // Assuming your data is under the 'data' key
  
      } catch (error) {
        console.error('Error fetching data:', error);
        // Handle error appropriately
      }
    };



if (isFocused) {
  getJwtToken();
}
  }, []);

  const navigateToBookingDetails = async (flight) => {
    console.log("navigateToBookingDetails!!")
    navigation.navigate('BookingDetails', { flight});
  };

  async function getJwtTokenTwo(){
    try {
      console.log("Bookings.js 5");
      console.log("jwtToken 1");
      const token = await AsyncStorage.getItem('usertoken');
      console.log("jwtToken 2", token);
     fetchFLighReservationsTwo(token);
//      setJwtToken(token);
//      console.log("jwtToken", token);

      
    } catch (error) {
      console.error('Error fetching jwtToken', error);
    }
  };

  const fetchFLighReservationsTwo = async (jwtToken) => {
    console.log("jwtToken 3", jwtToken);
    console.log("ipAddress", ipAddress);
    try {
      const apiUrl = `http://${ipAddress}:3000/nodejs/getFlightReservations`;
      const response = await fetch(apiUrl, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${jwtToken}`,
          // You may need to include authorization headers or other headers as needed
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseData = await response.json();
//        console.log("responseData.data: ", responseData.data);
      x = responseData.data;
      console.log("responseData.dataaaaaaaaaaaaaaaaaaaaaaaaa: ");
      setFlightReservations(responseData.data); // Assuming your data is under the 'data' key
//      console.log("DONE!: ");

    } catch (error) {
      console.error('Error fetching data:', error);
      // Handle error appropriately
    }
  };



  const renderFlightItem = ({ item }) => {
//    console.log("Flight Item:", item);
    return (
      <TouchableOpacity onPress={() => navigateToBookingDetails(item)}>


      <View style={styles.flightItem}>
          <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[item.originstationcodeone]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[item.destinationstationcodeone]}</Text></Text>
          <Text style={styles.restText}><Text >Departure Time: </Text> {new Date(item.departuredatetimeone).toLocaleString()}</Text>

          <Text style={styles.restText}><Text >Carrier: </Text>{item.displaynameone}</Text>
          <Image
          source={{ uri: item.logourlone}}
          style={{ width: 65, height: 65, marginLeft: 20 }} // Customize the width and height as needed
          />
          
          {item.originstationcodetwo && (
            <Text style={styles.boldThree}>Return Leg:</Text>
          )}
          {item.originstationcodetwo && (
            
          <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[item.originstationcodetwo]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[item.destinationstationcodetwo]}</Text></Text>
          )}
          {item.departuredatetimetwo && (
          <Text style={styles.restText}><Text >Time: </Text> {new Date(item.departuredatetimetwo).toLocaleString()}</Text>
          )}
          {item.displaynametwo && (
          <Text style={styles.restText}><Text >Carrier: </Text> {item.displaynametwo}</Text>
          )}
          {item.logourltwo && (
          <Image
          source={{ uri: item.logourltwo}}
          style={{ width: 65, height: 65, marginLeft: 20 }} // Customize the width and height as needed
          />
          )}


    </View>
      </TouchableOpacity>
      
    );
  };


  return (
    <View style={styles.container}>
      <FlatList
      data={flightreservations}
      renderItem={renderFlightItem}
      keyExtractor={(item) => item.fl_id.toString()}
      style={{ width: '100%', marginTop: 70 }}
      />      
      
    </View>

    
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
      
    },
    flightItem: {
      padding: 16,
      borderBottomWidth: 1,
      borderBottomColor: '#ccc',
      width: '100%',
      marginLeft: 0,
      shadowColor: '#000',
      shadowOffset: { width: 5, height: 1 },
//      shadowOpacity: 0.2,
//      shadowRadius: 4,
      elevation: 1,
      marginBottom: 20, // Add some margin between flight items
    },
    bold: {
      fontWeight: 'bold',
      color:'#45B39D',
      marginBottom: 6,
      marginLeft: 20,
      marginTop: 10,
    },
    boldTwo:{
      fontWeight: 'normal',
      color: 'black',
    },
    boldThree:{
      fontWeight: 'bold',
      color: 'black',
      marginBottom: 6,
      marginLeft: 20,
      marginTop: 10,
    },
    restText:{
      color:'gray',
      marginBottom: 6,
      marginLeft: 20,
    },
    textColumn: {
      flex: 1,
    },
    imageColumn: {
      marginLeft: 0, // Adjust as needed
    },
  });


export default Bookings;