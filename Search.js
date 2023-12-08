import React, { useEffect ,useState } from 'react';
import { StyleSheet, View, TextInput, Button, Text, Pressable, TouchableOpacity, ActivityIndicator  } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import DropDownPicker from 'react-native-dropdown-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';


const Search = () => {
  const [jwtToken, setJwtToken] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getJwtToken = async () => {
      try {
        const token = await AsyncStorage.getItem('usertoken');
        setJwtToken(token);
        console.log("jwtToken", token);
      } catch (error) {
        console.error('Error fetching jwtToken', error);
      }
    };

    getJwtToken();
  }, []);
  
  const navigation = useNavigation();
  const [departurePoint, setDeparturePoint] = useState('');
  const [arrivalPoint, setArrivalPoint] = useState('');
  const [depatureDate, setDepartureDate] = useState(new Date());
  const [returnDate, setReturnDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [selectedValue, setSelectedValue] = useState("option1");
  const [numberOfAdults, setNumberOfAdults] = useState(null);
  const [showReturnPicker, setShowReturnPicker] = useState(false);
  
  const [open, setOpen] = useState(false);
  const [typevalue, setTypeValue] = useState(null);
  const [items, setItems] = useState([
    {label: 'One Way', value: 'ONE_WAY'},
    {label: 'Round Trip', value: 'ROUND_TRIP'}
  ]);

  const [openCOS, setOpenCOS] = useState(false);
  const [valueCOS, setValueCOS] = useState(null);
  const [itemsCOS, setItemsCOS] = useState([
    {label: 'Business', value: 'BUSINESS'},
    {label: 'First', value: 'FIRST'},
    {label: 'Economy', value: 'ECONOMY'},
    {label: 'Premium Economy', value: 'PREMIUM_ECONOMY'}
  ]);

  let departurePointIATA = null;
  let arrivalPointIATA = null;
  console.log("depaturePoint: ", departurePoint);
  console.log("arrivalPoint: ", arrivalPoint);




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
    "DEL": "Delhi",
  };

  

  const handleNumberChange = (text) => {
    // Use regular expressions to allow only numeric input
    const numericInput = text.replace(/[^0-9]/g, '');
    setNumberOfAdults(numericInput);
  };

  const safaricomApiTesting = async () => {
    let emailx = "popop";

    const response = await fetch('http://192.168.100.4:3000/nodejs/darajaApi/register', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
//      body: JSON.stringify({ emailx}),
    });

    console.log("response", response);
    console.log("response.ok", response.ok);
  };

  const handleSearch = async () => {
    console.log("depaturePoint:", departurePoint);
    console.log("depaturePoint typeof :", typeof departurePoint);
    console.log("arrivalPoint:", arrivalPoint);
//    console.log("depatureDate1:", depatureDate);
    console.log("returnDate1:", returnDate);
  

    console.log("typevalue: ", typevalue);
    console.log("valueCOS: ", valueCOS);
    console.log("numberOfAdults: ", numberOfAdults);

    console.log("depatureDate depatureDate: ", depatureDate);
    console.log("returnDate returnDate: ", returnDate);


    console.log("departurePoint: ", departurePoint);
    console.log("arrivalPoint: ", arrivalPoint);


    if(typevalue === 'ONE_WAY'){
      console.log('ONE_WAY ONE_WAY ONE_WAY');
      console.log("departurePoint: ",  departurePoint);

      for (const iataCode in iataCityDictionary) {
        console.log(`iataCityDictionary[iataCode]:`, iataCityDictionary[iataCode]);
        console.log(`iataCityDictionary[iataCode] == depaturePoint:`, iataCityDictionary[iataCode] === departurePoint);
        if (iataCityDictionary[iataCode] === departurePoint.trim()) {
          console.log("departurePoint: ", departurePoint);
          departurePointIATA = iataCode;
          console.log(`IATA Code for ${departurePoint}: ${iataCode}`);
          break; // Assuming you want to stop the loop once you find the first match.
        }
      }

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === arrivalPoint.trim()) {
          arrivalPointIATA = iataCode;
          console.log(`IATA Code for ${arrivalPoint}: ${iataCode}`);
          break; // Assuming you want to stop the loop once you find the first match.
        }
      }

      const date = new Date(depatureDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;
      console.log("depatureDateformatted: ", depatureDateformatted);
      console.log("numberOfAdults: ", numberOfAdults);
      
    

      console.log("depaturePointIATA: ", departurePointIATA);
      console.log("arrivalPointIATA: ", arrivalPointIATA);
      
/*      navigation.navigate('Flights', {
        depaturePoint: departurePointIATA,
        depatureDate: depatureDateformatted,
        arrivalPoint: arrivalPointIATA,
        typevalue: typevalue,
        numberOfAdults: numberOfAdults,
        valueCOS: valueCOS,
      });*/
      makeApiRequest();
    }
    else if(typevalue === 'ROUND_TRIP'){
      console.log("AKASH! ");

      for (const iataCode in iataCityDictionary) {
        console.log(`iataCityDictionary[iataCode]:`, iataCityDictionary[iataCode]);
        console.log(`iataCityDictionary[iataCode] == depaturePoint:`, iataCityDictionary[iataCode] === departurePoint);
        if (iataCityDictionary[iataCode] === departurePoint.trim()) {
          console.log("departurePoint: ", departurePoint);
          departurePointIATA = iataCode;
          console.log(`IATA Code for ${departurePoint}: ${iataCode}`);
          break; // Assuming you want to stop the loop once you find the first match.
        }
      }

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === arrivalPoint.trim()) {
          arrivalPointIATA = iataCode;
          console.log(`IATA Code for ${arrivalPoint}: ${iataCode}`);
          break; // Assuming you want to stop the loop once you find the first match.
        }
      }

      console.log("depaturePointIATA: 3: ", departurePointIATA);
      console.log("arrivalPointIATA: 3:", arrivalPointIATA);
      
      makeApiRequestTwo();
    }

    

/*    const responseLS2 = await AsyncStorage.getItem('response.data');
    const responseLS3 = JSON.parse(responseLS2)
    console.log('responseLS3:', responseLS3);
    console.log('responseLS3.data:', responseLS3.data);
    console.log('responseLS3.data.flights:', responseLS3.data.flights);
    const flights = responseLS3.data.flights;

    for (let i = 0; i < flights.length; i++) {

      const flightsSegments = flights[i].segments;

      const FlightSegmentssLegs = flightsSegments[0].legs;
      const originStationCode = FlightSegmentssLegs[0].originStationCode;
      console.log("FlightSegmentssLegs[0].originStationCode:", originStationCode);
      const destinationStationCode = FlightSegmentssLegs[0].destinationStationCode;
      console.log("FlightSegmentssLegs[0].originStationCode:", destinationStationCode);
      const departureDateTime = FlightSegmentssLegs[0].departureDateTime;
      console.log("FlightSegmentssLegs[0].departureDateTime:", departureDateTime);

      const departureDateTimeNewDate = new Date(departureDateTime);
      console.log("departureDateTimeNewDate:", departureDateTimeNewDate);

      // Extract date components
      const yearTwo = departureDateTimeNewDate.getFullYear();
      const monthTwo = (departureDateTimeNewDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const dayTwo = departureDateTimeNewDate.getDate().toString().padStart(2, '0');
      
      // Extract time components
      const hoursTwo = departureDateTimeNewDate.getHours().toString().padStart(2, '0');
      const minutesTwo = departureDateTimeNewDate.getMinutes().toString().padStart(2, '0');
      
      // Format the date and time
      const formatteddepartureDateTime= `${yearTwo}-${monthTwo}-${dayTwo} ${hoursTwo}:${minutesTwo}`;
      console.log("formatteddepartureDateTime: ", formatteddepartureDateTime);


      const arrivalDateTime = FlightSegmentssLegs[0].arrivalDateTime;
      console.log("FlightSegmentssLegs[0].arrivalDateTime:", arrivalDateTime);
      const arrivalDateTimeNewDate = new Date(arrivalDateTime);
      console.log("arrivalDateTimeNewDate:", arrivalDateTimeNewDate);

      // Extract date components
      const year = arrivalDateTimeNewDate.getFullYear();
      const month = (arrivalDateTimeNewDate.getMonth() + 1).toString().padStart(2, '0'); // Months are 0-based
      const day = arrivalDateTimeNewDate.getDate().toString().padStart(2, '0');
      
      // Extract time components
      const hours = arrivalDateTimeNewDate.getHours().toString().padStart(2, '0');
      const minutes = arrivalDateTimeNewDate.getMinutes().toString().padStart(2, '0');
      
      // Format the date and time
      const formattedarrivalDateTime= `${year}-${month}-${day} ${hours}:${minutes}`;
      console.log("formattedarrivalDateTime: ", formattedarrivalDateTime);


      const classOfService = FlightSegmentssLegs[0].classOfService;
      console.log("FlightSegmentssLegs[0].classOfService:", classOfService);
      const equipmentId = FlightSegmentssLegs[0].equipmentId;
      console.log("FlightSegmentssLegs[0].equipmentId:", equipmentId);    
      const flightNumber = FlightSegmentssLegs[0].flightNumber;
      console.log("FlightSegmentssLegs[0].flightNumber:", flightNumber);    
      const distanceInKM = FlightSegmentssLegs[0].distanceInKM;
      console.log("FlightSegmentssLegs[0].distanceInKM:", distanceInKM);    

      const flightspurchaseLinks = flights[i].purchaseLinks;
      const currency = flightspurchaseLinks[0].currency;
      console.log("currency:", currency);   
      const totalPrice = flightspurchaseLinks[0].totalPrice;
      console.log("totalPrice:", totalPrice);   
      const totalPricePerPassenger = flightspurchaseLinks[0].totalPricePerPassenger;
      console.log("totalPricePerPassenger:", totalPricePerPassenger);
      console.log(" ");   
    
    }*/

  }

  const handleDateChange = (event, newDate) => {
    if (event.type === 'set') {
      const date = new Date(newDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;
      console.log("depatureDateformattedxx: ", depatureDateformatted);
      console.log("newDatexx: ", newDate);


      setDepartureDate(newDate);
      setShowPicker(false);
      console.log("showPicker:", showPicker);
      setDepartureDate(newDate);
    } else if (event.type === 'dismissed') {
      setShowPicker(false);
    }
  };
  
  const handleReturnDateChange = (event, newDate) => {
    if (event.type === 'set') {
      const date = new Date(newDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;
      console.log("depatureDateformatted: ", depatureDateformatted);

    
      setReturnDate(newDate);
      setShowReturnPicker(false);
    }
    else {
      setShowReturnPicker(false);
    }
  };

   
  const makeApiRequest = async () => {
    setLoading(true);
    const date = new Date(depatureDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const depatureDateformatted = `${year}-${month}-${day}`;
    console.log("depatureDateformatted: ", depatureDateformatted);
    console.log("numberOfAdults: ", numberOfAdults);

    console.log("departurePointIATA: ", departurePointIATA);
    console.log("arrivalPointIATA: ", arrivalPointIATA);
  
    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: departurePointIATA,
        destinationAirportCode: arrivalPointIATA,
        date: depatureDateformatted,
//        date:'2023-11-26',
        itineraryType: typevalue,
        sortOrder: 'PRICE',
        numAdults: numberOfAdults,
        numSeniors: '0',
        classOfService: valueCOS,
        pageNumber: '1',
        currencyCode: 'USD',
      },
      
      headers: {
        'X-RapidAPI-Key': '705b315d0amshb9bc627b492a4ccp1e0f9bjsn58df2fb45243',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com',
      },
    };
  
    try {

      const response = await axios.request(options);
      console.log('API Response:', response.data);
      console.log('API Response.data:', response.data.data);
      console.log('API Response.data.complete:', response.data.data.complete);
      console.log('API Response.data.flights:', response.data.data.flights);

      if (response.data.data.flights.length > 0){
        await AsyncStorage.setItem('flights', JSON.stringify(response.data.data.flights));
        navigation.navigate('Flights', {
          flights: response.data.data.flights,
          jwtToken: jwtToken
        });
      }

/*      const flightszzz = await AsyncStorage.getItem('flights');
      console.log("flightszzz", flightszzz)
      navigation.navigate('Flights', {
        flights: JSON.parse(flightszzz),
        jwtToken: jwtToken
      });*/

       

    } catch (error) {
      console.error('API Request Error:', error);
    }
  finally {
    setLoading(false); // Set loading to false whether the request succeeds or fails
  }
  };


  const makeApiRequestTwo = async () => {
    setLoading(true);
    console.log("makeApiRequestTwo!");

    const date = new Date(returnDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const day = String(date.getDate()).padStart(2, '0');
    const returnDateformatted = `${year}-${month}-${day}`;
    console.log("returnDateformatted2: ", returnDateformatted);

    const dateTwo = new Date(depatureDate);
    
    const yearTwo = dateTwo.getFullYear();
    const monthTwo = String(dateTwo.getMonth() + 1).padStart(2, '0'); // Month is 0-based, so add 1
    const dayTwo = String(dateTwo.getDate()).padStart(2, '0');
    const depatureDateformatted = `${yearTwo}-${monthTwo}-${dayTwo}`;
    console.log("depatureDateformatted2: ", depatureDateformatted);
    console.log("departurePoint: ", departurePoint);
    console.log("arrivalPoint: ", arrivalPoint);
    console.log("typevalue: ", typevalue);
    console.log("numberOfAdults: ", numberOfAdults);
    console.log("valueCOS:", valueCOS);
    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: departurePointIATA,
        destinationAirportCode: arrivalPointIATA,
        date: depatureDateformatted,
//    date:'2023-11-28',
        itineraryType: typevalue,
        sortOrder: 'PRICE',
        numAdults: numberOfAdults,
        numSeniors: '0',
        classOfService: valueCOS,
//        returnDate:'2023-11-29',

        returnDate: returnDateformatted,
        pageNumber: '1',
        currencyCode: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '705b315d0amshb9bc627b492a4ccp1e0f9bjsn58df2fb45243',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
      }
    };
    console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx9823420389:", options);
    
    try {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx982342038922222222222s");
      const response = await axios.request(options);
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxx982342038922223333333333333333333333s");
      console.log("response.data: ", response.data);
      console.log("response.data.data: ", response.data.data);
      console.log("response.data.data.message: ", response.data.data.message);
      console.log("response.data.data.flights: ", response.data.data.flights);
      const fligtSize = response.data.data.flights
      console.log("response.data.data.flights.size: ", response.data.data.flights.length);

      if (response.data.data.flights.length > 0){
        navigation.navigate('Flights', {
          flights: response.data.data.flights,
          jwtToken: jwtToken
        });
      } 

    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); // Set loading to false whether the request succeeds or fails
    }
  };

  const handleShowPicker = () => {
    console.log("showPicker", showPicker);
    setShowPicker(true);
  };



  return (
    <View style={styles.container}>
      {/* Loading indicator */}
      {loading && <ActivityIndicator size="large" color="#45B39D" style={styles.loadingIndicator} />}
      
      <Text style={[styles.travelText, { marginTop: loading ? 40 : 80 }]}>Travel</Text>

      
      <TextInput  style={styles.input}
      placeholder="  From:"
      value={departurePoint}
      onChangeText={(text) => setDeparturePoint(text)}/>

    
      <TextInput 
      style={styles.input}
      placeholder="  To:"
      value={arrivalPoint}
      onChangeText={(text) => setArrivalPoint(text)}
      />
      
      <View style={styles.rowContainer}>
        <TouchableOpacity onPress={handleShowPicker}>
          <Text style={styles.buttonText}>Depature Date</Text>
        </TouchableOpacity>
        
        {depatureDate && !showPicker && (
        <View style={styles.rowContainer}>
          <Text style={styles.selectedDate}> {depatureDate.toLocaleDateString()}</Text>
        </View>
        )}

      </View>
      
      {showPicker && (
      <DateTimePicker
      value={depatureDate}
      mode="date"
      is24Hour={true}
      display="default"
      onChange={handleDateChange}
      theme={{ backgroundColor: '#45B39D', headerTextColor: 'white', accentColor: 'white' }}
      />
      )}
      
      <DropDownPicker 
        style={styles.inputDropDown}
        open={openCOS}
        value={valueCOS}
        items={itemsCOS}
        setOpen={setOpenCOS}
        setValue={setValueCOS}
        setItems={setItemsCOS}
        dropDownContainerStyle={{ width: '90%', marginLeft: 10, marginTop: 20 }} 
        />

        <DropDownPicker
        style={styles.inputDropDownTwo}
        open={open}
        value={typevalue}
        items={items}
        setOpen={setOpen}
        setValue={setTypeValue}
        setItems={setItems}
        dropDownContainerStyle={{ width: '90%', marginLeft: 10, marginTop: 50  }} 
        />
        
        {typevalue === 'ROUND_TRIP' && (
        <View style={styles.rowContainerTwo}>
          <TouchableOpacity onPress={() => setShowReturnPicker(true)}>
            <Text style={styles.buttonText}>Return Date   </Text>
          </TouchableOpacity>
          
          {showReturnPicker && (
          <DateTimePicker
          value={returnDate}
          mode="date"
          is24Hour={true}
          display="default"
          onChange={handleReturnDateChange}/>
          )}

          {returnDate && !showReturnPicker && (
            <View style={styles.rowContainer}>
              <Text style={styles.selectedDate}> {returnDate.toLocaleDateString()}</Text>
            </View>
          )}
          </View>
          )}

          <TextInput style={[styles.inputfour, { marginTop: typevalue === 'ROUND_TRIP' ? 20 : 50 }]} placeholder="  Adults:"
          value={numberOfAdults}
          onChangeText={handleNumberChange}/>

          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Text style={styles.buttonText}>Search</Text>
          </TouchableOpacity>
        </View>

    

  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
//      justifyContent: 'center',
      paddingHorizontal: 50,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
//      marginBottom: 10, // Add margin bottom to create space between input fields
//      paddingHorizontal: 10, // Add horizontal padding to the input fields
      width: '90%',
      borderRadius: 6, 
      marginTop: 20,
    },
    inputfour:{
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      width: '90%',
      borderRadius: 6, 
      marginTop: 50
    },
    travelText: {
      fontSize: 18, // You can adjust the font size as needed
      fontWeight: 'bold', // You can adjust the font weight as needed
      marginBottom: 20, // You can adjust the margin bottom as needed
      alignSelf: 'flex-start', // Align the text to the start (left)
      marginLeft: 25, // Adjust the margin from the left edge
      marginTop: 80,
      marginBottom: 10,
      color: '#45B39D',
    },
    rowContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 20,
      marginRight: 10,
    },
    rowContainerTwo: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginTop: 50,
      marginRight: 10,
    },
    
    selectedDate: {
      marginTop: 20,
    },
    buttonText: {
      padding: 10,
      backgroundColor: '#45B39D',
      color: '#FFFFFF',
      borderRadius: 6,
      textAlign: 'center',
    },
    buttonText: {
      padding: 10,
      backgroundColor: '#45B39D',
      color: '#FFFFFF',
      borderRadius: 6,
      textAlign: 'center',
      marginLeft: 20,
    },
    selectedDate: {
      marginTop: -5,
      marginLeft: 10,
    },
    inputDropDown: {
      height: 20,
      borderColor: 'gray',
      borderWidth: 1,
//      marginBottom: 10, // Add margin bottom to create space between input fields
//      paddingHorizontal: 10, // Add horizontal padding to the input fields
      width: '90%',
      borderRadius: 6, 
      marginTop: 20,
      zIndex: 1,
      marginLeft: 10,
    },
    inputDropDownTwo: {
      height: 20,
      borderColor: 'gray',
      borderWidth: 1,
//      marginBottom: 10, // Add margin bottom to create space between input fields
//      paddingHorizontal: 10, // Add horizontal padding to the input fields
      width: '90%',
      borderRadius: 6, 
      marginTop: 50,
      marginLeft: 10,
      zIndex: 0,
    },
    searchButton:{
      marginTop: 20,
      width: '95%',
      marginRight: 20, 
    },
  
  });


export default Search;

/* 

    <Text >Select an option COS:</Text>
      
      <DropDownPicker 
        style={styles.input}
        open={openCOS}
        value={valueCOS}
        items={itemsCOS}
        setOpen={setOpenCOS}
        setValue={setValueCOS}
        setItems={setItemsCOS}
      />

      
<Text >Select an option:</Text>
      
      <DropDownPicker
        open={open}
        value={typevalue}
        items={items}
        setOpen={setOpen}
        setValue={setTypeValue}
        setItems={setItems}
      />
      
      <TextInput placeholder="Number of adults:"
      value={numberOfAdults}
      onChangeText={handleNumberChange}

      />
      
      {typevalue === 'ROUND_TRIP' && (
        <>
          <Button title="Open Return Date Picker" onPress={() => setShowReturnPicker(true)} />
          {showReturnPicker && (
            <DateTimePicker
              value={returnDate}
              mode="date"
              is24Hour={true}
              display="default"
              onChange={handleReturnDateChange}
            />
          )}
        </>
        )}
      
      {returnDate ? <Text>Selected Return Date: {returnDate.toLocaleDateString()}</Text> : null}
*/

/*

*/