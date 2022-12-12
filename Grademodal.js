import { db } from './firebaseConfig'
import { ScrollView,similarity,Alert, useEffect,StyleSheet, Text, Modal,View ,TextInput, Pressable, TouchableOpacity, ViewBase} from 'react-native'
import { useState } from 'react'
import { Button } from 'react-native'
import { PieChart } from "react-minimal-pie-chart";

const Grademodal = (props) =>{
    console.log(props.score)

    

    return(
    <>
    {props.showModal?(
      <View  style={styles.centeredView}>
      <Modal
      animationType="slide"
      transparent={true} 
      visible={props.showModal}>
  
       <View style={styles.centeredView}> 
            <View style={styles.modalView}>
            <Text style={styles.modalText}>학생이름 : {props.name}</Text>
      <Text style={styles.modal_subText}>{`총문제 : 60  \n맞은문제 : ${props.score}`}</Text>
        <Text style={styles.modal_subText}>{props.score>10?"합격입니다.":"불합격입니다"}</Text>
            <Text></Text>
            
            <Pressable
               style={[styles.button, styles.buttonClose]}
                onPress={() => props.setShowModal(!props.showModal)}
              >
                <Text style={styles.textStyle}>Close</Text>
              </Pressable>
            </View>
            
            </View>
            
        </Modal>
        </View>
    ): null}
      
      </>
    )
    
      

}

const styles = StyleSheet.create({
  modalText: {
    borderRadiu: 20,
    fontSize: 20,
    marginTop: 0,
    textAlign: "center"
  },
  modal_subText: {
    borderRadiu: 20,
    fontSize: 15,
    marginTop: 0,
    textAlign: "center"
  },

  scl :{
    margin:1
  },
  centeredView: {
    flex:0.9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
      button: {
        
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
       
      modalView: {
        margin: 10,
        backgroundColor: '#B0E8F1',
        borderRadius: 30,
        padding: 70,
        paddingBottom : 50,

        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.5,
        shadowOffset: {
          width: 0,
          height: 2
        }
    },
    
    input: {
        width: '50%',
        height: '10%',
        backgroundColor: "#cecece",
        marginTop:20,
        fontSize: 10,
        padding:10,
        marginBottom: 10,
        
    
      },
    view1 : {

        backgroundColor : 'yellow',
        flexDirection : 'column',
        flex : 0.5,
        marginTop : 50,
        alignItems : 'center',
        justifyContent : 'center',
        width : '100%'

    },

    view2 : {

        backgroundColor : 'white',
        marginTop : 50,
        width : '70%'

    },

    view3 : {

        backgroundColor : 'green',
        marginBottom : 10

    },

    view4 : {

        backgroundColor : 'white',
        flex : 2,
        marginTop : 0,
        alignItems : 'center'

    },

    view5 : {

        Witdth: '100%',
        marginTop : 50

    },

    text : {

        fontSize : 40,
        fontWeight : 'bold',
        color : "black",
        marginTop : -90
        
    },

    text2 : {

        fontSize : 30,
        fontWeight : 'bold',
        color : "black",
        marginTop : 0
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    }
   
});

export default Grademodal;
