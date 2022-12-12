import { db } from './firebaseConfig'
import { ScrollView,similarity,Alert, useEffect,StyleSheet, Text, Modal,View ,TextInput, Pressable, TouchableOpacity, ViewBase} from 'react-native'
import { useState } from 'react'
import { Button } from 'react-native'


const Comment = (props) =>{
    const [modal,setModalVisible] = useState(false)
    const [answer,setAnswer] = useState('')
    const [num,setNum] = useState(1)
    const [correct,setCorrect] = useState(false)
    var stock=0;

    
    //문자 비슷한 정도를 판단 
    console.log(props.correct)
 
    return(
    <View>
   <View>
    <Pressable onPress={()=> Alert.alert(
        `학생이름 : ${props.Name}`,
        `문제번호 : ${props.question_num} \n작성 답안 : ${props.question_answer}`,
        [
          { text: "Close"}
        ]
      )}>
    {/*alert(`문제번호 ${props.question_num} \n정답여부 : ${similarity>0.5?'정답':'오답'}`)*/}
  
    <Text style={{fontWeight: 'bold',fontSize: 15, paddingLeft:20, paddingRight:20, marginBottom:10}}>{props.question_num} : {props.correct?"정답":"오답"}</Text>
    </Pressable>
   </View>
    
   
    
    </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
    
      
        modalText: {
        marginBottom: 15,
        textAlign: "center"
        },
       
      modalView: {
        margin: 20,
        backgroundColor: '(0, 0, 0, 0.5)',
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOpacity: 0.25,
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
    }
});
export default Comment;