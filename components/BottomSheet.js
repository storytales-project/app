import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Pressable,
    TouchableOpacity,
    Alert
} from "react-native";
import { gql, useQuery, useMutation } from "@apollo/client";
import Lottie from "./Lottie";
import { GET_STORY_BY_ID } from "../screens/Chapter";

const CHOICES = gql`
    query Query($getStoryChoicesId: ID) {
        getStoryChoices(id: $getStoryChoicesId)
    }
`;

const PICK_CHOICE = gql`
    mutation Mutation($pick: storyPick) {
        continueStory(pick: $pick) {
            audio
            chapter
            choices
            content
        }
    }
`;

const BottomSheet = ({ setStatus, storyId, navigation }) => {

    const { loading, data, error } = useQuery(CHOICES, {
        variables: {
            getStoryChoicesId: storyId,
        },
    });

    const [pickChoice, { loading: pickLoading, error: pickError }] =
        useMutation(PICK_CHOICE, {
            refetchQueries: [{
                query: GET_STORY_BY_ID, variables: {
                    getStoryByIdId: storyId,
                }
            }]
        });

    const choices = data?.getStoryChoices;

    const slide = useRef(new Animated.Value(300)).current;

    const slideUp = () => {
        // Will change fadeAnim value to 1 in 5 seconds
        Animated.timing(slide, {
            toValue: 0,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    const slideDown = () => {
        // Will change fadeAnim value to 0 in 3 seconds
        Animated.timing(slide, {
            toValue: 300,
            duration: 200,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        slideUp();
    }, []);

    const closeModal = () => {
        slideDown();

        setTimeout(() => {
            setStatus(false);
        }, 200);
    };

    const inputChoice = async (choice) => {
        try {
            const result = await pickChoice({
                variables: {
                    pick: {
                        choice: choice,
                        storyId: storyId,
                    },
                },
            });

            navigation.navigate('Chapter', { id: storyId })
        } catch (error) {
            Alert.alert("Error", error.message);
        }
    };

    if (pickLoading) {
        return (
            <View style={{ width: "100%", height: "50%", backgroundColor: "white" }}>

                <Lottie />
            </View>
        )
    }

    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{ width: "100%", height: "50%" }}>
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        { transform: [{ translateY: slide }] },
                    ]}
                >
                    <View
                        style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: 20,
                        }}
                    >
                        {choices?.map((choice, idx) => {
                            return (
                                <View
                                    style={{
                                        backgroundColor: "#121481",
                                        padding: 6,
                                        borderRadius: 10,
                                    }}
                                    key={idx}
                                >
                                    <TouchableOpacity
                                        onPress={() => {
                                            inputChoice(choice);
                                        }}
                                    >
                                        <Text
                                            style={{
                                                color: "white",
                                                textAlign: "center",
                                                fontSize: 16,
                                                fontWeight: "bold",
                                            }}
                                        >
                                            {choice}
                                        </Text>
                                    </TouchableOpacity>
                                </View>
                            );
                        })}
                    </View>
                </Animated.View>
            </Pressable>
        </Pressable>
    );
};

export default BottomSheet;

const styles = StyleSheet.create({
    backdrop: {
        position: "absolute",
        flex: 1,
        top: 0,
        left: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        width: "100%",
        height: "100%",
        justifyContent: "flex-end",
    },
    bottomSheet: {
        width: "100%",
        height: "100%",
        backgroundColor: "#1679AB",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
    },
});
