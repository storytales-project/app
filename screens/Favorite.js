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
        <ImageBackground source={require('../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg')} style={{ width: '100%', height: '100%' }}>
            
        <View style={styles.container}>


                <View style={styles.row}>
                    <View style={styles.card}>
                        <Image source={require('../assets/5.jpg')} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Title of the Card</Text>
                        </View>
                    </View>
                    <View style={styles.card}>
                        <Image source={require('../assets/4.jpg')} style={styles.cardImage} />
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Title of the Card</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
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
        color: 'white'
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
