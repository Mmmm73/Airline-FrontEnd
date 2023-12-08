
import { useEffect } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { StyleSheet, View, TextInput, Button, Text, FlatList,  Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
//import UUIDGenerator from 'react-native-uuid-generator';

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

  // Define a function to render each flight item
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
          style={{ width: 65, height: 65, marginLeft: 20 }} // Customize the width and height as needed
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
          style={{ width: 65, height: 65, marginLeft: 20, marginBottom: 10 }} // Customize the width and height as needed
          />
          )}


    </View>
    </View>

    </TouchableOpacity>
);
    
    for (let i = 0; i < flights.length; i++) {
//      console.log("flights: ", flights);
      
      const flightsSegments = flights[i].segments;
      const FlightSegmentsOneLegs = flightsSegments[0].legs;
      console.log('FlightSegmentsOneLegs:', FlightSegmentsOneLegs);
      const originStationCodeOne = FlightSegmentsOneLegs[0].originStationCode;
      console.log('originStationCodeOne:', originStationCodeOne);
      const destinationStationCodeOne = FlightSegmentsOneLegs[0].destinationStationCode;
      console.log("destinationStationCodeOne:", destinationStationCodeOne);
      const departureDateTimeOne = FlightSegmentsOneLegs[0].departureDateTime;
      console.log("departureDateTimeOne:", departureDateTimeOne);
      const arrivalDateTimeOne = FlightSegmentsOneLegs[0].arrivalDateTime;
      console.log("arrivalDateTimeOne:", arrivalDateTimeOne);
      
      const classOfServiceOne = FlightSegmentsOneLegs[0].classOfService;
      console.log("classOfServiceOne:", classOfServiceOne);
      const equipmentIdOne = FlightSegmentsOneLegs[0].equipmentId;
      console.log("equipmentIdOne:", equipmentIdOne);    
      const flightNumberOne = FlightSegmentsOneLegs[0].flightNumber;
      console.log("flightNumberOne:", flightNumberOne);    
      const distanceInKMOne = FlightSegmentsOneLegs[0].distanceInKM;
      console.log("distanceInKMOne:", distanceInKMOne);    
      
           
      const flightspurchaseLinks = flights[i].purchaseLinks;
      const currency = flightspurchaseLinks[0].currency;
      console.log("currency:", currency);   
      const totalPrice = flightspurchaseLinks[0].totalPrice;
      console.log("totalPrice:", totalPrice);   
      const totalPricePerPassenger = flightspurchaseLinks[0].totalPricePerPassenger;
      console.log("totalPricePerPassenger:", totalPricePerPassenger);
      console.log(" ");   

/*      if(flightsSegments[1].legs !== null){
        const FlightSegmentsTwoLegs = flightsSegments[1].legs;
        console.log('FlightSegmentsTwoLegs:', FlightSegmentsTwoLegs);
        const originStationCodeTwo = FlightSegmentsTwoLegs[0].originStationCode;
        console.log('originStationCodeTwo:', originStationCodeTwo);
        const destinationStationCodeTwo = FlightSegmentsTwoLegs[0].destinationStationCode;
        console.log("destinationStationCodeTwo:", destinationStationCodeTwo);
        const departureDateTimeTwo = FlightSegmentsTwoLegs[0].departureDateTime;
        console.log("departureDateTimeTwo:", departureDateTimeTwo);
        const arrivalDateTimeTwo = FlightSegmentsTwoLegs[0].arrivalDateTime;
        console.log("arrivalDateTimeTwo:", arrivalDateTimeTwo);
        
        const classOfServiceTwo = FlightSegmentsTwoLegs[0].classOfService;
        console.log("classOfServiceTwo:", classOfServiceTwo);
        const equipmentIdTwo = FlightSegmentsTwoLegs[0].equipmentId;
        console.log("equipmentIdTwo:", equipmentIdTwo);    
        const flightNumberTwo = FlightSegmentsTwoLegs[0].flightNumber;
        console.log("flightNumberTwo:", flightNumberTwo);    
        const distanceInKMTwo = FlightSegmentsTwoLegs[0].distanceInKM;
        console.log("distanceInKMTwo:", distanceInKMTwo);
      }*/

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
    borderRadius: 30, // Adjust the value as needed

  },
  flightItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    marginLeft: 0,
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 2 },
//    shadowRadius: 8,
//    overflow: 'hidden',
    elevation: 1,
    marginBottom: 30, // Add some margin between flight items

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
    marginLeft: 0, // Adjust as needed
  },
  
});



export default Flights;

/*
        <Text>Origin: {item.segments[0].legs[0].originStationCode}</Text>
        <Text>Destination: {item.segments[0].legs[0].destinationStationCode}</Text>
        <Text>Depature Time: {item.segments[0].legs[0].departureDateTime}</Text>
        <Text>Arrival Time: {item.segments[0].legs[0].arrivalDateTime}</Text>
        <Text>Distance: {item.segments[0].legs[0].distanceInKM}</Text>
        <Text>Plane type: {item.segments[0].legs[0].equipmentId}</Text>
        <Text>operatingCarrier: {item.segments[0].legs[0].operatingCarrier.displayName}</Text>
        <Image
        source={{ uri: item.segments[0].legs[0].operatingCarrier.logoUrl }}
        style={{ width: 100, height: 100 }} // Customize the width and height as needed
        />
        <Text>Total Price: {item.purchaseLinks[0].totalPrice}</Text>
        {item.segments[1].legs[0].originStationCode !== null && (
        <Text>Return  originStationCode:{item.segments[1].legs[0].originStationCode}</Text>
        )}
        {item.segments[1].legs[0].destinationStationCode !== null && (
        <Text>Return destinationStationCode {item.segments[1].legs[0].destinationStationCode}</Text>
        )}

*/



/*
<Image
          source={{ uri: item.segments[0].legs[0].operatingCarrier.logoUrl }}
          style={{ width: 65, height: 65 }} // Customize the width and height as needed
          />`
          
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
          style={{ width: 65, height: 65 }} // Customize the width and height as needed
          />
          )}
*/