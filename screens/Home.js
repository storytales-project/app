import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import Card from "../components/Card";

export default function Home() {
    return (
        <>
            <View style={styles.container}>

                <Image source={require("../assets/home.jpg")} style={styles.image} />
                <ScrollView horizontal={true}>

                    <View style={styles.card}>

                        <Card />
                        <Card />
                        <Card />
                        <Card />
                    </View>
                </ScrollView>
            </View>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "flex-start",
        alignItems: 'center',
        backgroundColor: '#301934',
    },
    image: {
        justifyContents: 'center',
        alignItems: 'center',
        width: "100%",
        height: 235,
        objectFit: "cover",
        backgroundColor: "red"
    },
    card: {
        flex: 1,
        height: 200,
        width: "100%",
        flexDirection: "row",
        gap: 10,
    }
})