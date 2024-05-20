import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const REGISTER = gql`
mutation AddUser($newUser: NewUser) {
  addUser(newUser: $newUser) {
    _id
    credit
    email
    username
  }
}`

export default function Register({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    const [register, { data, loading, error }] = useMutation(REGISTER);

    const handleRegister = async () => {
        try {
            await register({ variables: { newUser: { username, email, password } } });
            Alert.alert("Registration Successful");
            navigation.navigate("Login");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

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

                    <TextInput
                        placeholder='Username'
                        style={styles.textInput}
                        value={username}
                        onChangeText={setUsername}
                    />

                    <TextInput
                        placeholder='Email'
                        style={styles.textInput}
                        value={email}
                        onChangeText={setEmail}
                    />

                    <TextInput
                        placeholder='Password'
                        style={styles.textInput}
                        secureTextEntry={!passwordVisible}
                        value={password}
                        onChangeText={setPassword}
                    />



                    <TouchableHighlight style={styles.button} onPress={handleRegister}>
                        <LinearGradient
                            colors={['#00FF00', '#FFFFFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>REGISTER</Text>
                        </LinearGradient>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate('Login')}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to Login</Text>
                    </TouchableHighlight>

                    <StatusBar style="auto" />
                </View>
            </ImageBackground>
        </>
    );
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
        width: "100%",
        borderRadius: 10,
        marginTop: 20,
        marginBottom: 10,
        overflow: 'hidden',
    },
    gradient: {
        padding: 15,
        alignItems: 'center',
    },
    buttonText: {
        textAlign: "center",
        fontWeight: "400",
        color: "black",
    }
});
