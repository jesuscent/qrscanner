import React from "react";
import {useState,useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text,Image,ActivityIndicator, ImageBackground,Linking,StyleSheet,Separator,
   TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button,TextInput ,Pressable, ScrollView} from 'react-native';
   import axios from 'axios';
import AwesomeAlert from 'react-native-awesome-alerts';

import { Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';


function QrVip() {

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
    const [qrser, setqrser] = useState(false);


  
  const alerta = e => {
    console.info("leido "+e.data)
   
   
    async function getInfo() {
      const response = await fetch('https://syscontrol.azurewebsites.net/FLH/asistencia?QR=' + e.data + '');
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
           
  }
 
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
          var url ='https://syscontrol.azurewebsites.net/FLH/confirmarEntrada?QR='+qr+'&dia='+dia+'';
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
  setqrser(true)
  
  console.log("se cieraa"+ qrser)
 
}

  return (
    <>
    <View style={styles.conte}>   
   
        <QRCodeScanner
        containerStyle={{ paddingTop: 10,backgroundColor: '#000'}}
        onRead={alerta}
        reactivate={true}
        reactivateTimeout={5000}
        permissionDialogMessage="¿Puedo usar tu camara?"
        showMarker={true}
        markerStyle={{borderColor: 'green', borderRadius: 10 ,paddingTop: 60} }   
        topContent={          
          <Text style={styles.tituloqr}>Full-Pass</Text>
        }    
        // bottomContent={
        //   <TouchableOpacity>
        //     <Text style={styles.qrfooter}>
        //       Buscando...
        //     </Text>
        //     <ActivityIndicator size="large"  color="#00ff00" />
        //   </TouchableOpacity>
        // }       
        >          
        </QRCodeScanner>   
        </View>
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
      
     <AwesomeAlert  
        show={alert1}
        showProgress={true}
        title="CONFIRMAR ENTRADA"
        message={eventvalida}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="VALIDAR"
        cancelText="CANCELAR"
        confirmButtonColor="green"
        cancelButtonColor="red"
        onConfirmPressed={() => {       
          valid(qrvalid,diavalid);
        }}
        onCancelPressed={() => {
        
          hideAlert2();
        }}
      /> 
     
      <Modal animationType="slide" transparent={false} visible={modalVisible}>
     
        <ScrollView>
          <Text style={styles.titulo}>Entrada de evento </Text>          
          {/* <TouchableOpacity style={styles.viewcard1}  onPress={() => { onPress2(json.Txt_QR,1,json.evento1) }} disabled={car1}  >          
                <View style={styles.viewcardcontent}>  
                 {json.evento1==null ? <Text style={styles.usado}>SIN PASE {"\n"}DE {"\n"}ENTRADA</Text>: json.Bol_Validado == 1 || json.Bol_Validado == 2 || json.Bol_Validado == 3 ? <Text style={styles.usado}>ENTRADA {"\n"}USADA</Text>: <Text style={styles.tituloCard}></Text> }     
               
                {json.evento1==null || json.Bol_Validado == 1 || json.Bol_Validado == 2 || json.Bol_Validado == 3 ? null: <Text style={styles.tituloCard}>Invitado:</Text> }
                {json.evento1==null || json.Bol_Validado == 1 || json.Bol_Validado == 2 || json.Bol_Validado == 3 ? null: <Text style={styles.texto}> {json.nombreInvitado}  </Text>  }               
                {json.evento1==null || json.Bol_Validado == 1 || json.Bol_Validado == 2 || json.Bol_Validado == 3 ?  null: <Text style={styles.tituloCard}>Acompañante:</Text>   }               
                {json.evento1==null || json.Bol_Validado == 1 || json.Bol_Validado == 2 || json.Bol_Validado == 3 ?  null: <Text style={styles.texto}>{json.NombreAcompanante} </Text>   }
                <Text style={styles.texto}>{"\n"}25 de junio 2021</Text>                   
                </View>

                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>ILIOS CANCÚN</Text>
                <Image style={styles.Logo}
              source={{
                uri:('https://fbx40.azurewebsites.net/static/media/ftlogo.9e8078a5.png')
              }}
            />
             </View> 
          </TouchableOpacity> */}
          <TouchableOpacity style={styles.viewcard2}  onPress={() => { onPress2(json.Txt_QR,2,json.evento2) }} disabled={car2}  >          
          <View style={styles.viewcardcontent}>  
                 {json.evento2==null ? <Text style={styles.usado}>SIN PASE {"\n"}DE {"\n"}ENTRADA</Text>: json.Bol_Validado == 2 || json.Bol_Validado == 3 ? <Text style={styles.usado}>ENTRADA {"\n"}USADA</Text>: <Text style={styles.tituloCard}></Text> }     
               
                {json.evento2==null || json.Bol_Validado == 2 || json.Bol_Validado == 3 ? null: <Text style={styles.tituloCard}>Invitado:</Text> }
                {json.evento2==null || json.Bol_Validado == 2 || json.Bol_Validado == 3 ? null: <Text style={styles.texto}> {json.nombreInvitado}  </Text>  }               
                {json.evento2==null || json.Bol_Validado == 2 || json.Bol_Validado == 3 ?  null: <Text style={styles.tituloCard}>Acompañante:</Text>   }               
                {json.evento2==null || json.Bol_Validado == 2 || json.Bol_Validado == 3 ?  null: <Text style={styles.texto}>{json.NombreAcompanante} </Text>   }
                <Text style={styles.texto}>{"\n"}25 de junio 2021</Text>                   
                </View>
                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>MARBELLA</Text>
                <Image style={styles.Logo}
              source={{
                uri:('https://fbx40.azurewebsites.net/static/media/ftlogo.9e8078a5.png')
              }}
            />
             </View> 
          </TouchableOpacity>
          <TouchableOpacity style={styles.viewcard3} onPress={() => { onPress2(json.Txt_QR,3,json.evento3) }} disabled={car3} >          
          <View style={styles.viewcardcontent}>  
                 {json.evento3==null ? <Text style={styles.usado}>SIN PASE {"\n"}DE {"\n"}ENTRADA</Text>: json.Bol_Validado == 3 ? <Text style={styles.usado}>ENTRADA {"\n"}USADA</Text>: <Text style={styles.tituloCard}></Text> }     
               
                {json.evento3==null || json.Bol_Validado == 3 || json.Bol_Validado == 3 ? null: <Text style={styles.tituloCard}>Invitado:</Text> }
                {json.evento3==null || json.Bol_Validado == 3 || json.Bol_Validado == 3 ? null: <Text style={styles.texto}> {json.nombreInvitado}  </Text>  }               
                {json.evento3==null || json.Bol_Validado == 3 || json.Bol_Validado == 3 ?  null: <Text style={styles.tituloCard}>Acompañante:</Text>   }               
                {json.evento3==null || json.Bol_Validado == 3 || json.Bol_Validado == 3 ?  null: <Text style={styles.texto}>{json.NombreAcompanante} </Text>   }
                <Text style={styles.texto}>{"\n"}25 de junio 2021</Text>                   
                </View>
                <View style={styles.viewcardcontent2}> 
                <Text style={styles.evento}>AFTER PARTY</Text>
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
   
    </>
  );

 }

 const styles = StyleSheet.create({
  conte:{
    flex: 1,
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
fontSize:50,
paddingBottom:80
 },
 qrfooter:{
   fontSize:30,
   color:'white',
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

export default QrVip;
