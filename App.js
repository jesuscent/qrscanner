
import * as React from 'react';
 import {useState} from 'react';
 import QRCodeScanner from 'react-native-qrcode-scanner'
 import { Text,Image,ActivityIndicator, ImageBackground,Linking,StyleSheet,Separator,
   TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button,TextInput ,Pressable, ScrollView} from 'react-native';
   import axios from 'axios';
   import AwesomeAlert from 'react-native-awesome-alerts';
 import { Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
 import { NavigationContainer ,DefaultTheme} from '@react-navigation/native';
 import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
 import QR from './Qr'
 import BuscarPorNombre from './BuscarPorNombre'
 import Lista from './Lista'
 import { enableScreens } from 'react-native-screens';
 import QrVip from './QrVip';
 function App() {

  const [alert, setalert] = useState(false);
  const [alert1, setalert2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [json, setjson] = useState([]);
  const [infAlert,setinfAlert]= useState('');
  const [valida,setvalida]=useState(false);
  const [qrvalid,setqrvalid]=useState('');
  const [diavalid,setdiavalid]=useState('');
  const [eventvalida,seteventvalid]=useState('');
  
  const [car1,setcar1]=useState(false);
  const [car2,setcar2]=useState(false);
  const [car3,setcar3]=useState(false);

 const showAlert = () => {
  setalert(true)
  };
 
 const hideAlert = () => {
   setalert(false)
  };
  const showAlert2 = () => {
    setalert(true)
    };
   
   const hideAlert2 = () => {
     setalert2(false)
    };
  
    const [text, setText] = useState("");


  const alerta = () => {
    
        console.info("peticion yes: "+ text);
    //console.info( "QR leido: "+e.data)
    async function getInfo() {
      const response = await fetch('https://syscontrol.azurewebsites.net/FLH/buscarPorNomTel?nombre=' + text + '');
      const invitado = await response.json();
      return invitado;
    }
    
    getInfo().then(invitado => {
       // console.info("datos del invitado"+invitado.nombreInvitado); 
         let Bolvalid = parseInt(invitado.Bol_Validado)
        // console.log("bolllll :"+Bolvalid) 

        if(invitado.evento1==null){
         // console.log("entra evento 1 null") 
          setcar1(true)
        }  
        if(invitado.evento2==null){
         // console.log("entra evento 2 null") 
          setcar2(true)
        }  
        if(invitado.evento3==null){
         // console.log("entra evento 3 null") 
          setcar3(true)
        }
         if(Bolvalid==1 ){
        //  console.log("entra 1") 
           setcar1(true) 
         }
         if(Bolvalid==2 ){  
          //console.log("entra 2")  
           setcar1(true)
           setcar2(true)
         }
         if(Bolvalid==3 ){          
          //console.log("entra 3") 
           setcar1(true)
           setcar2(true)
           setcar3(true)
         }
         setjson(invitado)        
         showAlert()
    });
           
  }//cierre de metodo

  
 //ACTIVA LA FUNCION DE ACTIVAR O CANCELAR ENTRADA
  const onPress2 = (qr,dia,evento) =>{
    setalert2(true)
    setdiavalid(dia);
    setqrvalid(qr);
    seteventvalid(evento);
    //console.info("click en entrada: "+ qr,dia,evento);
    
  } 
 // ENVIA QUE ENTRADA SE ESTA CONFRIMANDO 
  const valid = (qr,dia) =>{
   

        console.info("peticion yes: "+ text);
        async function getconfirm() {
          var url ='http://syscontrol.azurewebsites.net/FLH/confirmarEntrada?QR='+qr+'&dia='+dia+'';
         // console.info("mi url : "+url)
          const response = await fetch(url);
          const enviado = await response.json();
          //console.info("datos del invitado: "+enviado); 
          return enviado;
        }
        
        getconfirm().then(enviado => {
             //console.info("datos del invitado2: "+enviado.Bol_Validado); 
             hideAlert2()
             onclose()
        });
    
  } 
const onclose=()=>{
  setjson('')
  setModalVisible(!modalVisible);
  setcar1(false)
  setcar2(false)
  setcar3(false)
  setText("")
}
const Tab = createBottomTabNavigator();


   return (
    
    <NavigationContainer>
    <Tab.Navigator
    tabBarOptions={{
      showLabel:false,
      style:{
        position: 'absolute',
        bottom:8,
        left:5,
        right:5,
        elevation:0,
        borderRadius:15,
        height: 90,
        backgroundColor:'#ffff',
        ...styles.shadow

      }
    }}
    >
      <Tab.Screen name="Home" component={QR} 
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignItems:'center',justifyContent:'center',top:10}}>
            <Image
              source={require('./assets/qrcode.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor:focused ? '#e32f45':'#748c94',
              }}
            />
              <Text>QR</Text>
            </View>
          ),
        }}
      />
      {/* <Tab.Screen name="QrVip" component={QrVip} 
      
      options={{
        tabBarIcon:({focused})=>(
          <View style={{alignItems:'center',justifyContent:'center',top:10}}>
           <Image
              source={require('./assets/search.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor:focused ? '#e32f45':'#748c94',
              }}
            />
            <Text>QrVip</Text>
          </View>
        ),
      }}
      /> */}
       {/* <Tab.Screen name="Lista" component={Lista} 
      
      options={{
        tabBarIcon:({focused})=>(
          <View style={{alignItems:'center',justifyContent:'center',top:10}}>
            <Image
              source={require('./assets/list.png')}
              resizeMode="contain"
              style={{
                width: 30,
                height: 30,
                tintColor:focused ? '#e32f45':'#748c94',
              }}
            />
            <Text>LISTA</Text>
          </View>
        ),
      }}
      /> */}
    </Tab.Navigator>
  </NavigationContainer>
   );

  }

 const styles = StyleSheet.create({
   shadow:{
    shadowColor:'red',
    shadowOffset:{
      width: 0,
      height: 1,
    },
    shadowOpacity:0.1,
    shadowRadius:1.5,
    elevation:2
   },
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  usado:{
    fontSize: 22,
    padding: 18,
    fontWeight:'bold',
    textAlign:'center',
    color:'#FFFFFF', 
  },
   titulo:{
     textAlign:'center',
     fontSize:30,
     fontWeight:'bold',
     backgroundColor: '#0277bd',
     paddingBottom:2,
     marginBottom:4,
      color:'#FFFFFF', 
   },
   tituloCard:{
    textAlign:'center',
    fontWeight:'bold',
    color:'#FFFFFF', 
  },
  viewcardcontent:{
    flexDirection: "column",
    shadowColor: '#a5e1ad',
    width:'55%',
    height:'auto',
    padding: 10,
    marginLeft:5,
    alignItems:'stretch',
    textAlign:'center',
   },
   viewcardcontent2:{
    flexDirection: "column",
    padding: 5,
    marginLeft:6,    
    width:'38%',
    textAlign:'center', 
    alignItems:'center',
   },
 viewcard1:{
  flexDirection: "row",
  flexWrap: "wrap",
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 5, height: 6 },
  shadowRadius: 4,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#CB910C',  
  borderRadius: 15,
  margin:5,  
 },
 viewcard2:{
  flexDirection: "row",
  flexWrap: "wrap",
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 5, height: 6 },
  shadowRadius: 4,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#A09AA7',  
  borderRadius: 15,
  margin:5,  
 },
 viewcard3:{
  flexDirection: "row",
  flexWrap: "wrap",
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 5, height: 6 },
  shadowRadius: 4,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#000000',  
  borderRadius: 15,
  margin:5,  
 },
 texto:{  
  flexDirection: "row",
  padding: 1,
  color:'#FFFFFF', 
  textAlign:'center',
 },
 evento:{  
  fontSize:14,
  fontWeight:'bold',
  color:'#FFFFFF', 
  textAlign:'center',
 },
 btn:{  
  justifyContent: 'center',
  marginHorizontal: 50,
  margin:25,
  backgroundColor: '#0277bd',
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 5, height: 6 },
  shadowRadius: 4,
  shadowOpacity: 0.26,
  elevation: 8,
  borderRadius:50,
  width: '70%',
  height: 50,
  textAlign:'center',
 },
 Logo:{
  marginTop:20,
  width: 120,
  height: 100,
  resizeMode: "cover",
  alignContent:'center',
  alignItems:'center'
 },
 tituloqr:{
color:'white',
fontSize:69,
paddingBottom:80
 },
 qrfooter:{
   fontSize:30,
   color:'white',
   paddingTop:50,
 },
 btnsearch:{
  justifyContent: 'center',
  marginHorizontal: 50,
  margin:25,
  backgroundColor: '#0277bd',
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 5, height: 6 },
  shadowRadius: 4,
  shadowOpacity: 0.26,
  elevation: 8,
  borderRadius:50,
  width: '70%',
  height: 50,
  textAlign:'center',
 },container: {
  flex: 1,
  justifyContent: "center",
  paddingHorizontal: 10
},
inputsearch:{
  justifyContent: "center",
  textAlign:'center',
  elevation: 2,
  borderRadius:10,
  shadowColor:  '#0662F8',
  height:69,
  color:'black',
  fontSize:15,
  alignContent:'center',
}
});

 export default App;
