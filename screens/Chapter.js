import React, { useState } from 'react';
import { ImageBackground, Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { AntDesign } from '@expo/vector-icons';


export default function Chapter({ route, navigation }) {
    const [liked, setLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const handleLikePress = () => {
        setLiked(!liked);
    };

    const handleFollowPress = () => {
        setFollowed(!followed);
    };

    return (
        <ImageBackground source={require('../assets/7.jpg')} style={{ flex: 1, display: 'flex' }}>
            <View style={styles.infoContainer}>
                <View style={{ justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('../assets/4.jpg')} style={styles.storyImage}/>
                </View>
                <View>
                    <Text style={styles.titleText}>Ini Ceritanya Judul Ceritanya</Text>
                    <Text style={{color : 'white', textAlign : 'center'}}>Ceritanya ini deskripsi dari ceritanta, yang panjangnya sampe 2 kalimat gitu</Text>
                </View>
            </View>
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
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    infoContainer : {
        display : 'flex',
        flexDirection : 'column',
        marginTop: 40
    },
    storyImage : {
        width: '80%',
        height : 235,
        borderRadius : 20
    },
    titleText : {
        color : 'white',
        textAlign : 'center',
        fontSize : 20,
        fontWeight : '800',
    },  
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
        display: 'flex'
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
