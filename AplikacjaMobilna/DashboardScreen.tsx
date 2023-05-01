import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, SafeAreaView, TextInput, TouchableOpacity, Alert, BackHandler, FlatList} from 'react-native';
import { CommonActions, RouteProp, StackActions, useIsFocused, useNavigation, useRoute } from '@react-navigation/native';
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

type ItemProps = {
  item: ItemData;
  onPressEdit: () => void;
  onPressDelete: () => void;

};


const Item = ({item, onPressEdit, onPressDelete}: ItemProps) => (

  <View style={styles.cardNote}>
    <View
      style={[
        styles.container,
        {
          flexDirection: 'row',
        },
        {backgroundColor: 'white'},
      ]}>
        <View style={{flex: 1.5, backgroundColor: 'white'}} >
          <Text style={[{backgroundColor: 'white', color: 'black', fontWeight: 'bold'}]}>{item.noteTitle}</Text>
        </View>
        <View style={[{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white'}, styles.container,
        {
          flexDirection: 'row',
          backgroundColor: 'white',
        },]} >
          <TouchableOpacity
            style={[styles.noteCardButton, { backgroundColor: 'darkorange'}]}
            onPress={onPressEdit}>
            <Text style={[styles.noteCardButtonText]}>Edytuj</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.noteCardButton, { backgroundColor: 'red'}]}
            onPress={onPressDelete}>
            <Text style={[styles.noteCardButtonText]}>Usuń</Text>
          </TouchableOpacity>
        </View>        
      </View>
  </View>
);


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
      
      
      console.log(json.notes);
      console.log(json.notes.length);
      console.log(json.notes[0]);
      console.log(json.notes[0]['noteTitle']);
  

      for (let i = 0; i < json.notes.length; i++) {

        var tmpItem:ItemData = {
          noteID: json.notes[i]['id'],
          noteOwner: json.notes[i]['userLogin'],
          noteTitle: json.notes[i]['noteTitle'],
          noteNote: json.notes[i]['noteNote'],
        }

        arrayData.push(tmpItem);
      }


  
    };


    getData();

    

   

    const renderItem = ({item}: {item: ItemData}) => {
      return (
        <Item
          item={item}
          onPressEdit={() => handleNotatkaEdit}
          onPressDelete={() => handleNotatkaDelete(item.noteID)}
        />
      );
    };




    const handleNotatkaEdit = async () => {
      
    };
    const handleNotatkaDelete = async (noteID:Int32) => {
      Alert.alert(
          "Uwaga!",
          "Czy chcesz usunąć tę notatkę",
          [
            {
              text: "Yes",
              onPress: async () => {
                const response = await fetch(
                  'http://192.168.18.4:5000/api/notes/delete',
                  {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      'noteID': noteID,
                    }),
                  }
                );
                const json = await response.json();

                navigation.dispatch(
                  CommonActions.reset({
                    index: 1,
                    routes: [
                      { name: 'DashboardScreen', params: {id: params.id, login: params.login}},
                    ],
                  }));


              },
            },
            {
              text: "No",
            },
          ]
        );
    };




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

      <SafeAreaView style={[styles.container, {marginTop: 30}]}>
      <FlatList
        data={arrayData}
        renderItem={renderItem}
        keyExtractor={(item: { noteID: any; }) => item.noteID}
      />
    </SafeAreaView>


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

  cardNote: {
    padding: 5,
    width: 320,
    height: 75,
    elevation: 4,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
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

  noteCardButton: {
    padding: 5,
    margin: 2, 
  },
  noteCardButtonText: {
    color: 'black',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 15,
       
  },
});

export default DashboardScreen;