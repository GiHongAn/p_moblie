import { StatusBar } from 'expo-status-bar';
import { ScrollView,similarity, StyleSheet, Text, View ,TextInput,ImageBackground,Image,Dimensions,TouchableOpacity } from 'react-native'
import { useEffect, useState, useSyncExternalStore } from 'react'
import { Button } from 'react-native'
import { Firestore, addDoc,updateDoc, collection, doc, getDocs, docs,query,where } from 'firebase/firestore'
import { db } from './firebaseConfig'
import React from 'react';
import { PieChart } from "react-minimal-pie-chart";
import Comment from './Comment';
import Grademodal from './Grademodal'
import Totalmodal from './Totalmodal';
export default function App() {
   

    const [Name, setName] = useState ('');
    const [users, setUsers] = useState([]);
    const [showModal,setShowModal] = useState(false)
    const [showTotal,setShowtotal]= useState(false)
    const [score,setScore] = useState(0);
    const [visible, setVisible] = useState(false);
    const [name_arr,setName_arr] = useState();
    const [score_arr,setScore_arr] = useState();

   
    useEffect(async()=>{

       
            try{
                let tempNames = []
                let tempScore = []
                const data = await getDocs(collection(db, "student1" ))
                data.docs.map(doc => {
                    console.log("data:", doc.data())
                    tempNames.push(doc.data().studentName)
                    tempScore.push(doc.data().score)
                    console.log("studentName:", doc.data().studentName)
                 
                })
                setName_arr(tempNames)
                setScore_arr(tempScore)
              
              }catch(error){
                console.log(error.message)
              }
       

    },[]);

    
    var simil_Correct= false
    var stu_score = 0;
    var pasNum =0;
    const array=[];
    const array2=[];
    var stringSimilarity = require("string-similarity");
    var arr =["85.75=3.25+7.5*p","11","11","11",
              "16 1/8 miles","5 7/8 miles","16 1/8 + m = 22","5 7/8 miles","5 7/8 miles",
              "64.8 yards","10.8 yards","6m+19.7 = 84.5","10.8 yards","19.7 yards","64.8 yards","10.8 yards",
              "100", " 100","100","Faye","4e + 30 = 114","21","42,51","Faye","84","21","42,51","Faye",
              "8.25m + 34.5 = 84","6 sections","84 inches","6 times","49.5 inches","6 times",
              "4x+24=104","20","100","100","[4w+24]","20","24 inches","20 inches",
              "115","42/7","4 days","25","100","4","25","4",
              "50 feet","100","100","80","80","15","15","50","30","15"]
    var similarity= 0;
    
    const openModal= () =>{
        setShowModal((prev) =>!prev)
    }
    const opentotal= () =>{
        setShowtotal((prev) =>!prev)
    }
  

    var set_score=(event)=>{
        setScore(event)
    }

    ////////
    const addtoDB = async ()=>{
        let docId = ""
        try{
            const q = query(collection(db, "student1"), where('studentName',"==", Name)) //???????????? ???????????? ????????? 
        console.log(q)

        const singleDoc = await getDocs(q); //?????? ???????????? ???????????? ?????? ???????????? ?????????

        singleDoc.forEach((doc)=>{ //?????? ???????????? ???????????? ?????? ????????? ??????? ????????? -> ????????? ????????? ????????? ???????????? ????????? ????????????
          console.log(doc.data().studentName)
          if(doc.data().studentName == Name){
          docId = doc.id //????????? id?????? docId??? ??????
          }
         

        })
        const docRef = doc(db, "student1", docId)
        await updateDoc(docRef, { 
            score:score
          });
          
        }catch(error){
          console.log(error.message)
        }
      }
    ///////////////

    const readfromDB = async ()=>{

        try{
        const q = query(collection(db, "student1"), where('studentName',"==", Name)) //???????????? ???????????? ????????? 
       // console.log(q)
        const data = await getDocs(q)
      //  setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        var first=1,second=1,third=1;
        var search_q = `q${third}_s${second}_${first}`
        var textconut = `q${first}Text`
        const q_num_array=[3,2,2,
                           3,3,2,
                           3,3,4,
                           5,5,5,
                           3,3,3,
                           3,5,3,
                           4,4,3,
                           5,4,4]
        var q_num=0;
        var checker = true //?????????????????? ?????? q*Text????????? ??????????????????
        var loop_q = q_num_array[q_num] //q_num_array[q_num]??? ???????????? ??????????????? ????????? ???????????? ??????
        data.docs.map(doc => {
            let tempDocData =doc.data()
            let scoreSum = 0;
            while(true){
            for (let temp in tempDocData){
                
                if(checker){
                    if(textconut == temp){
                    checker = false
                    //?????? ???????????? ?????????????????? ???????????? ?????? ????????? ????????? ????????? ???????????? ??????
                    array.push(<Text style={{fontWeight: 'bold',fontSize: 20, paddingLeft:20, paddingRight:20,marginTop:15}}> {temp} : {tempDocData[temp]}</Text>)
                    }
                }
                else{
                    if(search_q==temp){
                        //????????????
                        similarity = stringSimilarity.compareTwoStrings(tempDocData[temp], arr[pasNum])
                        
                        if(similarity >= 0.8){
                            scoreSum = scoreSum +1
                          
                            console.log("similarity",similarity)
                            let value1 = true
                            simil_Correct = value1
                            
                        }
                        else{
                            let value1 = false
                            simil_Correct = value1
                        }

                         array.push(<Comment question_num = {temp} question_answer ={tempDocData[temp]} 
                             Name={Name} correct={simil_Correct}/>)
                        pasNum += 1
                        first += 1 //?????? ?????????????????? ????????????
                        search_q = `q${third}_s${second}_${first}`
                        console.log(search_q)
                        break;
                        }
                        
                        if(first == loop_q){ // ???????????? ????????? ????????? ??? ????????? 
                        first = 1 //????????? ?????????
                        second += 1 //????????? +1
                        q_num += 1 //???????????? ????????? ?????????
                        loop_q = q_num_array[q_num] //???????????? ????????? ?????????
                        if(loop_q == undefined)break;
                        search_q = `q${third}_s${second}_${first}`
                        console.log(loop_q)
                        }

                        if(second == 4){ //???????????? ???????????? ??? ????????? 
                        first = 1 //????????? ?????????
                        second = 1 //????????? ?????????
                        third += 1 //?????? ???????????? ????????????
                        checker = true //text??? ??????????????? ??????
                        search_q = `q${third}_s${second}_${first}`
                        textconut = `q${third}Text`
                        }
                }

            }
            setScore(scoreSum)
            console.log("scoreSum",scoreSum)
            if(third == 9)
                break;
        }
           
        })
        //console.log(JSON.stringify(array))
        setUsers(array)
        addtoDB()
    }catch(error){
          console.log(error.message)
        }

    }
    const onPress2 = () => {
        setVisible(true);
      };
    
    return (
        <>
        <View
        
            style={styles.view1}>
            <Text
                style={styles.text}></Text>

                <Text>Guess What</Text>
            <Text
                style={styles.text2}>Please type student ID</Text>
            <TextInput
           style = {styles.input}
           value={Name}
           onChangeText = {(text) => setName(text)}
           multiline = {true}   
            ></TextInput> 


            <TouchableOpacity
            style = {{borderWidth : 0,
            borderColor : 'rgba(0,0,0,0,2)',
            alignItems : 'center',
            justifyContent : 'center',
            width : 88,
            height : 39,
            backgroundColor : '#DDDDFF',
            borderRadius : 15}}
            onPress={() => {readfromDB(), onPress2()}}
            >
                <Text>Search</Text>
            </TouchableOpacity>

        </View>
        
               
        <View style={styles.view5}>

                <ScrollView> 
                   {users?users:null}
                </ScrollView>
                
            </View>
            <View style={{flex: 1, flexDirection: 'row',paddingLeft:35}} >
            <TouchableOpacity
            visible={visible}
            style = {styles.grade_btstyle}
            onPress={()=> {openModal()}}
            >
                 <Text>????????????</Text>
            <Grademodal name={Name} showModal={showModal} setShowModal={setShowModal} score = {score}></Grademodal> 
            </TouchableOpacity>
                <Text style={{paddingLeft:20}} />
            <TouchableOpacity
            visible={visible}
            style = {styles.total_btstyle}
            onPress={()=> {opentotal()}}
            >
            <Text>??? ??????</Text>
            <Totalmodal showTotal={showTotal} setShowtotal={setShowtotal} name_arr={name_arr} score_arr = {score_arr} ></Totalmodal>
            </TouchableOpacity>
            </View>
        </>

    );
    
   
}

const styles = StyleSheet.create({

    grade_btstyle:{
            borderWidth : 0,
            borderColor : 'rgba(0,0,0,0,2)',
            alignItems : 'center',
            justifyContent : 'center',
            width : 140,
            height : 39,
            backgroundColor : '#DDDDFF',
            borderRadius : 15
    },
    total_btstyle:{
            borderWidth : 0,
            borderColor : 'rgba(0,0,0,0,2)',
            alignItems : 'center',
            justifyContent : 'center',
            width : 140,
            height : 39,
            backgroundColor : '#DDDDFF',
            borderRadius : 15
    },

    question:{
    marginLeft : 30,
    fontSize : 20

    },

    input: {
        width: '50%',
        height: '10%',
        backgroundColor: "#cecece",
        marginTop:10,
        fontSize: 10,
        padding:10,
        marginBottom: 10,
        
    
      },
    view1 : {

        backgroundColor : 'skyblue',
        flexDirection : 'column',
        //flex : 1,
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
        marginTop : 10,
        flex : 2

    },

    text : {

        fontSize : 40,
        fontWeight : 'bold',
        color : "black",
        marginTop : 0
        
    },

    text2 : {

        fontSize : 30,
        fontWeight : 'bold',
        color : "black",
        marginTop : 10

    }
})