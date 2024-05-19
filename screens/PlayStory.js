import React, { useState } from 'react';
import { View, Text, TouchableHighlight, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Audio } from 'expo-av';

import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import ImageViewer from '../components/ImageViewer';

const PlayStory = ({ navigation }) => {
    const [playState, setPlayState] = useState('paused'); // playing, paused
    const [playSeconds, setPlaySeconds] = useState(0);
    const [duration, setDuration] = useState(0);
    const [sound, setSound] = useState(null);
    const [sliderEditing, setSliderEditing] = useState(false);

    const onPlayStory = async () => {
        if (!sound) {
            await play();
        } else {
            if (playState === 'paused') {
                await sound.playAsync();
                setPlayState('playing');
            } else {
                await sound.pauseAsync();
                setPlayState('paused');
            }
        }
    };

    const onSaveImageAsync = async () => {
        // Implement this function
    };

    const play = async () => {
        try {
            const { sound: playbackObject } = await Audio.Sound.createAsync(
                { uri: "https://res.cloudinary.com/dp9n1icsc/video/upload/v1715833322/dlrmny8n73d9ws06l8h8.mp3" },
                { shouldPlay: true }
            );

            setSound(playbackObject);
            playbackObject.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
            setPlayState('playing');
        } catch (error) {
            console.error('Error loading sound:', error);
            Alert.alert('Notice', 'Error loading audio file.');
            setPlayState('paused');
        }
    };

    const onPlaybackStatusUpdate = (status) => {
        if (status.didJustFinish) {
            setPlayState('paused');
            setPlaySeconds(0);
        } else {
            setPlaySeconds(status.positionMillis / 1000);
            setDuration(status.durationMillis / 1000);
        }
    };

    const onReset = () => {
        if (sound) {
            sound.stopAsync();
            setPlayState('paused');
            setPlaySeconds(0);
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer
                    placeholderImageSource={{ uri: "https://res.cloudinary.com/dp9n1icsc/image/upload/v1715843207/yni66ij3xmtwz0mu6uyh.png" }}
                />
            </View>
            <View style={styles.optionsContainer}>
                <View style={styles.optionsRow}>
                    <IconButton icon="refresh" label="Reset" onPress={onReset} />
                    <CircleButton onPress={onPlayStory} playState={playState} />
                    <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                </View>
            </View>
            <TouchableHighlight style={{}} onPress={() => navigation.navigate('Register')}>
                <Text style={{ textAlign: "center", color: "white" }}>Go to Register..</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{}} onPress={() => navigation.navigate('Profile')}>
                <Text style={{ textAlign: "center", color: "white" }}>Go to profile..</Text>
            </TouchableHighlight>
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
});

export default PlayStory;
