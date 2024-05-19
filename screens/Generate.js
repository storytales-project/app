import { useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

export default function Generate({ navigation }) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    return (
        <ImageBackground source={require("../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.label}>What story would you like to hear tonight?</Text>
                <TextInput
                    placeholder="Story Theme"
                    style={styles.textInput}
                    value={username}
                    onChangeText={setUsername}
                />
                <Text style={styles.label}>What's the mood of the story?</Text>
                <TextInput
                    placeholder="Mood"
                    style={styles.textInput}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>What's the name of the main story character?</Text>
                <TextInput
                    placeholder="Main character"
                    style={styles.textInput}
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableHighlight style={styles.button}>
                    <LinearGradient
                        colors={['#00FF00', '#FFFFFF']}
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        style={styles.gradient}
                    >
                        <Text style={styles.buttonText}>Generate Story</Text>
                    </LinearGradient>
                </TouchableHighlight>

                <StatusBar style="auto" />
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        padding: 20,
    },
    label: {
        color: "yellow",
        fontSize: 20,
        marginBottom: 10,
        marginTop: 20,
        // textAlign: "center",
        textAlign: "justify",
    },
    textInput: {
        width: "100%",
        borderColor: "white",
        margin: 8,
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "white",
        color: "black",
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
    },
    linkText: {
        textAlign: "center",
        color: "white",
        marginTop: 10,
    },
});

