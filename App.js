import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesome } from '@expo/vector-icons';
import Login from './screens/Login';
import Register from './screens/Register';
import PlayStory from './screens/PlayStory';
import Home from './screens/Home';
import Profile from './screens/Profile';
import Favorite from './screens/Favorite';
import Generate from './screens/Generate';

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
                        default:
                            iconName = 'circle';
                            break;
                    }

                    return <FontAwesome name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'gray',
            })}
        >
            <Tab.Screen name="PlayStory" component={PlayStory} options={{ headerShown: false }} />
            <Tab.Screen name="Home" component={Home} options={{ headerShown: false }} />
            <Tab.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
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
                <Stack.Screen name="Favorite" component={Favorite} options={{ headerShown: false }} />
                <Stack.Screen name="Generate" component={Generate} options={{ headerShown: false }} />
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default App;
