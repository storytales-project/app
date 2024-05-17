import React from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';

export default function Profile({ navigation }) {
    const profile = {
        username: "Toto Toharudin",
        email: "totosdnfkkkkkkkkkkk.com",
    };

    return (
        <>
            <ImageBackground source={require('../assets/home.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={styles.imageWrapper}>
                            <Image source={require('../assets/sana-twice.jpg')} style={styles.profileImage} />
                            <TouchableOpacity style={styles.cameraIconWrapper}>
                                <FontAwesome name="camera" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.profileName}>{profile.username}</Text>
                        <Text style={styles.profileLabel}>Username</Text>
                        <Text style={styles.profileDetail}>{profile.username}</Text>
                        <Text style={styles.profileLabel}>Email</Text>
                        <Text style={styles.profileDetail}>{profile.email}</Text>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    profileName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileLabel: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
    },
    profileDetail: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300',
    },
    button: {
        padding: 15,
        backgroundColor: '#A020F0',
        borderRadius: 10,
        marginTop: 20,
        width: 200,
        alignItems: 'center',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
});
