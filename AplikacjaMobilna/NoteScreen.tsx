import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, BackHandler} from 'react-native';
import { CommonActions, RouteProp, StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { RootStackParamList } from './App';
import { sha256, sha256Bytes } from 'react-native-sha256';
import { StackNavigationProp } from '@react-navigation/stack';


type NewScreenRouteProp = RouteProp<RootStackParamList, 'NoteScreen'>;

const NoteScreen = () => {

    const navigation = useNavigation<StackNavigationProp<RootStackParamList>>();
    const { params } = useRoute<NewScreenRouteProp>();

    const [noteText, onChangeNoteText] = React.useState('');
    const [titleText, onChangeTitleText] = React.useState('');


    var buttonText:string = "";

    if(params.noteType == "DODAJ") {
        buttonText = "Zapisz notatkę"
    }


  
  /*
  navigation.dispatch(
    CommonActions.reset({
      index: 1,
      routes: [
        { name: 'Main' },
      ],
    }));
    */


    const handleZapiszNotatkePress = async () => {
      
        if(titleText == "" || noteText == "") {
            Alert.alert('Uwaga', 'Podaj tytuł i treść notatki', [
                {
                  text: 'Zamknij',
                  style: 'cancel',
                },
              ]);

            return;
        }

        const response = await fetch(
            'http://192.168.18.4:5000/api/notes/publish',
            {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                'user_login': params.login,
                'note_title': titleText,
                'note_note': noteText,
              }),
            }
          );
          const json = await response.json();


          navigation.goBack();
    
      };

    function handleBackButtonClick() {
      //navigation.goBack();
      return true;
    }
    
    useEffect(() => {
      BackHandler.addEventListener("hardwareBackPress", handleBackButtonClick);
      return () => {
        BackHandler.removeEventListener("hardwareBackPress", handleBackButtonClick);
      };
    }, []);
  

  return (
    <View style={styles.container}>
      <View style={styles.card}>
      <TextInput
          style={styles.input}
          onChangeText={onChangeTitleText}
          value={titleText}
        />
        <TextInput
            editable
            multiline
            numberOfLines={7}
            maxLength={200}
            onChangeText={text => onChangeNoteText(text)}
            value={noteText}
            style={styles.textHolder}
        />
        <TouchableOpacity
        style={[styles.button, { backgroundColor: '#0277BD', marginTop: 20,}]}
        onPress={handleZapiszNotatkePress}>
        <Text style={styles.buttonText}>{buttonText}</Text>
      </TouchableOpacity>
      </View>
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
    width: 350,
    height: 325,
    elevation: 4,
    backgroundColor: 'white',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    margin: 12,
    borderBottomWidth: 1,
    padding: 10,
    width: '90%',
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
  textHolder: {
    backgroundColor: 'white',
    borderColor: '#000000',
    borderWidth: 2,
    margin: 5,
    width: '90%',
  }
});

export default NoteScreen;