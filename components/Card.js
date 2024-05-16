import { Image, StyleSheet, Text, View } from "react-native";

export default function Card() {
    return (
        <>

            {/* Card */}
            <View style={styles.card}>

                {/* Header */}
                <View style={styles.header}>
                    <Image source={require("../assets/sana-twice.jpg")} style={styles.image} />
                    <Text style={styles.subtitle}>
                        Mimpi Malam Pertama
                    </Text>
                </View>


            </View>


        </>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: 'white',
        borderRadius: 15,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 200,
        height: 200,
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        marginBottom: 16,
        alignItems: 'center',
    },
    image: {
        borderRadius: 15,
        padding: 16,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 6,
        elevation: 14,
        width: 200,
        height: 150,
        backgroundColor: "pink",
    },
    subtitle: {
        fontSize: 18,
        color: '#333',
        marginTop: 5,
        textAlign: "center",

    },

});