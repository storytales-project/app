import { useContext, useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { gql, useMutation } from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { LinearGradient } from 'expo-linear-gradient';
import AuthContext from "../context/Auth";

const LOGIN = gql`
mutation Mutation($email: String!, $password: String!) {
    login(email: $email, password: $password) {
        accessToken
    }
}`

export default function Login({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordVisible, setPasswordVisible] = useState(false);

    // const { setIsSignedIn } = useContext(AuthContext);

    // const [login, { data, loading, error }] = useMutation(LOGIN, {
    //     onCompleted: async (data) => {
    //         await SecureStore.setItemAsync("accessToken", data?.login.accessToken);
    //         setIsSignedIn(true);
    //     }
    // });

    // const handleLogin = async () => {
    //     try {
    //         await login({ variables: { email, password } });
    //         Alert.alert("Successfully Logged In");
    //         navigation.navigate("PlayStory");
    //     } catch (error) {
    //         Alert.alert("Error", error.message);
    //     }
    // };

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



                    <TouchableHighlight style={styles.button}>
                        {/* <TouchableHighlight style={styles.button} onPress={handleLogin}> */}
                        <LinearGradient
                            colors={['#00FF00', '#FFFFFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>LOGIN</Text>
                        </LinearGradient>
                    </TouchableHighlight>

                    <TouchableHighlight onPress={() => navigation.navigate('Register')}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to Register</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={{ margin: 20 }} onPress={() => navigation.navigate('TabBottom', { screen: 'PlayStory' })}>
                        <Text style={{ textAlign: "center", color: "white" }}>Go to PlayStory</Text>
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
        backgroundColor: "white",
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
