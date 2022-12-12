import { View, StyleSheet, TextInput } from 'react-native';
import { useState } from 'react';



const Input = () => {

    const [myTextInput, setMyTextInput] = useState ("")
    const onChangeInput = (event) => {

        console.log("event", event)
        setMyTextInput(event)

    }

    return (

        <View style = {StyleSheet.mainView}>
            <TextInput
            value = {myTextInput}
            style = {styles.Input}
            onChangeText = {onChangeInput}>
            </TextInput>
        </View>

    );

}


const styles = StyleSheet.create({

    Input1 : {

        width : "100%",
        backgroundColor : "#cecece",
        marginTop : 15,
        fontSize : 15,
        padding : 10

    },
    mainView : {

        width : '100%'

    }

})

export default Input;
