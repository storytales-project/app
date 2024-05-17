import { Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/Card";
import { FontAwesome } from '@expo/vector-icons';


export default function Home({ navigation }) {
    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/8.jpg')} style={styles.backgroundImage}>
                <View style={styles.imageWrapper}>
                    <Image source={require("../assets/2.jpg")} style={styles.image} />
                    <TouchableOpacity style={styles.cameraIconWrapper} onPress={() => navigation.navigate('Generate')}>
                        <FontAwesome name="plus" size={34} color="white" />
                    </TouchableOpacity>
                </View>
                <Text style={styles.storiesText}>Recent stories :</Text>
                <ScrollView horizontal={true} style={styles.scrollView}>
                    {/* <View style={styles.cardContainer}>
                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </View> */}
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
                        <View style={styles.card}>
                            <Image source={require('../assets/4.jpg')} style={styles.cardImage} />
                            <View style={styles.cardContent}>
                                <Text style={styles.cardTitle}>Title of the Card</Text>
                            </View>
                        </View>
                    </View>

                </ScrollView>
            </ImageBackground>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',

    },
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    image: {
        justifyContent: 'center',
        alignItems: 'center',
        width: "100%",
        height: 235,
        resizeMode: "cover",
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    card: {
        flex: 1,
        margin: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 5,
        height: 200,
        width: 150

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
    storiesText: {
        margin: 20,
        marginTop: 40,
        fontSize: 18,
        fontWeight: 'bold',
        color: '#ffffff',
    },
    scrollView: {
        flexDirection: 'row',
    },
    cardContainer: {
        flexDirection: "row",
        gap: 10,
    },
    imageWrapper: {
        position: 'relative',
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 10,
        right: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
});