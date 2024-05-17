import React, { useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, TouchableHighlight, View, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

export default function Test({ navigation }) {
    const [liked, setLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const handleLikePress = () => {
        setLiked(!liked);
    };

    const handleFollowPress = () => {
        setFollowed(!followed);
    };

    return (
        <ImageBackground source={require('../assets/background.png')} style={{ width: '100%', height: '100%' }}>
            <View style={styles.container}>

                <TouchableHighlight style={styles.button} onPress={() => navigation.navigate('Register')}>
                    <Text style={styles.buttonText}>Go to Register</Text>
                </TouchableHighlight>

                <TouchableHighlight style={[styles.button, styles.buttonMargin]} onPress={() => navigation.navigate('PlayStory')}>
                    <Text style={styles.buttonText}>Go to PlayStory</Text>
                </TouchableHighlight>

                <View style={styles.row}>
                    <View style={styles.card}>
                        <Image source={require('../assets/icon.png')} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Title of the Card</Text>
                            <Text style={styles.cardDescription}>This is a description for the card. It can be a brief overview of the content or information.</Text>
                            <View style={styles.actions}>
                                <TouchableHighlight onPress={handleLikePress}>
                                    <FontAwesome name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
                                </TouchableHighlight>
                                <TouchableHighlight onPress={handleFollowPress}>
                                    <FontAwesome name={followed ? 'user-plus' : 'user-plus'} size={24} color={followed ? 'green' : 'black'} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>

                    <View style={styles.card}>
                        <Image source={require('../assets/icon.png')} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Title of the Card</Text>
                            <Text style={styles.cardDescription}>This is a description for the card. It can be a brief overview of the content or information.</Text>
                            <View style={styles.actions}>
                                <TouchableHighlight onPress={handleLikePress}>
                                    <FontAwesome name={liked ? 'heart' : 'heart-o'} size={24} color={liked ? 'red' : 'black'} />
                                </TouchableHighlight>
                                <TouchableHighlight onPress={handleFollowPress}>
                                    <FontAwesome name={followed ? 'user-plus' : 'user-plus'} size={24} color={followed ? 'green' : 'black'} />
                                </TouchableHighlight>
                            </View>
                        </View>
                    </View>
                </View>

                <StatusBar style="auto" />
            </View>

           
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
        color: 'white',
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        margin: 10,
        borderRadius: 10,
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
    },
    cardImage: {
        width: '100%',
        height: 100,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
    },
    cardContent: {
        padding: 10,
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    cardDescription: {
        fontSize: 12,
        color: '#777',
    },
    actions: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    button: {
        backgroundColor: '#A020F0',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        width: '90%',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    buttonMargin: {
        marginTop: 20,
    },
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});
