import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";


const REGISTER = gql`
mutation Register(
    $username: String!
    $email: String!
    $password: String!
) {
    register(
        username : $$username 
        email : $$email 
        password : $$password
        ) {
            _id
            username
            email
            password
        }
}`


export default function Register({ navigation }) {
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordVisible, setPasswordVisible] = useState(false)

    const [register, { data, loading, error }] = useMutation(REGISTER)

    const handleRegister = async () => {
        try {
            await register({
                variables: {
                    username,
                    email,
                    password,
                }
            })
            Alert.alert("Registration Success")
            navigation.navigate("Login")
        } catch (error) {
            Alert.alert("Error", error.message)
        }
    }

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator
                    size="large" />
            </View>
        );
    }


    return (
        <>


            <ImageBackground source={require("../assets/background.png")} style={{ width: '100%', height: '100%' }}>

                <View style={styles.container}>

                    <Image
                        style={styles.tinyLogo}
                        source={{
                            uri: "https://assets.tumblr.com/images/logo_page/1x/wordmark-white.png?_v=8cec4be4e8da5d4c0d64ca5c0643f655"
                        }}
                    />


                    <TextInput placeholder='Username..' style={styles.textInput} />


                    {/* <TextInput placeholder='Name..' style={styles.textInput} /> */}


                    <TextInput placeholder='Email..' style={styles.textInput} />


                    <TextInput placeholder='Password..' style={styles.textInput} />


                    <TouchableHighlight style={styles.button} >
                        <Text style={{ textAlign: "center", fontWeight: "400" }}>REGISTER</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={{}} onPress={() => navigation.navigate('Login')}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to Login..</Text>
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
        color: "black",
        backgroundColor: "white"
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