import { db } from './firebaseConfig'
import { ScrollView,similarity,Alert,Dimensions, useEffect,StyleSheet, Text, Modal,View ,TextInput, Pressable, TouchableOpacity, ViewBase} from 'react-native'
import { useState } from 'react'
import { Button } from 'react-native'
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart
  } from "react-native-chart-kit";
import { Firestore,readfromDB, addDoc,updateDoc, collection, doc, getDocs, docs,query,where } from 'firebase/firestore'
const Totalmodal = (props) =>{
  
    var name_arr= props.name_arr
    var score_arr= props.score_arr
   
    
    const [users, setUsers] = useState();

    const total=(list)=>{
      let sum=0;
      for(let i=0; i<list.length; i++){
        sum +=list[i]
      }
      
      return(Math.round(sum/list.length))

    }
    return(
    <>
    {props.showTotal?(
      <View  style={styles.centeredView}>
      <Modal
      animationType="slide"
      transparent={true} 
      visible={props.showTotal}>
  
          <View style={styles.centeredView}> 
            <View style={styles.modalView}>
            <Text style={styles.modalText}>반 점수</Text>
            <View>
        <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator = {true}
                onMomentumScrollEnd ={
                    () => {console.log('Scrolling is End')}
                }
            style={styles.sclv}
            >
        <LineChart
          data={{
            labels: [...name_arr],
            datasets: [
              {
                data: [...score_arr]
              }
            ]
          }}
          width={Dimensions.get("window").width-10} // from react-native
          height={300}
          yAxisLabel=""
          yAxisSuffix="점"
          yAxisInterval={1} // optional, defaults to 1
          chartConfig={{
            backgroundColor: "#e26a00",
            backgroundGradientFrom: "#fb8c00",
            backgroundGradientTo: "#ffa726",
            decimalPlaces: 2, // optional, defaults to 2dp
            color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
            style: {
              borderRadius: 16
            },
            propsForDots: {
              r: "6",
              strokeWidth: "2",
              stroke: "#ffa726"
            }
          }}
          bezier
          style={{
            marginVertical: 8,
            borderRadius: 16
          }}
        />
        </ScrollView>
          
      </View>
            <Text style={styles.modalText}>
              반 평균 : {total(score_arr)}점
            </Text>
            <Pressable
               style={[styles.button, styles.buttonClose]}
                onPress={() => props.setShowtotal(!props.showTotal)}
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
  centeredView: {
    flex:0.9,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 135,
    marginBottom:200
  },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
      },
      buttonOpen: {
        backgroundColor: "#F194FF",
      },
      sclv:{
        marginBottom:0,
        paddingBottom:320
      },
       
      modalView: {
        margin: 20,
        backgroundColor: '#B0E8F1',
        borderRadius: 30,
        padding: 20,
        paddingBottom : 400,

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
    },
    modalText: {
      fontSize :20,
      marginTop: 10,
      marginBottom: 20,
      textAlign: "center"
    }
});

export default Totalmodal;
