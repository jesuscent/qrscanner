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
  const [count, setCount] = useState(6);
  const [confirmados, setConfirmados] = useState();


  const lista = () => {

    async function getInfo() {
      const response = await fetch('https://syscontrol.azurewebsites.net/FLH/ListaConfirmado?lista');
      const lista = await response.json();
      return lista;
    }
    getInfo().then(invitado => {
      setjson(invitado) 
      console.log(json);       
      console.log("pasaas"+ invitado.length); 
      setCount(invitado.length)
      var cant = invitado.filter(o =>o.Bol_Validado==2).length;
      setConfirmados(cant);
      console.log("total confirmado"+ cant); 
  });
  }


    useEffect(() => {
      lista()

  },[]);

  const DATA = [
    {
      Txt_Nombre: "PABLO BUSTAMANTE",
      Txt_NombreAcompañante: "Andrea Roncallo ",
      Bol_Validado: 0,
      Int_Status: 2
  }
];
  const Item = ({ items }) => (
    <View style={styles.item}>
     

      {items.Bol_Validado==0 ?       
      <Text style={styles.todo} > 
      INVITADO: {items.Txt_Nombre}{"\n"} 
      ACOMPÑANTE: {items.Txt_NombreAcompañante}
      </Text>  :null   }
    
      {items.Bol_Validado==1 ? 
      <Text style={styles.evento1} > 
      INVITADO: {items.Txt_Nombre}{"\n"}
       ACOMPÑANTE: {items.Txt_NombreAcompañante}
       </Text> :null   }
  
      {items.Bol_Validado==2 ?  
      <Text style={styles.evento2}> 
      INVITADO: {items.Txt_Nombre}{"\n"}
       ACOMPÑANTE: {items.Txt_NombreAcompañante}
       </Text>:null  }

       {items.Bol_Validado==3 ?  
       <Text style={styles.evento3}> 
       INVITADO: {items.Txt_Nombre}{"\n"} 
       ACOMPÑANTE: {items.Txt_NombreAcompañante} 
       </Text> :null  }
 
     

    </View>
  );
  return (
    <> 
  <View style={styles.centerText}>

  <View style={styles.centerText1}>
    <Text style={styles.titulo}>LISTA DE INVITADOS
    </Text> 
    <Text style={styles.intotal}>Invitados Total: {count}</Text>
    <Text style={styles.intconf}>Checkin: {confirmados}</Text>

    <TouchableOpacity style={styles.btnConsult} onPress={() => lista()}>
          <Text style={styles.texto}>
              Consultar 
              </Text> 
          </TouchableOpacity>

    <FlatList
          data={json}          
          renderItem={({ item }) => <Item items={item} />}
          keyExtractor={(item, index) => item + index}
        />
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
   },
  intotal:{
    backgroundColor: '#0481FA',
    textAlign:'center',
    color:'#ffff', 
    fontSize:15,
    },
    intconf:{
      backgroundColor: '#0481FA',
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
    color: '#777',
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
     fontSize:30,
     fontWeight:'bold', 
     backgroundColor: '#0481FA',
     paddingBottom:2,
     marginBottom:4,
      color:'#FFFFFF', 
   }
});
 export default Lista;
