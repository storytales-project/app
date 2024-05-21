


import React, { useEffect, useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet, Alert, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import ImageViewer from '../components/ImageViewer';

const PlayStory = ({ route, navigation }) => {
    const [playState, setPlayState] = useState('paused');
    const [playSeconds, setPlaySeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sound, setSound] = useState(null);
    const [backsound, setBacksound] = useState(null);
    const [sliderEditing, setSliderEditing] = useState(false);
    const [durationMillis, setDurationMillis] = useState(0);
    const [counter, setCounter] = useState(0);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const windowWidth = Dimensions.get("window").width;




    const onPlayStory = async () => {
        if (!sound) {
            await play();
        } else {
            if (playState === 'paused') {
                console.log("playing music");
                await sound.playAsync();
                console.log(sound._lastStatusUpdate);
                await backsound.playAsync();
                setPlayState('playing');
            } else {
                console.log("pause music");
                await sound.pauseAsync();
                await backsound.pauseAsync();
                setPlayState('paused');
            }
        }
    };

    const { page, mood, title, image } = route.params;

    // console.log(mood, title, image);

    const onSaveImageAsync = async () => {
        // Implement this function
    };

    let backsoundOption;
    if (mood === "Happy") {
        backsoundOption = {
            uri: "https://ik.imagekit.io/yehezkielt/Swans%20In%20Flight%20-%20Asher%20Fulero.mp3?updatedAt=1716263600233",
            shouldPlay: true,
            volume: 0.1
        };
    } else if (mood === "Fun") {
        backsoundOption = {
            uri: "https://ik.imagekit.io/yehezkielt/No.9_Esther_s%20Waltz%20-%20Esther%20Abrami.mp3?updatedAt=1716262251733",
            shouldPlay: true,
            volume: 0.1
        };
    } else if (mood === "Sad") {
        backsoundOption = {
            uri: "https://ik.imagekit.io/yehezkielt/Wistful%20Harp%20-%20Andrew%20Huang.mp3?updatedAt=1716262255299",
            shouldPlay: true,
            volume: 0.2
        };
    } else if (mood === "Thriller") {
        backsoundOption = {
            uri: "https://ik.imagekit.io/yehezkielt/Bourree%20-%20Joel%20Cummins.mp3?updatedAt=1716262399068",
            shouldPlay: true,
            volume: 0.1
        };
    }

    // console.log(mood);
    // console.log(backsoundOption.uri);
    // console.log(backsoundOption.volume);



    const play = async () => {
        try {
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                { uri: page?.audio },
                { shouldPlay: true },
                (status) => setDurationMillis(status.durationMillis)
            );
            // console.log("-----", sound);
            const { sound: playbackBacksound } = await Audio.Sound.createAsync(
                { uri: backsoundOption.uri },
                { shouldPlay: true, volume: backsoundOption.volume }
            );

            setSound(playbackObject);
            setBacksound(playbackBacksound);

            // playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            // playbackBacksound.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);

            setPlayState('playing');
        } catch (error) {
            console.error('Error loading sound:', error);
            Alert.alert('Notice', 'Error loading audio file.');
            setPlayState('paused');
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        // console.log(status, "---------------------------");
        if (status.didJustFinish) {
            setPlayState('paused');
            setPlaySeconds(0);
            backsound.stopAsync();
        } else {
            setPlaySeconds(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
        }
    };

    const onReset = async () => {
        if (sound) {
            backsound.stopAsync()
            sound.stopAsync();
            setPlayState('paused');
            setPlaySeconds(0);
            await sound.setPositionAsync(0);
            await backsound.setPositionAsync(0);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer
                    placeholderImageSource={{ uri: image }}

                />
                <Text style={styles.title}>{title}</Text>
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                    <IconButton icon="refresh" label="Reset" onPress={onReset} />
                    <CircleButton onPress={onPlayStory} playState={playState} />
                    <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                </View>
            </View>
            {/* Slider and other UI components */}
            <StatusBar style="auto" />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#25292e',
        alignItems: 'center',
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: 'center',
    },
    optionsContainer: {
        position: "absolute",
        bottom: 80,
    },
    optionsRow: {
        alignItems: 'center',
        flexDirection: 'row',
    },
    title: {
        alignItems: 'center',
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontSize: 18
    },
});

export default PlayStory;

