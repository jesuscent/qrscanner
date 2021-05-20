

import React, {useState} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text, Linking, TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button ,Pressable} from 'react-native';

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

 const showAlert = () => {
  setalert(true)
  };
 
 const hideAlert = () => {
   setalert(false)
  
  };

  const alerta = e => {
    showAlert()

    fetch('http://syscontrol.azurewebsites.net/FLH/searchqr?QR=' + e.data + '')
      .then(Response => Response.json())
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
        permissionDialogMessage="¿Puedo usar tu camar?"
        showMarker={true}
        markerStyle={{borderColor: 'green', borderRadius: 10}}
        bottomContent={
          <TouchableOpacity>
            <Text style={{fontSize: 21, color: 'rgb(0,122,255)'}}>
              Escaneando...
            </Text>
          </TouchableOpacity>
        }></QRCodeScanner>

      <AwesomeAlert
        show={alert}
        showProgress={false}
        title="Bien"
        message="el usuario a sido encontrado"
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={false}
        showConfirmButton={true}
        confirmText="VERIFICAR"
        confirmButtonColor="#DD6B55"
        onConfirmPressed={() => {
          hideAlert();
          setModalVisible(true);
        }}
      />

      <Modal animationType="slide" transparent={false} visible={modalVisible}>
        <View>
          <Text> {json.nombre}</Text>
          <View>
            <Text>Acesso a dia 1: {json.evento1} </Text>
          </View>

          <View>
            <Text>Acesso a dia 3: {json.evento2} </Text>
          </View>

          <View>
            <Text>Acesso a dia 3: {json.evento3} </Text>
          </View>
          <Button
            onPress={() => setModalVisible(!modalVisible)}
            title="OK"
            color="blue"
          />
        </View>
      </Modal>
    </View>
  );

 }


export default App;
