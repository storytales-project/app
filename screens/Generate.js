import React, { useState } from "react";
import { ImageBackground, StatusBar, StyleSheet, Text, TextInput, TouchableHighlight, View, Alert, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import { gql, useMutation } from "@apollo/client";
import RNPickerSelect from 'react-native-picker-select';

const GENERATE = gql`
mutation AddStory($newStory: NewStory!) {
    addStory(newStory: $newStory) {
        _id
        userId
    }
}
`;

export default function Generate({ navigation }) {
    const [character, setCharacter] = useState("");
    const [theme, setTheme] = useState("");
    const [mood, setMood] = useState("");
    const [title, setTitle] = useState("");
    const [language, setLanguage] = useState("");

    const [generate, { loading, error }] = useMutation(GENERATE);

    const placeholderMood = {
        label: 'Select a Mood...',
        value: null,
    };

    const optionsMood = [
        { label: 'Fun', value: 'Fun' },
        { label: 'Happy', value: 'Happy' },
        { label: 'Thrilling', value: 'Thrilling' },
        { label: 'Sad', value: 'Sad' },
    ];

    const placeholderLanguage = {
        label: 'Select a Language...',
        value: null,
    };

    const optionsLanguage = [
        { label: 'Indonesian', value: 'Indonesian' },
        { label: 'English', value: 'English' },
        { label: 'Japanese', value: 'Japanese' },
        { label: 'Korean', value: 'Korean' },
    ];

    const handleGenerate = async () => {
        try {
            await generate({ variables: { newStory: { character, title, mood, theme, language } } });
            navigation.navigate('Chapter');
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
        <ImageBackground source={require("../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg")} style={styles.backgroundImage}>
            <View style={styles.container}>
                <Text style={styles.label}>What story would you like to hear tonight?</Text>
                <TextInput
                    placeholder="Story Theme"
                    style={styles.textInput}
                    value={theme}
                    onChangeText={setTheme}
                />

                <TextInput
                    placeholder="Main Character"
                    style={styles.textInput}
                    value={character}
                    onChangeText={setCharacter}
                />

                <TextInput
                    placeholder="Story Title"
                    style={styles.textInput}
                    value={title}
                    onChangeText={setTitle}
                />

                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={placeholderMood}
                        items={optionsMood}
                        onValueChange={setMood}
                        value={mood}
                    />
                </View>

                <View style={styles.pickerContainer}>
                    <RNPickerSelect
                        style={pickerSelectStyles}
                        placeholder={placeholderLanguage}
                        items={optionsLanguage}
                        onValueChange={setLanguage}
                        value={language}
                    />
                </View>
                
                <TouchableHighlight style={styles.button} onPress={handleGenerate}>
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
        marginBottom: 30,
        marginTop: 20,
        textAlign: "center",
    },
    textInput: {
        width: "100%",
        borderColor: "white",
        margin: 10,
        padding: 15,
        borderWidth: 1,
        borderRadius: 20,
        backgroundColor: "white",
        color: "black",
    },
    pickerContainer: {
        width: '100%',
        borderRadius: 20,
        overflow: 'hidden',
        marginVertical: 10,
        
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

const pickerSelectStyles = StyleSheet.create({
    inputIOS: {
        width: "100%",
        borderColor: "white",
        padding: 15,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: "white",
        color: "black",
    },
    inputAndroid: {
        width: "100%",
        borderColor: "white",
        padding : 30,
        borderWidth: 1,
        borderRadius: 30,
        backgroundColor: "white",
        color: "black",
    },
});
