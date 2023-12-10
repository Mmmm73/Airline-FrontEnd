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
    });
  };

  const handleSearch = async () => {

    if(typevalue === 'ONE_WAY'){
      console.log('ONE_WAY ONE_WAY ONE_WAY');

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === departurePoint.trim()) {
          departurePointIATA = iataCode;
          break; 
        }
      }

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === arrivalPoint.trim()) {
          arrivalPointIATA = iataCode;
          break; 
        }
      }

      const date = new Date(depatureDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;      
  
      makeApiRequest();
    }
    else if(typevalue === 'ROUND_TRIP'){

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === departurePoint.trim()) {
          departurePointIATA = iataCode;
          break; 
        }
      }

      for (const iataCode in iataCityDictionary) {
        if (iataCityDictionary[iataCode] === arrivalPoint.trim()) {
          arrivalPointIATA = iataCode;
          break;
        }
      }
      
      makeApiRequestTwo();
    }

  }

  const handleDateChange = (event, newDate) => {
    if (event.type === 'set') {
      const date = new Date(newDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0'); 
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;

      setDepartureDate(newDate);
      setShowPicker(false);

      setDepartureDate(newDate);
    } else if (event.type === 'dismissed') {
      setShowPicker(false);
    }
  };
  
  const handleReturnDateChange = (event, newDate) => {
    if (event.type === 'set') {
      const date = new Date(newDate);
    
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const depatureDateformatted = `${year}-${month}-${day}`;
    
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
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const depatureDateformatted = `${year}-${month}-${day}`;
  
    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: departurePointIATA,
        destinationAirportCode: arrivalPointIATA,
        date: depatureDateformatted,

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

      if (response.data.data.flights.length > 0){
        await AsyncStorage.setItem('flights', JSON.stringify(response.data.data.flights));
        navigation.navigate('Flights', {
          flights: response.data.data.flights,
          jwtToken: jwtToken
        });
      }

    } catch (error) {
      console.error('API Request Error:', error);
    }
  finally {
    setLoading(false); 
  }
  };


  const makeApiRequestTwo = async () => {
    setLoading(true);

    const date = new Date(returnDate);
    
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const day = String(date.getDate()).padStart(2, '0');
    const returnDateformatted = `${year}-${month}-${day}`;

    const dateTwo = new Date(depatureDate);
    
    const yearTwo = dateTwo.getFullYear();
    const monthTwo = String(dateTwo.getMonth() + 1).padStart(2, '0'); 
    const dayTwo = String(dateTwo.getDate()).padStart(2, '0');
    const depatureDateformatted = `${yearTwo}-${monthTwo}-${dayTwo}`;

    const options = {
      method: 'GET',
      url: 'https://tripadvisor16.p.rapidapi.com/api/v1/flights/searchFlights',
      params: {
        sourceAirportCode: departurePointIATA,
        destinationAirportCode: arrivalPointIATA,
        date: depatureDateformatted,
        itineraryType: typevalue,
        sortOrder: 'PRICE',
        numAdults: numberOfAdults,
        numSeniors: '0',
        classOfService: valueCOS,
        returnDate: returnDateformatted,
        pageNumber: '1',
        currencyCode: 'USD'
      },
      headers: {
        'X-RapidAPI-Key': '705b315d0amshb9bc627b492a4ccp1e0f9bjsn58df2fb45243',
        'X-RapidAPI-Host': 'tripadvisor16.p.rapidapi.com'
      }
    };
    
    try {
      const response = await axios.request(options);

      const fligtSize = response.data.data.flights

      if (response.data.data.flights.length > 0){
        navigation.navigate('Flights', {
          flights: response.data.data.flights,
          jwtToken: jwtToken
        });
      } 

    } catch (error) {
      console.error(error);
    }finally {
      setLoading(false); 
    }
  };

  const handleShowPicker = () => {
    console.log("showPicker", showPicker);
    setShowPicker(true);
  };



  return (
    <View style={styles.container}>
  
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

      paddingHorizontal: 50,
    },
    input: {
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
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
      fontSize: 18, 
      fontWeight: 'bold',
      marginBottom: 20,
      alignSelf: 'flex-start', 
      marginLeft: 25, 
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