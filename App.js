import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Favorite from './screens/Favorite';
import PlayStory from './screens/PlayStory';
import Generate from './screens/Generate';
import Payment from './screens/Payment';
import Chapter from './screens/Chapter';
import client from './config/apollo';
import UpdateProfile from './screens/Updateprofile';
import { ApolloProvider } from '@apollo/client';
import AuthContext from './context/Auth';
import * as SecureStore from 'expo-secure-store';
import { BlurView } from 'expo-blur';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBottom() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ color, size }) => {
                    let iconName;

                    switch (route.name) {
                        case 'PlayStory':
                            iconName = 'book';
                            break;
                        case 'Home':
                            iconName = 'home';
                            break;
                        case 'Favorite':
                            iconName = 'heart';
                            break;
                        case 'Profile':
                            iconName = 'user';
                            break;
                        case 'Chapter':
                            iconName = 'file-text';
                            break;
                        default:
                            iconName = 'plus';
                            break;
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'gold',
                tabBarInactiveTintColor: 'gray',
                tabBarInactiveBackgroundColor: "#000435",
                tabBarActiveBackgroundColor: "#000435",

            })}
        >
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            {/* <Tab.Screen name="PlayStory" component={PlayStory} options={{ headerShown: false }} /> */}
            <Tab.Screen name="Generate" component={Generate} options={{ headerShown: false }} />
            <Tab.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />

        </Tab.Navigator>
    );
}

export default function App() {
    const [isSignedIn, setIsSignedIn] = React.useState(false);

    React.useEffect(() => {
        const checkToken = async () => {
            const token = await SecureStore.getItemAsync('access_token');
            setIsSignedIn(!!token);
        };
        checkToken();
    }, []);

    return (
        <ApolloProvider client={client}>
            <AuthContext.Provider value={{ isSignedIn, setIsSignedIn }}>
                <NavigationContainer>
                    <Stack.Navigator initialRouteName="Login" screenOptions={{
                        headerMode: 'screen',
                        headerTintColor: 'white',
                        headerStyle: { backgroundColor: '#0047AB' },
                    }}>
                        {!isSignedIn ? (
                            <>
                                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                            </>
                        ) : (
                            <>
                                <Stack.Screen name="TabBottom" component={TabBottom} options={{ headerShown: false }} />
                                <Stack.Screen name="Generate" component={Generate} options={{ headerShown: false }} />
                                <Stack.Screen name="Payment" component={Payment} options={{ headerShown: false }} />
                                <Stack.Screen name="Chapter" component={Chapter} options={{ headerShown: true }} />
                                <Stack.Screen name="PlayStory" component={PlayStory} options={{ headerShown: true }} />
                                <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{ headerShown: true }} />
                            </>
                        )}
                    </Stack.Navigator>
                </NavigationContainer>
            </AuthContext.Provider>
        </ApolloProvider>
    );
}
