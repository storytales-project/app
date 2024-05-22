import React, { useEffect, useRef } from "react";
import {
    View,
    Text,
    StyleSheet,
    Animated,
    Pressable,
    ScrollView,
} from "react-native";


const BottomSheetText = ({ content, setList }) => {

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
            setList(false);
        }, 200);
    };



    return (
        <Pressable onPress={closeModal} style={styles.backdrop}>
            <Pressable style={{ width: "100%", height: "50%" }}>
                <Animated.View
                    style={[
                        styles.bottomSheet,
                        { transform: [{ translateY: slide }] },
                    ]}
                >
                    <ScrollView
                        style={{
                            margin: 20,
                        }}
                    >
                        <Pressable>

                            <Text style={{ fontSize: 16, textAlign: "left", letterSpacing: 1 }}>{content}</Text>
                        </Pressable>
                    </ScrollView>
                </Animated.View>
            </Pressable>
        </Pressable>
    );
};

export default BottomSheetText;

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
        backgroundColor: "white",
        borderTopRightRadius: 20,
        borderTopLeftRadius: 20,
        padding: 20,
    },
});
