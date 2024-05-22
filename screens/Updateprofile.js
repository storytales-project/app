
import { useState } from "react";
import { ActivityIndicator, Alert, Image, ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, TouchableOpacity, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useMutation } from "@apollo/client";


const UPDATE_PROFILE = gql`
mutation UpdateProfile($profile: NewUser) {
  updateProfile(profile: $profile)
}`



export default function UpdateProfile({ navigation, route }) {

    const { profile } = route.params

    const [username, setUsername] = useState(profile.username);
    const [email, setEmail] = useState(profile.email);
    const [imageUrl, setimageUrl] = useState(profile.imageUrl);
    const [updateProfile] = useMutation(UPDATE_PROFILE)

    const handleUpdateProfile = async () => {
        try {
            const result = await updateProfile({ variables: { profile: { username: username, email: email, imageUrl: imageUrl } } })
            // throw new Error(email)
            console.log(result, "<<<<<<<<<<<<<<<<");
            navigation.navigate("Profile")

        } catch (error) {
            throw error
        }
    }

    return (
        <>
            <ImageBackground source={require("../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg")} style={{ width: '100%', height: '100%' }}>
                <View style={styles.container}>
                    <Image
                        style={styles.tinyLogo}
                        source={
                            require("../assets/1-removebg-preview.png")
                        }
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
                        placeholder='imageUrl'
                        style={styles.textInput}
                        value={imageUrl}
                        onChangeText={setimageUrl}
                    />



                    <TouchableHighlight style={styles.button} onPress={handleUpdateProfile}>
                        <LinearGradient
                            colors={['#00FF00', '#FFFFFF']}
                            start={{ x: 0, y: 0 }}
                            end={{ x: 1, y: 1 }}
                            style={styles.gradient}
                        >
                            <Text style={styles.buttonText}>UpdateProfile</Text>
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
        width: 100,
        height: 100,
        marginBottom: 20,
        marginTop: 50
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
