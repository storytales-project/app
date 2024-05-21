import React, { useState } from "react";
import {
    ImageBackground,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { gql, useQuery } from "@apollo/client";

const GET_STORY_BY_ID = gql`
    query Query($getStoryByIdId: ID) {
        getStoryById(id: $getStoryByIdId) {
            _id
            character
            image
            mood
            pages {
                chapter
                content
                audio
                choices
            }
            title
        }
    }
`;

export default function Chapter({ route, navigation }) {
    const [liked, setLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const { id } = route.params;
    const { loading, data, error } = useQuery(GET_STORY_BY_ID, {
        variables: {
            getStoryByIdId: id,
        },
    });

    const story = data?.getStoryById;



    return (
        <ImageBackground
            source={require("../assets/7.jpg")}
            style={{ flex: 1, display: "flex" }}
        >
            <View style={styles.infoContainer}>
                <View
                    style={{ justifyContent: "center", alignItems: "center" }}
                >
                    <Image
                        source={{ uri: story?.image }}
                        style={styles.storyImage}
                    />
                </View>
                <View>
                    <Text style={styles.titleText}>{story?.title}</Text>
                    <Text style={{ color: "white", textAlign: "center" }}>
                        Ceritanya ini deskripsi dari ceritanta, yang panjangnya
                        sampe 2 kalimat gitu
                    </Text>
                </View>
            </View>
            <View style={styles.container}>
                <View style={styles.col}>
                    {story?.pages.map((page, idx) => {
                        return (
                            <View style={styles.card} key={idx}>
                                <TouchableOpacity onPress={() => navigation.navigate("PlayStory",
                                    {
                                        page: page,
                                        mood: story.mood,
                                        title: story.title,
                                        image: story.image
                                    }
                                )}>
                                    <View style={styles.cardContent}>
                                        <View
                                            style={{
                                                display: "flex",
                                                flexDirection: "column",
                                                maxWidth: 200,
                                            }}
                                        >
                                            <Text style={{ color: "white" }}>
                                                Chapter {idx + 1}
                                            </Text>
                                            <Text style={styles.cardTitle}>
                                                {page.chapter}
                                            </Text>
                                        </View>
                                        <AntDesign
                                            name="caretright"
                                            size={24}
                                            color="white"
                                        />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        );
                    })}
                </View>
            </View>
            <StatusBar style="auto" />
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    infoContainer: {
        display: "flex",
        flexDirection: "column",
        marginTop: 40,
    },
    storyImage: {
        width: "80%",
        height: 235,
        borderRadius: 20,
    },
    titleText: {
        color: "white",
        textAlign: "center",
        fontSize: 20,
        fontWeight: "800",
    },
    container: {
        flex: 1,
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },
    col: {
        flexDirection: "column",
        justifyContent: "space-between",
        flexWrap: "wrap",
        width: "100%",
    },
    card: {
        width: "100%",
        borderRadius: 10,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.8,
        shadowRadius: 2,
        padding: 2,
        elevation: 5,
        height: 90,
        marginBottom: 10,
        display: "flex",
    },
    cardContent: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 15,
        width: "100%",
    },
    cardTitle: {
        fontSize: 16,
        fontWeight: "bold",
        marginBottom: 5,
        color: "white",
    },
});
