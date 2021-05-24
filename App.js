
import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text,Image, Linking,StyleSheet,Separator, TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button ,Pressable} from 'react-native';

import AwesomeAlert from 'react-native-awesome-alerts';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';


function App() {

  const [alert, setalert] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [json, setjson] = useState("");
  const [infAlert,setinfAlert]= useState('');
 const showAlert = () => {
  setalert(true)
  };
 
 const hideAlert = () => {
   setalert(false)
  
  };

  const alerta = e => {
    console.log( "qr stting "+e.data)
    showAlert()
    fetch('http://syscontrol.azurewebsites.net/FLH/asistencia?QR=' + e.data + '')
      .then(Response => Response.json())      
      .then(data => console.log( "la data del api "+data[0]))
      .then(data =>
        setjson(data[0])
       )
      .catch(console.log)
  }

  return (
    <View>
      <QRCodeScanner
        containerStyle={{backgroundColor: 'white'}}
        onRead={alerta}
        reactivate={true}
        reactivateTimeout={3000}
        permissionDialogMessage="¿Puedo usar tu camara?"
        showMarker={true}
        markerStyle={{borderColor: 'green', borderRadius: 10}}
            bottomContent={
          <TouchableOpacity>
            <Text style={{fontSize: 21, color: 'rgb(0,122,255)'}}>
              Escaneando...
            </Text>
          </TouchableOpacity>
        }>          
        </QRCodeScanner>

      <AwesomeAlert 
        show={alert}
        showProgress={true}
        title="Invitado Encontrado"
        message="Por favor validar la entrada al evento"
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

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View >
          <Text> {json.nombre}</Text>
          <TouchableOpacity style={styles.viewcard1}>
          <View style={styles.viewcardcontent}> 
          <Text style={styles.texto}>
              Entrada dia 1: {"\n"}
             Fbx dia 1 {json.evento1} {"\n"} {"\n"}            
              nombre invitado: {"\n"}
             Jesús Centeno {json.evento1}  {"\n"}    {"\n"}        
              Acompañante: {"\n"}
              carlos santos {json.evento1} 
              </Text>
          </View>
          <View style={styles.viewcardcontent}>
          <Image
        style={styles.Logo}
        source={{
          uri: 'https://reactnative.dev/img/tiny_logo.png',
        }}
      />
              </View>
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard1}>
          
          <Text style={styles.texto}>
              Entrada dia 1: {"\n"}{"\n"}
             Fbx dia 1 {json.evento1} 
              </Text>
            <Text style={styles.texto}>
              Nombre invitado:{"\n"}
              Jesus centeno {json.evento1} 
              </Text>
              <Text style={styles.texto}>
              Nombre acompañante: {"\n"}
               guadalupe Centeno {json.evento1} 
              </Text>              
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard2}>
            
          <Text style={styles.texto}>
              Entrada dia 2:
             Fbx dia 1 {json.evento1} 
              </Text>
            <Text style={styles.texto}>
              Nombre invitado:
              Jesus centeno {json.evento1} 
              </Text>
              <Text style={styles.texto}>
              Nombre acompañante: guadalupe Centeno {json.evento1} 
              </Text>           
          </TouchableOpacity>

          <TouchableOpacity style={styles.viewcard3}>           
          <Text style={styles.texto}>
              Entrada dia 3:
             Fbx dia 1 {json.evento1} 
              </Text>
            <Text style={styles.texto}>
              Nombre invitado:
              Jesus centeno {json.evento1} 
              </Text>
              <Text style={styles.texto}>
              Nombre acompañante: guadalupe Centeno {json.evento1} 
              </Text>           
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.btn} onPress={() => setModalVisible(!modalVisible)} >
          <Text style={styles.texto}>
          ESCANEAR NUEVO INVITADO
              </Text> 
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );

 }

 const styles = StyleSheet.create({
  viewcardcontent:{
    flexDirection: "row",
    flexWrap: "wrap",
    shadowColor: '#a5e1ad',
    shadowOffset: { width: 2, height: 1 },
    shadowRadius: 1,
    shadowOpacity: 0.26,
    elevation: 1,
    padding: 10,
    margin:5,
   },
 viewcard1:{
  flexDirection: "row",
  flexWrap: "wrap",
  shadowColor: '#a5e1ad',
  shadowOffset: { width: 6, height: 5 },
  shadowRadius: 8,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#511281',
  padding: 20,
  borderRadius: 15,
  margin:12,
 },
 viewcard2:{
  shadowColor: '#511281',
  shadowOffset: { width: 6, height: 5 },
  shadowRadius: 8,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#4ca1a3',
  padding: 20,
  borderRadius: 15,
  margin:12,
 },
 viewcard3:{
  shadowColor: '#511281',
  shadowOffset: { width: 6, height: 5 },
  shadowRadius: 8,
  shadowOpacity: 0.26,
  elevation: 8,
  backgroundColor: '#a5e1ad',
  padding: 20,
  borderRadius: 15,
  margin:12,
 },
 texto:{  
  flexDirection: "column",
  padding: 1,
  color:'#FFFFFF',  
 },
 btn:{
  
   justifyContent: 'center',
    marginHorizontal: 16,
  backgroundColor: '#511281',
 },
 Logo:{
   marginBottom:2,
  width: 110,
  height: 120,
 
 }
});

export default App;
