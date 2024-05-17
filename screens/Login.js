import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import AuthContext from "../context/Auth";


const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        accessToken
    }
}`


export default function Login({ navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    // const { setIsSignedIn } = useContext(AuthContext)
    const [passwordVisible, setPasswordVisible] = useState(false)

    // const [login, { data, loading, errpr }] = useMutation(LOGIN, {
    //     onCompleted: async (data) => {
    //         await SecureStore.setItemAsync("accessToken", data?.login.accessToken)
    //         setIsSignedIn(true)
    //     }
    // })

    // const handleLogin = async () => {
    //     try {
    //         await login({
    //             variables: { email, password }
    //         })
    //         Alert.alert("Successfully Login")
    //         navigation.navigate("PlayStory")
    //     } catch (error) {
    //         Alert.alert("Error", error.message)
    //     }
    // }

    // if (loading) {
    //     return (
    //         <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
    //             <ActivityIndicator size="large" />
    //         </View>
    //     );
    // }


    return (
        <>


            <ImageBackground source={require("../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg")} style={{ width: '100%', height: '100%' }}>

                <View style={styles.container}>

                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: "https://assets.tumblr.com/images/logo_page/1x/wordmark-white.png?_v=8cec4be4e8da5d4c0d64ca5c0643f655"
                        }}
                    />

                    <TextInput placeholder='Username..' style={styles.textInput} />

                    <TextInput placeholder='Password..' style={styles.textInput} secureTextEntry={!passwordVisible} />


                    <TouchableHighlight style={styles.button} >
                        <Text style={{ textAlign: "center", fontWeight: "400" }}>LOGIN</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={{}} onPress={() => navigation.navigate('Register')}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to Register..</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={{ margin: 20 }} onPress={() => navigation.navigate('PlayStory')}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to PlayStory..</Text>
                    </TouchableHighlight>

                    <StatusBar style="auto" />
                </View>
            </ImageBackground>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 50,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
        color: "white"
    },
    tinyLogo: {
        width: 350,
        height: 200,
    },
    textInput: {
        width: "100%",
        borderColor: "white",
        margin: 8,
        padding: 20,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "white",
    },
    button: {
        padding: 15,
        borderColor: "black",
        backgroundColor: "#A020F0",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        width: "100%",
    }
});