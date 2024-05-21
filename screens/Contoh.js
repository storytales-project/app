import { useEffect, useState } from "react";
import {
    View,
    StyleSheet,
    Button,
    Text,
    Animated,
    Dimensions,
    LogBox,
} from "react-native";
import { Audio } from "expo-av";

export default function AudioText() {
    const [sound, setSound] = useState();
    const [durationMillis, setDurationMillis] = useState(0);
    const [counter, setCounter] = useState(0);
    const [playState, setPlayState] = useState("pause");
    const [progress, setProgress] = useState(new Animated.Value(0));
    const windowWidth = Dimensions.get("window").width;

    async function playSound() {
        const { sound } = await Audio.Sound.createAsync(
            {
                uri: "https://res.cloudinary.com/dp9n1icsc/video/upload/v1716215593/wnl68qvupultewrnnw8d.mp3",
            },
            {},
            (status) => setDurationMillis(status.durationMillis)
        );
        setSound(sound);

        console.log("Playing Sound");
        setDurationMillis(sound.durationMillis);
        setPlayState("Playing");

        await sound.playAsync();
    }

    useEffect(() => {
        LogBox.ignoreLogs(["Animated: `useNativeDriver`"]);
    }, []);

    useEffect(() => {
        if (durationMillis && playState === "pause") {
            Animated.timing(progress, {
                toValue: windowWidth - 20,
                duration: durationMillis,
            }).start();

            console.log(durationMillis);
            let tempCount = counter;
            const countInterval = setInterval(() => {
                console.log(tempCount);
                setCounter((prev) => prev + 1);
                tempCount += 1;

                if (tempCount >= durationMillis / 1000) {
                    console.log("FINISHHHH");
                    setCounter(0);
                    setPlayState("pause");
                    clearInterval(countInterval);
                }
            }, 1000);
        }
    }, [durationMillis]);

    return (
        <View style={styles.container}>
            <Text>Counter: {counter}</Text>
            <Animated.View style={[styles.bar, { width: progress }]} />
            <Button title={"Play Sound " + playState} onPress={playSound} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "#ecf0f1",
        padding: 10,
        width: "100%",
    },
    bar: {
        height: 10,
        backgroundColor: "#333",
        borderRadius: 10,
        marginVertical: 15,
    },
});