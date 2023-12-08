//import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Text, View, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import QRCode from 'react-native-qrcode-svg';


// Define a Stack Navigator
//const Stack = createStackNavigator();

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

const BookingDetails =  ({ route }) => {
  const { flight } = route.params;
  const navigation = useNavigation();
  console.log("flight", flight);
  
  // Define a function to render flight details
  const renderFlightDetails = () => {    
    const originStationCode = flight.originStationCode;
    const destinationStationCode = flight.destinationStationCode;
    const departureDateTime = flight.departureDateTime;
    const arrivalDateTime = flight.arrivalDateTime;
    const distanceInKM = flight.distanceInKM;
    const equipmentId = flight.equipmentId;
    const operatingCarrier = flight.displayName;
    const logoUrl = flight.logoUrl;
    const totalPrice = flight.totalPrice;
    

    return (

    <View >
      <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[flight.originstationcodeone]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[flight.destinationstationcodeone]}</Text></Text>
      <Text style={styles.restText}><Text style={styles.restTextTwo}>Departure Time: </Text> {new Date(flight.departuredatetimeone).toLocaleString()}</Text>
      <Text style={styles.restText}><Text style={styles.restTextTwo}>Arrival Time: </Text> {new Date(flight.arrivaldatetimeone).toLocaleString()}</Text>
      <Text style={styles.restText}><Text style={styles.restTextTwo}>Distance: </Text>{flight.distanceinkmone}</Text>
      <Text style={styles.restText}><Text style={styles.restTextTwo}>Plane Type: </Text>{flight.equipmentidone}</Text>
      <Text style={styles.restText}><Text style={styles.restTextTwo}>Operating Carrier: </Text>{flight.displaynameone}</Text>

      <Text style={styles.restText}><Text style={styles.restTextTwo}>Total Price: </Text>{flight.totalprice}</Text>
      <Image
        source={{ uri: flight.logourlone}}
        style={{ width: 65, height: 65 }} // Customize the width and height as needed
        />


        {flight.originstationcodetwo && (
          <Text style={styles.boldThree}>Return Leg:</Text>
        )}
        {flight.originstationcodetwo && (
          
        <Text style={styles.bold}>Origin: <Text style={styles.boldTwo}>{iataCityDictionary[flight.originstationcodetwo]}</Text>  Destination: <Text style={styles.boldTwo}>{iataCityDictionary[flight.destinationstationcodetwo]}</Text></Text>
        )}
        {flight.departuredatetimetwo && (
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Time: </Text> {new Date(flight.departuredatetimetwo).toLocaleString()}</Text>
        )}
        {flight.displaynametwo && (
        <Text style={styles.restText}><Text style={styles.restTextTwo}>Carrier: </Text> {flight.displaynametwo}</Text>
        )}
        {flight.logourltwo && (
        <Image
        source={{ uri: flight.logourltwo}}
        style={{ width: 65, height: 65 }} // Customize the width and height as needed
        />
        )}
        <Text>
          {'\n'} {/* Insert two line breaks for extra space */}
        </Text>
        
        <Text>
          {'\n'} {/* Insert two line breaks for extra space */}
        </Text>


    </View>
    );
  };

  return (
    <View style={styles.container}>
      {renderFlightDetails()}
      

      <Text>
      {'\n'} {/* Insert two line breaks for extra space */}
    </Text>

    </View>
  );
};

//<Button title="Pay" onPress={safaricomApiTesting} />
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    paddingTop: 50,

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
  marginBottom: 6,
},
restTextTwo:{
  color:'black',
  fontWeight: 'bold',
  marginBottom: 6,
},
boldThree:{
  fontWeight: 'bold',
  color: '#45B39D',
  marginBottom: 12,
  marginTop: 12,
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
qrCodeText: {
  fontWeight: 'bold',
  fontSize: 16,
  marginBottom: 10,
},
  });

export default BookingDetails;

