import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import PlayStory from './screens/PlayStory';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Test from './screens/Test';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TabBottom() {
    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName;

                    if (route.name === 'PlayStory') {
                        iconName = focused ? 'book' : 'book-o';
                    } else if (route.name === 'Home') {
                        iconName = focused ? 'home' : 'home-o';
                    } else if (route.name === 'Profile') {
                        iconName = focused ? 'user' : 'user-o';
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="PlayStory" component={PlayStory} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
        </Tab.Navigator>
    );
}

function App() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Home">
                <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
                <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
                <Stack.Screen name="PlayStory" component={TabBottom} options={{ headerShown: false }} />
                <Stack.Screen name="Profile" component={Profile} options={{ headerShown: false }} />
                <Stack.Screen name="Test" component={Test} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
