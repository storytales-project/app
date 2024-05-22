import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Alert, Animated, Dimensions, LogBox, TouchableHighlight, TouchableOpacity, } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';
import BottomSheet from "../components/BottomSheet";


import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import ImageViewer from '../components/ImageViewer';

const PlayStory = ({ route }) => {
    const [playState, setPlayState] = useState('paused');
    const [sound, setSound] = useState(null);
    const [backsound, setBacksound] = useState(null);
    const [durationMillis, setDurationMillis] = useState(0);
    const [counter, setCounter] = useState(0);
    const [progress, setProgress] = useState(new Animated.Value(0));
    const [status, setStatus] = useState(false);
    const windowWidth = Dimensions.get('window').width;

    const { page, mood, title, image } = route.params;

    useEffect(() => {
        LogBox.ignoreLogs(['Animated: `useNativeDriver`']);
    }, []);

    useEffect(() => {
        let animation = null;

        const startAnimation = () => {
            animation = Animated.timing(progress, {
                toValue: windowWidth - 70,
                duration: durationMillis,
                useNativeDriver: false,
            });
            animation.start();
        };

        const stopAnimation = () => {
            if (animation) {
                animation.stop();
            }
        };

        if (durationMillis && playState === 'playing') {
            startAnimation();

            let tempCount = counter;
            const countInterval = setInterval(() => {
                setCounter((prev) => prev + 1);
                tempCount += 1;

                if (tempCount >= durationMillis / 1000) {
                    setCounter(0);
                    setPlayState('paused');
                    clearInterval(countInterval);

                    // Stop both sound and backsound when story finishes
                    stopSounds();
                }
            }, 1000);

            return () => {
                clearInterval(countInterval);
                stopAnimation();
            };
        } else {
            stopAnimation();
        }
    }, [durationMillis, playState]);

    const onPlayStory = async () => {
        if (!sound) {
            await loadSounds();
        } else {
            if (playState === "paused") {
                await sound.playAsync();
                await backsound.playAsync();
                setPlayState("playing");
            } else {
                await sound.pauseAsync();
                await backsound.pauseAsync();
                setPlayState("paused");
            }
        }
    };

    const { page, mood, title, image, pages, storyId } = route.params;

    // console.log(mood, title, image);

    const onSaveImageAsync = async () => {
        // Implement this function
    };

    const backsoundOption = {
        Happy: {
            uri: 'https://ik.imagekit.io/yehezkielt/Swans%20In%20Flight%20-%20Asher%20Fulero.mp3?updatedAt=1716263600233',
            shouldPlay: true,
            volume: 0.1,
        },
        Fun: {
            uri: 'https://ik.imagekit.io/yehezkielt/No.9_Esther_s%20Waltz%20-%20Esther%20Abrami.mp3?updatedAt=1716262251733',
            shouldPlay: true,
            volume: 0.1,
        },
        Sad: {
            uri: 'https://ik.imagekit.io/yehezkielt/Wistful%20Harp%20-%20Andrew%20Huang.mp3?updatedAt=1716262255299',
            shouldPlay: true,
            volume: 0.2,
        },
        Thriller: {
            uri: 'https://ik.imagekit.io/yehezkielt/Bourree%20-%20Joel%20Cummins.mp3?updatedAt=1716262399068',
            shouldPlay: true,
            volume: 0.1,
        },
    }[mood];

    const loadSounds = async () => {
        try {
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                { uri: page?.audio },
                { shouldPlay: true },
                (status) => setDurationMillis(status.durationMillis)
            );
            const { sound: playbackBacksound } = await Audio.Sound.createAsync(
                { uri: backsoundOption.uri },
                { shouldPlay: true, volume: backsoundOption.volume }
            );

            setSound(playbackObject);
            setBacksound(playbackBacksound);
            setPlayState('playing');
        } catch (error) {
            Alert.alert('Notice', 'Error loading audio file.');
            setPlayState('paused');
        }
    };

    const onReset = async () => {
        if (sound) {
            await sound.stopAsync();
            await backsound.stopAsync();
            setPlayState('paused');
            setCounter(0);
            setProgress(new Animated.Value(0));
            await sound.setPositionAsync(0);
        }
    };

    const stopSounds = async () => {
        if (sound) {
            backsound.stopAsync();
            sound.stopAsync();
            setPlayState("paused");
            setPlaySeconds(0);
            await sound.setPositionAsync(0);
            await backsound.setPositionAsync(0);
            await sound.stopAsync();
        }
        if (backsound) {
            await backsound.stopAsync();
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer placeholderImageSource={{ uri: image }} />
                <Text style={styles.title}>{title}</Text>
                {/* <View style={styles.progressContainer}> */}
                {/* <Text style={styles.counter}>Counter: {counter}</Text> */}
                <Animated.View style={[styles.progressBar, { width: progress }]} />
                {/* </View> */}
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                    <IconButton
                        icon="refresh"
                        label="Reset"
                        onPress={onReset}
                    />
                    <CircleButton onPress={onPlayStory} playState={playState} />
                    <IconButton
                        icon="save-alt"
                        label="Save"
                        onPress={onSaveImageAsync}
                    />
                </View>
            </View>
            {pages.length < 3 && (
                <View>
                    <TouchableOpacity
                        onPress={() => {
                            setStatus(true);
                        }}
                    >
                        <View
                            style={{
                                backgroundColor: "white",
                                padding: 4,
                                paddingHorizontal: 10,
                                borderRadius: 9,
                            }}
                        >
                            <Text style={{ fontWeight: "bold" }}>Continue</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            )}

            {status && <BottomSheet setStatus={setStatus} storyId={storyId} navigation={navigation} />}
            {/* Slider and other UI components */}
            {/* <StatusBar style="auto" /> */}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#25292e",
        paddingBottom: 10,
        alignItems: "center",
    },
    imageContainer: {
        flex: 1,
        paddingTop: 58,
    },
    footerContainer: {
        flex: 1 / 3,
        alignItems: "center",
    },
    optionsContainer: {
        position: 'absolute',
        bottom: 80,
    },
    optionsRow: {
        alignItems: "center",
        flexDirection: "row",
    },
    title: {
        alignItems: "center",
        color: "white",
        textAlign: "center",
        marginTop: 15,
        fontSize: 18,
    },
    progressContainer: {
        position: 'absolute',
        bottom: 40,
        width: '70%',
    },
    counter: {
        color: 'white',
        textAlign: 'center',
        marginBottom: 10,
    },
    progressBar: {
        height: 10,
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default PlayStory;
