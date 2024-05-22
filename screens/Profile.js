import React, { useCallback, useContext, useEffect, useState } from 'react';
import { Image, ImageBackground, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { gql, useMutation, useQuery } from '@apollo/client';
import { useFocusEffect } from '@react-navigation/native';
import AuthContext from '../context/Auth';
import * as SecureStore from "expo-secure-store";

const TOPUP_CREDIT = gql`
 mutation Mutation {
  topUpCredit
}`

const GET_PROFILE = gql`
query GetProfile {
  getProfile {
    _id
    email
    username
    credit
    imageUrl
  }
}`




export default function Profile({ navigation }) {
    const [topUpCredit] = useMutation(TOPUP_CREDIT)

    const { loading, data, error, refetch } = useQuery(GET_PROFILE, { fetchPolicy: "no-cache" })
    console.log(data, loading, error);
    const [profile, setProfile] = useState(null)
    const { setIsSignedIn } = useContext(AuthContext);
    const handleLogout = () => {
        const logout = async () => {
            //     const token = await SecureStore.getItemAsync("access_token")
            //     throw new Error(token)
            // await SecureStore.deleteItemAsync("access_token", data?.loginUser.access_token);
            setIsSignedIn(false);
        }
        logout()
        // navigation.navigate('Login');
    };

    const handlePayment = async () => {
        try {
            const result = await topUpCredit();
            console.log(result, "aaaaaaaaaaaaaaaaaaa");
            navigation.navigate('Payment', { url: result.data.topUpCredit, profile: profile });
        } catch (error) {
            throw error
        }


    };

    const UpdateProfile = () => {
        try {
            navigation.navigate("UpdateProfile", { profile: profile })
        } catch (error) {

        }
    }

    useFocusEffect(
        useCallback(() => {
            // if (data) {
            //     setProfile(data?.getProfile)
            // }
            refetch()

            console.log("masukkkkkkkkkkkkk");

        }, [])
    );

    useEffect(() => {
        if (data) {
            setProfile(data?.getProfile)
        }
    }, [data])
    if (!profile) {
        return
    }
    return (
        <>
            <ImageBackground source={require('../assets/education-day-scene-fantasy-style-aesthetic_23-2151040271.jpg')} style={styles.backgroundImage}>
                <View style={styles.container}>
                    <View style={styles.profileContainer}>
                        <View style={styles.imageWrapper}>
                            <Image source={{ uri: profile?.imageUrl }} style={styles.profileImage} />
                            <TouchableOpacity style={styles.cameraIconWrapper} onPress={UpdateProfile}>
                                <FontAwesome name="edit" size={24} color="white" />
                            </TouchableOpacity>
                        </View>
                        <Text style={styles.profileName}>{profile?.username}</Text>
                        <Text style={styles.profileLabel}>Email</Text>
                        <Text style={styles.profileDetail}>{profile?.email}</Text>
                        <Text style={styles.profileLabel}>Credit</Text>
                        <Text style={styles.profileDetail}>{profile?.credit}</Text>
                    </View>
                    <View style={styles.cartContainer}>
                        <TouchableOpacity style={styles.cartButton} onPress={handlePayment}>
                            <FontAwesome name="credit-card" size={24} color="white" />
                            <Text style={styles.cartButtonText}>Top-Up</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.cartButton} onPress={handleLogout}>
                            <FontAwesome name="sign-out" size={24} color="white" />
                            <Text style={styles.cartButtonText}>Logout</Text>
                        </TouchableOpacity>
                    </View>
                    <StatusBar style="auto" />
                </View>
            </ImageBackground>
        </>
    );
}

const styles = StyleSheet.create({
    backgroundImage: {
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    profileContainer: {
        marginTop: 20,
        padding: 20,
        borderRadius: 10,
        width: 300,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        alignItems: 'center',
    },
    imageWrapper: {
        position: 'relative',
    },
    profileImage: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    cameraIconWrapper: {
        position: 'absolute',
        bottom: 0,
        right: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
        padding: 5,
    },
    profileName: {
        color: 'white',
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    profileLabel: {
        color: 'white',
        fontSize: 18,
        marginTop: 10,
        fontWeight: "bold"
    },
    profileDetail: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300',
    },
    cartContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    cartButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderRadius: 10,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        marginHorizontal: 10,
    },
    cartButtonText: {
        color: 'white',
        fontSize: 16,
        marginLeft: 10,
    },
    status: {
        color: 'white',
        fontSize: 20,
        fontWeight: '300',
    },
    status1: {
        color: 'white',
        fontSize: 20,
        fontWeight: 'bold',
    },
});
