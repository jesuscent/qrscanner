
import React from "react";
import {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text,Image,ActivityIndicator, ImageBackground,Linking,StyleSheet,Separator,
   TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button ,Pressable, ScrollView} from 'react-native';
   import axios from 'axios';

import AwesomeAlert from 'react-native-awesome-alerts';

import { Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';


function App() {

  const [alert, setalert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [json, setjson] = useState([]);
  const [infAlert,setinfAlert]= useState('');
  const [datoqr,setDatoqr]=useState('');
  const [nomInfo,setnomInfo]=useState();
 const showAlert = () => {
  setalert(true)
  };
 
 const hideAlert = () => {
   setalert(false)
  };

  const alerta = e => {
   
    console.info( "QR leido: "+e.data)
    async function fetchMoviesJSON() {
      const response = await fetch('http://syscontrol.azurewebsites.net/FLH/asistencia?QR=' + e.data + '');
      const movies = await response.json();
      return movies;
    }
    
    fetchMoviesJSON().then(movies => {
         console.log(movies); 
         setjson(movies)        
         showAlert()
    });
            // console.info( "QR leido: "+e.data)
            //   fetch('http://syscontrol.azurewebsites.net/FLH/asistencia?QR=' + e.data + '')
            //   .then(Response => Response.json())  
            //   .then(data =>  setjson(data))      
            //   .catch(error => console.error('Error:', error))
            
        // validamos si data que esta en la variable json es null
        if(json.Txt_QR != null){
          console.log("información :"+json.nombreInvitado)
         // setnomInfo(json.nombreInvitado)
          showAlert()
          setDatoqr(null);
          
        }
  }//cierre de metodo

  
  const [count, setCount] = useState(0);
  const onPress = () => setCount(prevCount => prevCount + 1);
const onclose=()=>{
 
  setjson('')
  setnomInfo('')
  setModalVisible(!modalVisible);

}

  return (
    <>
     <QRCodeScanner
        containerStyle={{backgroundColor: '#38006b'}}
        onRead={alerta}
        reactivate={true}
        reactivateTimeout={5000}
        permissionDialogMessage="¿Puedo usar tu camara?"
        showMarker={true}
        markerStyle={{borderColor: 'green', borderRadius: 10}}   
        topContent={          
            <Text style={styles.tituloqr}>FBX40 </Text>
        }    
        bottomContent={
          <TouchableOpacity>
            <Text style={styles.qrfooter}>
              Buscando...
            </Text>
            <ActivityIndicator size="large"  color="#00ff00" />
          </TouchableOpacity>
        }       
        >          
        </QRCodeScanner>
       
    <View>
       
      <AwesomeAlert 
        show={alert}
        showProgress={true}
        title="INVITADO ENCOTRADO"
        message={json.nombreInvitado}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="VERIFICAR ENTRADA"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert();
          setModalVisible(true);
        }}
      />
      {/* <AwesomeAlert  
        show={true}
        showProgress={true}
        title="DINNER & DRINKS" 
        message="Por favor, validar la entrada del evento." 
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="VALIDAR"
        cancelText="CANCELAR"
        confirmButtonColor="green"
        cancelButtonColor="red"
        onConfirmPressed={() => {
          hideAlert();
          setModalVisible(true);
        }}
      /> */}
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
     
        <ScrollView>
          <Text style={styles.titulo}>Entrada de evento {count} </Text>          
          <TouchableOpacity style={styles.viewcard1} onPress={onPress} disabled={false}  >          
                <View style={styles.viewcardcontent}> 
                <Text style={styles.tituloCard}>Invitado:</Text> 
                <Text style={styles.texto}> {json.nombreInvitado}  </Text> 
                <Text style={styles.tituloCard}>Acompañante:</Text> 
                <Text style={styles.texto}>{json.NombreAcompanante}  </Text> 
                <Text style={styles.texto}>{"\n"}25 de junio 2021</Text>                   
                </View>
                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>DINNER & DRINKS</Text>
                <Image style={styles.Logo}
              source={{
                uri:('https://fbx40.azurewebsites.net/static/media/ftlogo.9e8078a5.png')
              }}
            />
             </View> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard2} disabled={true}  >          
                <View style={styles.viewcardcontent}> 
                <Text style={styles.tituloCard}>Invitado:</Text> 
                <Text style={styles.texto}>{json.nombreInvitado}  </Text> 
                <Text style={styles.tituloCard}>Acompañante:</Text> 
                <Text style={styles.texto}> {json.NombreAcompanante}  </Text> 
                <Text style={styles.texto}>{"\n"}26 de junio 2021</Text>                   
                </View>
                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>BRUNCH</Text>
                <Image style={styles.Logo}
              source={{
                uri:('https://fbx40.azurewebsites.net/static/media/ftlogo.9e8078a5.png')
              }}
            />
             </View> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard3} disabled={true} >          
                <View style={styles.viewcardcontent}> 
                <Text style={styles.tituloCard}>Invitado:</Text> 
                <Text style={styles.texto}> {json.nombreInvitado}  </Text> 
                <Text style={styles.tituloCard}>Acompañante:</Text> 
                <Text style={styles.texto}> {json.NombreAcompanante}  </Text> 
                <Text style={styles.texto}>{"\n"}27 de junio 2021</Text>                   
                </View>
                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>ZAMNA</Text>
                <Image style={styles.Logo}
              source={{
                uri:('https://fbx40.azurewebsites.net/static/media/ftlogo.9e8078a5.png')
              }}
            />
             </View> 
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btn} onPress={() => onclose()} >
          <Text style={styles.texto}>
          ESCANEAR NUEVO INVITADO
              </Text> 
          </TouchableOpacity>
        </ScrollView>
      </Modal>
    </View>
    </>
  );

 }

 const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
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
 }
});

export default App;
