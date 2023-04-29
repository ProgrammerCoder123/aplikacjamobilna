import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert} from 'react-native';
import { RouteProp, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { sha256, sha256Bytes } from 'react-native-sha256';


type NewScreenRouteProp = RouteProp<RootStackParamList, 'LoginScreen'>;

const LoginScreen = () => {
  const { params } = useRoute<NewScreenRouteProp>();

  const [loginText, onChangeLoginText] = React.useState('');
  const [passwordText, onChangePasswordText] = React.useState('');

  var hashedPassword:string = "";

  const incorrectDataAlert = () =>
    Alert.alert('Uwaga', 'Wprowadzono nieprawidłowe dane', [
      {
        text: 'Zamknij',
        style: 'cancel',
      },
    ]);

  const notAllData = () =>
    Alert.alert('Uwaga', 'Nie wprowadzono wszystkich wymaganych danych!', [
      {
        text: 'Zamknij',
        style: 'cancel',
      },
    ]);
    


  const handleLoginPress = async () => {
    console.log('Zaloguj');


    if(loginText == "" || passwordText == "") {
      notAllData();
      return
    }

    sha256(passwordText).then( hash => {
      hashedPassword = hash;
    });


    const response = await fetch(
      'http://192.168.18.4:5000/api/loginuser',
      {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          'user_login': loginText,
          'user_password': hashedPassword,
        }),
      }
    );
    const json = await response.json();

    if(json.login == "No") {
      incorrectDataAlert();
    } else {
      
    }




  };



  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.textBars}>Login</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeLoginText}
          value={loginText}
        />
        <Text style={styles.textBars}>Hasło</Text>
        <TextInput
          secureTextEntry={true}
          style={styles.input}
          onChangeText={onChangePasswordText}
          value={passwordText}
        />
      </View>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD', marginTop: 20,}]}
        onPress={handleLoginPress}>
        <Text style={styles.buttonText}>Zaloguj</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5F5F5',
    flex: 1,
    justifyContent: 'center',
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

export default LoginScreen;