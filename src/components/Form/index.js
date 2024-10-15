import React, {useState} from "react";
import { View, Text, TextInput, TouchableOpacity, Vibration, Pressable, Keyboard } from "react-native";
import ResultImc from "./ResultImc";
import styles from "./style";


export default function Form(props){
    const [height, setHeigth] = useState(null);
    const [weight, setWeight] = useState(null);
    const [messageImc, setMessageImc] = useState("Preencha peso e altura");
    const [imc, setImc] = useState(null);
    const [textButton, setTextButton] = useState("Calcular");
    const [errorMessage, setErroMessage] = useState(null);

function imcCalculator(){
    let heightFormat = height.replace(',', '.')
    let weightFormat = weight.replace(',', '.')
    return setImc((weightFormat/(heightFormat*heightFormat)).toFixed(2))
}

function validationImc(){
    if(weight != null && height !=null){
        imcCalculator()
        setHeigth(null)
        setWeight(null)
        setMessageImc("Seu IMC é igual:")
        setTextButton("Calcular Novamente")
        setErroMessage(null)
        return
    }
    setImc(null)
    setTextButton("Calcular")
    setMessageImc("Preencha peso e altura")
    Vibration.vibrate()
    setErroMessage('Campo Obrigatório*')

}

    return(
        <Pressable
          onPress={Keyboard.dismiss}
          style={styles.formContext}>
            <View style={styles.form}>
                <Text style={styles.formLabel}>Altura</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setHeigth}
                value={height}
                placeholder="Ex. 1.75"
                keyboardType="numeric"
                />

                <Text style={styles.formLabel}>Peso</Text>
                <Text style={styles.errorMessage}>{errorMessage}</Text>
                <TextInput
                style={styles.input}
                onChangeText={setWeight}
                value={weight}
                placeholder="Ex. 75.365"
                keyboardType="numeric"
                />
                
                <TouchableOpacity
                style={styles.buttonCalculator}
                onPress={() => {validationImc()}}>
                    <Text style={styles.textButtonCalculator}>{textButton}</Text>
                </TouchableOpacity>
            </View>
            
            <ResultImc messageResultImc={messageImc} resultImc={imc}/>
        </Pressable>
    );
}