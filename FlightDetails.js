
import React from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

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


const FlightDetails =  ({ route }) => {
  const { flight, jwtToken } = route.params;
  const navigation = useNavigation();
  
  const safaricomApiTesting = async () => {

    const response = await fetch('http://192.168.100.2:3000/nodejs/paymentforflight', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ flight, jwtToken}),
    });

    if(response.ok === true){
      navigation.navigate('Bookings');
    }
  };

  const enterPhoneNumber = async () => {
    navigation.navigate('PhoneNumber', {flight, jwtToken});

  }

  const renderFlightDetails = () => {

    const originStationCode = flight.segments[0].legs[0].originStationCode;
    const destinationStationCode = flight.segments[0].legs[0].destinationStationCode;
    const departureDateTime = flight.segments[0].legs[0].departureDateTime;
    const arrivalDateTime = flight.segments[0].legs[0].arrivalDateTime;
    const distanceInKM = flight.segments[0].legs[0].distanceInKM;
    const equipmentId = flight.segments[0].legs[0].equipmentId;
    const operatingCarrier = flight.segments[0].legs[0].operatingCarrier.displayName;
    const logoUrl = flight.segments[0].legs[0].operatingCarrier.logoUrl;
    const totalPrice = flight.purchaseLinks[0].totalPrice;



    return (
      <View >
        <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[originStationCode]}</Text>      Destination: <Text style={styles.boldTwo}>{iataCityDictionary[destinationStationCode]}</Text></Text>
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Departure Time: </Text> {new Date(departureDateTime).toLocaleString()}</Text>
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Arrival Time: </Text> {new Date(arrivalDateTime).toLocaleString()}</Text>
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Distance: </Text>{distanceInKM}</Text>
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Plane Type: </Text>{equipmentId}</Text>
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Operating Carrier: </Text>{operatingCarrier}</Text>

        <Text style={styles.restText}><Text style={styles.restTextTwo}>Total Price: </Text>{totalPrice}</Text>
        <Image
          source={{ uri: logoUrl}}
          style={{ width: 65, height: 65, marginTop: 5, marginBottom: 10}} 
          />


          {flight.segments[1]?.legs[0]?.originStationCode && (
            <Text style={styles.boldThree}>Return Leg:</Text>
          )}
          {flight.segments[1]?.legs[0]?.originStationCode && (
            
          <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[flight.segments[1].legs[0].originStationCode]}</Text>         Destination: <Text style={styles.boldTwo}>{iataCityDictionary[flight.segments[1].legs[0].destinationStationCode]}</Text></Text>
          )}
          {flight.segments[1]?.legs[0]?.departureDateTime && (
          <Text style={styles.restText}><Text style={styles.restTextTwo}>Time: </Text> {new Date(flight.segments[1].legs[0].departureDateTime).toLocaleString()}</Text>
          )}
          {flight.segments[1]?.legs[0]?.operatingCarrier?.displayName && (
          <Text style={styles.restText}><Text style={styles.restTextTwo}>Carrier: </Text> {flight.segments[1].legs[0].operatingCarrier.displayName}</Text>
          )}
          {flight.segments[1]?.legs[0]?.operatingCarrier?.logoUrl && (
          <Image
          source={{ uri: flight.segments[1].legs[0].operatingCarrier.logoUrl}}
          style={{ width: 65, height: 65 }} 
          />
          )}

    </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderFlightDetails()}
      
    <TouchableOpacity onPress={enterPhoneNumber} style={styles.searchButton}>
      <Text style={styles.buttonText}>Pay</Text>
    </TouchableOpacity>
 
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      paddingTop: 40,

    },
    bold: {
      fontWeight: 'bold',
      color:'#45B39D',
      marginBottom: 20,
    },
    boldTwo:{
      fontWeight: 'normal',
      color: 'black',
    },
    
  restText:{
    color:'gray',
    marginBottom: 0,
    marginTop: 5,
  },
  restTextTwo:{
    color:'black',
    fontWeight: 'bold',
    marginBottom: 0,
  },
  boldThree:{
    fontWeight: 'bold',
    color: '#45B39D',
    marginBottom: 12,
    marginTop: 17,
  },
  searchButton:{
    marginTop: 20,
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

export default FlightDetails;

