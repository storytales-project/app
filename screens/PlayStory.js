import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, TouchableHighlight, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

import ImageViewer from '../components/ImageViewer';
import CircleButton from '../components/CircleButton';
import IconButton from '../components/IconButton';
import Button from '../components/Button';

const PlaceholderImage = require('../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg');
export default function PlayStory({ navigation }) {
    const [showAppOptions, setShowAppOptions] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const pickImageAsync = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            quality: 1,
        });
        if (!result.canceled) {
            setSelectedImage(result.assets[0].uri);
            setShowAppOptions(true);
        } else {
            alert("You did not select any image.");
        }
    };

    const onReset = () => {
        setShowAppOptions(false);
    };

    const onAddSticker = () => {
        // we will implement this later
    };

    const onSaveImageAsync = async () => {
        // we will implement this later
    };

    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <ImageViewer placeholderImageSource={PlaceholderImage} selectedImage={selectedImage} />
            </View>
            {showAppOptions ? (
                <View style={styles.optionsContainer}>
                    <View style={styles.optionsRow}>
                        <IconButton icon="refresh" label="Reset" onPress={onReset} />
                        <CircleButton onPress={onAddSticker} />
                        <IconButton icon="save-alt" label="Save" onPress={onSaveImageAsync} />
                    </View>
                </View>
            ) : (
                <View style={styles.footerContainer}>
                    <Button theme="primary" label="Choose a phoooto" onPress={pickImageAsync} />
                    <Button
                        label="Use this photo"
                        onPress={() => setShowAppOptions(true)}
                    />
                </View>
            )}
            <TouchableHighlight style={{}} onPress={() => navigation.navigate('Register')}>
                <Text style={{ textAlign: "center", color: "white" }}>Go to Register..</Text>
            </TouchableHighlight>
            <TouchableHighlight style={{}} onPress={() => navigation.navigate('Profile')}>
                <Text style={{ textAlign: "center", color: "white" }}>Go to profile..</Text>
            </TouchableHighlight>
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
