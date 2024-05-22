import React, { useEffect, useState } from "react";
import {
    ImageBackground,
    Image,
    StatusBar,
    StyleSheet,
    Text,
    View,
    TouchableOpacity,
    Alert,
    RefreshControl,
    ScrollView
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { gql, useMutation, useQuery } from "@apollo/client";
import { STORIES } from "./Home";

export const GET_STORY_BY_ID = gql`
    query getStoryById($getStoryByIdId: ID) {
        getStoryById(id: $getStoryByIdId) {
            _id
            character
            image
            mood
            public
            description
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

const POST_PUBLIC = gql`
    mutation SetPublic($storyId: ID) {
        setPublic(storyId: $storyId) {
            _id
            public
        }
    }
`;

export default function Chapter({ route, navigation }) {
    const [liked, setLiked] = useState(false);
    const [followed, setFollowed] = useState(false);

    const { id } = route.params;
    const { loading, data, error, refetch } = useQuery(GET_STORY_BY_ID, {
        variables: {
            getStoryByIdId: id,
        },
    });

    const [setPublic, { loading: loading1, error: error1 }] = useMutation(POST_PUBLIC, {
        refetchQueries: [{ query: STORIES }],
    });

    const handleSetPublic = async () => {
        try {
            const result = await setPublic({ variables: { storyId: id } });
            console.log(result);
            navigation.navigate("Home");
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    useEffect(() => {
        if (data) {
            refetch();
        }
    }, [data]);

    const story = data?.getStoryById;

    const handleRefresh = async () => {
        await refetch();
    };

    return (
        <ImageBackground
            source={require("../assets/7.jpg")}
            style={{ flex: 1, display: "flex" }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1 }}
                refreshControl={<RefreshControl onRefresh={handleRefresh} />}
            >
                <View style={styles.infoContainer}>
                    <View style={{ justifyContent: "center", alignItems: "center" }}>
                        <Image source={{ uri: story?.image }} style={styles.storyImage} />
                    </View>
                    <View>
                        <Text style={styles.titleText}>{story?.title}</Text>

                        {!story?.description ? (
                            <Text style={{ color: "white", textAlign: "center" }}>
                                Cerita tentang seorang anak kecil yang berpetualang seorang diri dengan gagah berani.
                            </Text>
                        ) : (
                            <Text style={{ color: "white", textAlign: "center" }}>{story?.description}</Text>
                        )}

                        <TouchableOpacity onPress={() => console.log("untuk favorite")}>
                            <View
                                style={{
                                    backgroundColor: "white",
                                    padding: 4,
                                    paddingHorizontal: 10,
                                    borderRadius: 9,
                                    marginBottom: 10,
                                    alignItems: "center"
                                }}
                            >
                                <Text style={{ fontWeight: "bold" }}>Add Favorite</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.container}>
                    <View style={styles.col}>
                        {story?.pages.map((page, idx) => (
                            <View style={styles.card} key={idx}>
                                <TouchableOpacity
                                    onPress={() => navigation.navigate("PlayStory", {
                                        page,
                                        mood: story.mood,
                                        title: story.title,
                                        image: story.image,
                                        pages: story.pages,
                                        storyId: story._id,
                                        index: idx
                                    })}
                                >
                                    <View style={styles.cardContent}>
                                        <View style={{ display: "flex", flexDirection: "column", maxWidth: 200 }}>
                                            <Text style={{ color: "white" }}>Chapter {idx + 1}</Text>
                                            <Text style={styles.cardTitle}>{page.chapter}</Text>
                                        </View>
                                        <AntDesign name="caretright" size={24} color="white" />
                                    </View>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>
                    {story?.pages.length === 3 && story?.public === false && (
                        <View>
                            <TouchableOpacity onPress={handleSetPublic}>
                                <View
                                    style={{
                                        backgroundColor: "white",
                                        padding: 4,
                                        paddingHorizontal: 10,
                                        borderRadius: 9,
                                        marginBottom: 10
                                    }}
                                >
                                    <Text style={{ fontWeight: "bold" }}>Share Public</Text>
                                </View>
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
                <StatusBar style="auto" />
            </ScrollView>
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
