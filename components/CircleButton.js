import React from 'react';
import { View, Pressable, StyleSheet } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

export default function CircleButton({ onPress, playState }) {
    return (
        <View style={styles.circleButtonContainer}>
            <Pressable style={styles.circleButton} onPress={onPress}>
                <AntDesign name={playState === 'playing' ? "pause" : "caretright"} size={24} color="black" />
            </Pressable>
        </View>
    );
}

const styles = StyleSheet.create({
    circleButtonContainer: {
        width: 84,
        height: 84,
        marginHorizontal: 60,
        borderWidth: 4,
        borderColor: '#ffd33d',
        borderRadius: 42,
        padding: 3,
    },
    circleButton: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 42,
        backgroundColor: '#fff',
    },
});
