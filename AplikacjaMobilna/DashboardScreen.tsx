import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { CommonActions, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { sha256, sha256Bytes } from 'react-native-sha256';
import { StackNavigationProp } from '@react-navigation/stack';
import { Int32 } from 'react-native/Libraries/Types/CodegenTypes';


type NewScreenRouteProp = RouteProp<RootStackParamList, 'DashboardScreen'>;


type ItemData = {

  noteID:Int32;
  noteOwner:string;
  noteTitle:string;
  noteNote:string;

};







const DashboardScreen = () => {

  const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
  const [message, setMessage] = useState('');

  const { params } = useRoute<NewScreenRouteProp>();

  var arrayData:ItemData[] = [];
  
  /*
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Main' },
      ],
    }));
    */


    const getData = async () => {
      
      const response = await fetch(
        'http://192.168.18.4:5000/api/notes/get',
        {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            'user_login': params.login,
          }),
        }
      );
      const json = await response.json();
      console.log(json);
  
  
    };


    getData();

    

   





    const handleDodajNotatkePress = async () => {
      navigation.navigate('NoteScreen', {id: params.id, login: params.login, noteType:"DODAJ", noteID:0});
    };

    function handleBackButtonClick() {
      //navigation.goBack();
      return true;
    }
    
    React.useEffect(() => {
      const focusHandler = navigation.addListener('focus', () => {
          //Alert.alert('Refreshed');
          //getData();
      });
      return focusHandler;
      }, [navigation]);

    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);
  

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD', marginTop: 20,}]}
        onPress={handleDodajNotatkePress}>
        <Text style={styles.buttonText}>Dodaj notatkę</Text>
      </TouchableOpacity>
    </View>
  );

};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textBars: {
    fontSize: 15,
    paddingLeft: 10,
  },
  card: {
    padding: 5,
    width: 300,
    height: 200,
    elevation: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    width: 270,
  },
  button: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 20,
    elevation: 4,    
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    margin: 10,
    fontSize: 15,
   
  },
});

export default DashboardScreen;