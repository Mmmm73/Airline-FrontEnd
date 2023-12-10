import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, FlatList,  Image, TouchableOpacity } from 'react-native';
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

const Flights = ({ route }) => {
    const flights = route.params.flights;    
    const jwtToken = route.params.jwtToken;
    const navigation = useNavigation();
    const [uniqueKey, setUniqueKey] = useState('');
    
    console.log("Flights! Flights!");

    const navigateToFlightDetails = async (flight) => {

      navigation.navigate('FlightDetails', { flight, jwtToken});
    };

  const renderFlightItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToFlightDetails(item)}>
      <View style={styles.flightItemWrapper}>
      <View style={styles.flightItem}>
          <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[item.segments[0].legs[0].originStationCode]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[item.segments[0].legs[0].destinationStationCode]}</Text></Text>
          <Text style={styles.restText}><Text >Time: </Text> {new Date(item.segments[0].legs[0].departureDateTime).toLocaleString()}</Text>
          <Text style={styles.restText}><Text >Carrier: </Text>{item.segments[0].legs[0].operatingCarrier.displayName}</Text>
          <Text style={styles.restText}><Text >Price: </Text>{item.purchaseLinks[0].totalPrice}</Text>

          <Image
          source={{ uri: item.segments[0].legs[0].operatingCarrier.logoUrl }}
          style={{ width: 65, height: 65, marginLeft: 20 }} 
          />      

          {item.segments[1]?.legs[0]?.originStationCode && (
            <Text style={styles.boldThree}>Return Leg:</Text>
          )}
          {item.segments[1]?.legs[0]?.originStationCode && (
            
          <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[item.segments[1].legs[0].originStationCode]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[item.segments[1].legs[0].destinationStationCode]}</Text></Text>
          )}
          {item.segments[1]?.legs[0]?.departureDateTime && (
          <Text style={styles.restText}><Text >Time: </Text> {new Date(item.segments[1].legs[0].departureDateTime).toLocaleString()}</Text>
          )}
          {item.segments[1]?.legs[0]?.operatingCarrier?.displayName && (
          <Text style={styles.restText}><Text >Carrier: </Text> {item.segments[1].legs[0].operatingCarrier.displayName}</Text>
          )}
          {item.segments[1]?.legs[0]?.operatingCarrier?.logoUrl && (
          <Image
          source={{ uri: item.segments[1].legs[0].operatingCarrier.logoUrl}}
          style={{ width: 65, height: 65, marginLeft: 20, marginBottom: 10 }} 
          />
          )}


    </View>
    </View>

    </TouchableOpacity>
);
    
    for (let i = 0; i < flights.length; i++) {
      
      const flightsSegments = flights[i].segments;
      const FlightSegmentsOneLegs = flightsSegments[0].legs;
      const originStationCodeOne = FlightSegmentsOneLegs[0].originStationCode;
      const destinationStationCodeOne = FlightSegmentsOneLegs[0].destinationStationCode;
      const departureDateTimeOne = FlightSegmentsOneLegs[0].departureDateTime;
      const arrivalDateTimeOne = FlightSegmentsOneLegs[0].arrivalDateTime;

      
      const classOfServiceOne = FlightSegmentsOneLegs[0].classOfService;
      const equipmentIdOne = FlightSegmentsOneLegs[0].equipmentId;
      const flightNumberOne = FlightSegmentsOneLegs[0].flightNumber;
      const distanceInKMOne = FlightSegmentsOneLegs[0].distanceInKM;
      
           
      const flightspurchaseLinks = flights[i].purchaseLinks;
      const currency = flightspurchaseLinks[0].currency;
      const totalPrice = flightspurchaseLinks[0].totalPrice;
      const totalPricePerPassenger = flightspurchaseLinks[0].totalPricePerPassenger;
      console.log(" ");   

    }


  return (
    <View style={styles.container}>
      <FlatList
        data={flights}
        renderItem={renderFlightItem}
        keyExtractor={(item) => `${item.segments[0].legs[0].flightNumber}-${item.segments[0].legs[0].equipmentId}-${item.segments[0].legs[0].arrivalDateTime}-${item.uniqueIdentifier}`}
        style={{ width: '100%' }}
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
  flightItemWrapper: {
    borderRadius: 30,

  },
  flightItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
    elevation: 1,
    marginBottom: 30, 

  },
  bold: {
    fontWeight: 'bold',
    color:'#45B39D',
    marginBottom: 6,
    marginLeft:20,
  },
  boldTwo:{
    fontWeight: 'normal',
    color: 'black',
  },
  boldThree:{
    fontWeight: 'bold',
    color: 'black',
    marginTop: 20,
    marginLeft: 20,
    marginBottom: 6,
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
    marginLeft: 0, 
  },
  
});



export default Flights;
