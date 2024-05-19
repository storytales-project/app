import React, { useState } from 'react';
import { ImageBackground, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function Chapter({ navigation }) {
    const [liked, setLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const handleLikePress = () => {
        setLiked(!liked);
    };

    const handleFollowPress = () => {
        setFollowed(!followed);
    };

    return (
        <ImageBackground source={require('../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg')} style={{ flex: 1 }}>
            <View style={styles.container}>
                <View style={styles.col}>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Chapter 1</Text>
                            <AntDesign name="caretright" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Chapter 2</Text>
                            <AntDesign name="caretright" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Chapter 3</Text>
                            <AntDesign name="caretright" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Chapter 4</Text>
                            <AntDesign name="caretright" size={24} color="white" />
                        </View>
                    </View>
                    <View style={styles.card}>
                        <View style={styles.cardContent}>
                            <Text style={styles.cardTitle}>Chapter 5</Text>
                            <AntDesign name="caretright" size={24} color="white" />
                        </View>
                    </View>
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    col: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
    },
    card: {
        width: '100%',
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 80,
        marginBottom: 10,
    },
    cardContent: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 25,
        width: '100%',
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
        color: 'white'
    },
});
