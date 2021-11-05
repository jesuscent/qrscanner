import React, { useEffect } from 'react';
import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text,Image,ActivityIndicator, ImageBackground,Linking,StyleSheet,Separator,
   TouchableOpacity, FlatList,Alert, TouchableHighlight , View,SectionList, Modal, Button,TextInput ,Pressable, ScrollView} from 'react-native';

import Itemlis from './Itemlis'
import { Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { color } from 'react-native-reanimated';


function Lista() {

  const [json, setjson] = useState([]);
  const [confirmados, setConfirmados] = useState();


  const lista = () => {
    async function getInfo() {
      const response = await fetch('https://fullpassapi.azurewebsites.net/api/Qrs/GetCountDatosQR');
      const datos = await response.json();
      return datos;
    }

    getInfo().then(datos => {      
      setjson(datos)
      console.info(datos)    
      });
    }


    useEffect(() => {
    lista()
   
  },[]);

 
 
  return (
    <> 
  <View style={styles.centerText}>

  <View style={styles.centerText1}>
    <Text style={styles.titulo}>ESTADÍSTICAS DE ENTRADA
    </Text> 
    <TouchableOpacity style={styles.btnConsult} onPress={() => lista()}>
          <Text style={styles.texto}>
              Consultar
              </Text> 
          </TouchableOpacity>
        <TouchableOpacity style={styles.viewcard3}   >          
          <View style={styles.viewcardcontent}> 
          <Text style={styles.usado}>TOTAL POR VIP CONFIRMADO</Text>          
          <Text style={styles.usado}>{json.countvip==null ? 0:json.countvip}</Text>
          </View> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard3}   >          
          <View style={styles.viewcardcontent}> 
          <Text style={styles.usado}>TOTAL POR MESA CONFIRMADO</Text>          
          <Text style={styles.usado}>{json.countlugar==null ? 0:json.countlugar}</Text>
          </View> 
          </TouchableOpacity>
   </View>

          
  </View>
    </>
  );
 }
 const styles = StyleSheet.create({
  texto:{  
    flexDirection: "row",
    padding: 1,
    color:'#ffff', 
    textAlign:'center',
    fontSize:25,
   }, usado:{
    fontSize: 22,
    padding: 10,
    fontWeight:'bold',
    textAlign:'center',
    color:'#FFFFFF', 
  },tituloCard:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#FFFFFF', 
  },
   btnConsult:{
    justifyContent: "center",
    textAlign:'center',
    elevation: 2,
    borderRadius:50,
    shadowColor:  'white',
    height:50,  
    fontWeight:'bold',
    backgroundColor: '#0481FA',    
    alignContent:'center',
    marginVertical: 5,
    marginHorizontal: 5,
   },viewcardcontent:{
    flexDirection: "column",
    shadowColor: '#0481FA',
    width:'100%',
    height:'auto',
    padding: 10,
    marginLeft:5,
    alignItems:'stretch',
    textAlign:'center',
   },
  intotal:{
    backgroundColor: '#000',
    textAlign:'center',
    color:'#ffff', 
    fontSize:15,
    },
    intconf:{
      backgroundColor: '#000',
      textAlign:'center',
      color:'#ffff', 
      fontSize:15,
    },
  todo:{
    backgroundColor: '#7BB7F2',
    fontWeight:'bold',
    color:'black', 
    marginHorizontal: 5,
  },
  evento1:{
    backgroundColor: '#000000', 
    fontWeight:'bold',
    color:'#FEFEFE', 
    marginHorizontal: 5,
  },
  evento2:{
    backgroundColor: '#28E705',
    fontWeight:'bold',
    color:'black', 
    marginHorizontal: 5,
  },
  evento3:{
    backgroundColor: '#000000',  
    fontWeight:'bold',
    color:'#FEFEFE', 
    marginHorizontal: 5,
  },
  centerText: {
    flex: 1,
    fontSize: 20,
    paddingBottom: 100,
    color: 'red',
    backgroundColor: '#000000',  
  }, 
  centerText1: {
    flex: 1,
    fontSize: 18,
    color: '#777',
    marginHorizontal: 5,
  },
   item: {
    borderColor:'black',
    paddingBottom: 10,
    marginVertical: 2,
    color:'black',
  },
  title:{
    fontSize: 12,
    padding: 0,
    fontWeight:'bold',
    color:'black', 
    marginHorizontal: 5,
    backgroundColor: 'black',
  },
   titulo:{
     textAlign:'center',
     fontSize:25,
     fontWeight:'bold', 
     backgroundColor: '#000',
     paddingBottom:2,
     marginBottom:4,
      color:'red', 
   },
   viewcard3:{
    flexDirection: "row",
    flexWrap: "wrap",
    shadowColor: '#0481FA',
    shadowOffset: { width: 5, height: 6 },
    shadowRadius: 4,
    shadowOpacity: 0.50,
    elevation: 10,
    backgroundColor: '#9C0D08',  
    borderRadius: 15,
    margin:5,  
   },
});
 export default Lista;
