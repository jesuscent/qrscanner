import React from "react";
import {useState,useEffect} from 'react';
import QRCodeScanner from 'react-native-qrcode-scanner'
import { Text,Image,ActivityIndicator, ImageBackground,Linking,StyleSheet,Separator,
   TouchableOpacity, Alert, TouchableHighlight , View, Modal, Button,TextInput ,Pressable, ScrollView} from 'react-native';
import AwesomeAlert from 'react-native-awesome-alerts';
import { Colors,  DebugInstructions,  Header,  LearnMoreLinks,  ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';


function Qr() {

  const [alert, setalert] = useState(false);
  const [alert1, setalert2] = useState(false);
  const [alertinfo, sealertinfo] = useState(false);
  const [alertwelcom, sealalertwelcom] = useState(false);

  const [modalVisible, setModalVisible] = useState(false);
  const [json, setjson] = useState([]);
  const [infAlert,setinfAlert]= useState('');
  const [valida,setvalida]=useState(false);
  const [qrvalid,setqrvalid]=useState('');
  const [diavalid,setdiavalid]=useState('');
  const [eventvalida,seteventvalid]=useState('');
  


 const showAlert = () => {
  setalert2(true)
  };
 
 const hideAlert = () => {
  setalert2(false)
  
  };


  const showAlert2 = () => {
    setalert(true)
    };
   
   const hideAlert2 = () => {
    setalert(false)
    };
  
    const showAlertinfo = () => {
      sealertinfo(true)
      };
     
     const hideAlertinfo = () => {
      sealertinfo(false)
      };
    
      const hideAlertlertwelcom = () => {
        sealalertwelcom(false)
        };

  const getQr = e => {
    console.info(e.data)
    async function getInfo() {
      const response = await fetch('https://fullpassapi.azurewebsites.net/api/Qrs/BuscarPorQr/'+e.data);
      const invitado = await response.json();
      return invitado;
    }
    
    getInfo().then(data => {
      
          if(data.lngIdPaseyIdVip != null){
            if(data.intTipo==1){
              setjson(data)        
              showAlert()
             }
            if(data.intTipo==2){         
              setjson(data)        
              showAlert2()
            }
          }else{
            showAlertinfo()
          }
    });
           
  }
 

 // ENVIA QUE ENTRADA SE ESTA CONFRIMANDO 
  const valid = (id) =>{
    setalert2(false)
        async function getconfirm() {
          var url ='https://fullpassapi.azurewebsites.net/api/Qrs/ActulizarQr/'+id;         
          const response = await fetch(url);
          const enviado = await response.json();   
              
          return enviado;
        }
        
        getconfirm().then(enviado => {
          sealalertwelcom(true)
             setjson('')
        });
    
  } 
  const valid2 = (id) =>{
    setalert(false)
    async function getconfirm() {
      var url ='https://fullpassapi.azurewebsites.net/api/Qrs/ActulizarQr/'+id;         
      const response = await fetch(url);
      const enviado = await response.json();   
          
      return enviado;
    }
    
    getconfirm().then(enviado => {
      
      sealalertwelcom(true)
      setjson('')
    });

} 
const onclose=()=>{
  setjson('')
  hideAlert2()
  hideAlert();
 
}

  return (
    <>
    <View style={styles.conte}>   
   
        <QRCodeScanner
        containerStyle={{ paddingTop: 10,backgroundColor: '#000'}}
        onRead={getQr}
        reactivate={true}
        reactivateTimeout={5000}
        permissionDialogMessage="¿Puedo usar tu camara?"
        showMarker={true}
        markerStyle={{borderColor: 'green', borderRadius: 10 ,paddingTop: 60} }   
        topContent={          
          <Text style={styles.tituloqr}>Full-Pass</Text>
        }    
    
        >          
        </QRCodeScanner>   
        </View>


     <AwesomeAlert  
        show={alert1}
        showProgress={true}
        title="CONFIRMAR ENTRADA"
        message={ "Invitado "+json.txtNombre +" de la mesa " + json.intLugar +" Por "+ json.txtNombrec}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="CONFIRMAR"
        cancelText="CANCELAR"
        confirmButtonColor="green"
        cancelButtonColor="red"
        onConfirmPressed={() => {       
          valid(json.lngIdPaseyIdVip);
        }}
        onCancelPressed={() => {
          hideAlert();
        }}
      /> 

      <AwesomeAlert  
        show={alert}
        showProgress={true}
        title="CONFIRMAR ENTRADA"
        message={ "Nombre: " + json.txtNombre}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        showConfirmButton={true}
        confirmText="CONFIRMAR"
        cancelText="CANCELAR"
        confirmButtonColor="green"
        cancelButtonColor="red"
        onConfirmPressed={() => {       
          valid2(json.lngIdPaseyIdVip);
        }}
        onCancelPressed={() => {
          hideAlert2();
        }}
      /> 
     <AwesomeAlert  
        show={alertinfo}
        showProgress={true}
        title="El QR ya no está disponible"
        message={ "........"}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showCancelButton={true}
        cancelText="       OK       "      
        cancelButtonColor="red"       
        onCancelPressed={() => {
          hideAlertinfo();
        }}
      
      /> 

<AwesomeAlert  
        show={alertwelcom}
        showProgress={true}
        title="Bienvenido"
        message={ "QR Confirmado"}
        closeOnTouchOutside={true}
        closeOnHardwareBackPress={false}
        showConfirmButton={true}
        confirmText="CONFIRMAR"      
        confirmButtonColor="green"      
        onConfirmPressed={() => {       
          hideAlertlertwelcom();
        }}
      /> 
      {/* <Modal animationType="slide" transparent={false} visible={modalVisible}>
     
        <ScrollView>
          <Text style={styles.titulo}>Entrada de evento </Text>          
        <TouchableOpacity style={styles.viewcard1}  onPress={() => { onPress2(json.Txt_QR,1,json.evento1) }} disabled={car1}  >          
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
          </TouchableOpacity>
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
      </Modal> */}
   
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

export default Qr;
