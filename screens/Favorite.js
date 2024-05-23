import { Image, ImageBackground, RefreshControl, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Card from "../components/Card";
import { FontAwesome } from '@expo/vector-icons';
import { gql, useQuery } from "@apollo/client";
import { useEffect } from "react";

export const MYSTORIES = gql`
query GetMyStories {
  getMyStories {
    _id
    title
    image
    description
    character
    mood
    public
    theme
    userId
  }
}
`

export const FAVORITES = gql`
query Story {
  getUserFavorites {
    story {
      _id
      image
      title
    }
  }
}`

export default function Favorite({ navigation }) {

    const { loading, data, error, refetch } = useQuery(MYSTORIES, {
        refetchQuery: [{ query: MYSTORIES }]
    });
    const { loading: loading1, data: data1, error: error1, refetch: refetch1 } = useQuery(FAVORITES, {
        refetchQuery: [{ query: FAVORITES }]
    });

    console.log(data1, "<<<<");

    useEffect(() => {
        refetch()
        refetch1()
    }, [])

    const handleRefresh = async () => {
        // setRefresh(true)
        await refetch()
        await refetch1()
    }

    return (
        <View style={styles.container}>
            <ImageBackground source={require('../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg')} style={styles.backgroundImage} refreshControl={<RefreshControl onRefresh={handleRefresh} />}>
                <Text style={styles.storiesText}>My stories :</Text>
                <ScrollView horizontal={true} style={styles.scrollView}>

                    <View style={styles.row}>

                        {data?.getMyStories.map((item, index) => (

                            <View style={styles.card} key={index}>
                                <TouchableOpacity onPress={() => navigation.navigate("Chapter", { id: item._id })}>
                                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{item.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

                    </View>

                </ScrollView>

                <Text style={styles.storiesText}>My favorite :</Text>
                <ScrollView horizontal={true} style={styles.scrollView}>

                    <View style={styles.row}>

                        {data1?.getUserFavorites.map((item, index) => (

                            <View style={styles.card} key={index}>
                                <TouchableOpacity onPress={() => navigation.navigate("Chapter", { id: item.story._id })}>
                                    <Image source={{ uri: item.story.image }} style={styles.cardImage} />
                                    <View style={styles.cardContent}>
                                        <Text style={styles.cardTitle}>{item.story.title}</Text>
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}

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
        color: 'white',
    },
    cardDescription: {
        fontSize: 12,
        color: '#777',
    },
    storiesText: {
        margin: 15,
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