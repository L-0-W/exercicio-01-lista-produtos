import { RootTabParams } from "./types";
import JogoDetail from "../view/JogoDetail";
import FriendsHaveGame from "../view/FriendsHaveGame";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useRoute } from "@react-navigation/native";

const Tab = createBottomTabNavigator<RootTabParams>();

export default function TabNavigator() {
    const route = useRoute();
    const { jogo } = route.params;

    return (
        <Tab.Navigator
            initialRouteName='Details'
            screenOptions={{ headerShown: false }}
        >
            <Tab.Screen 
                name='Details'
                component={JogoDetail}
                initialParams={{ jogo }}
            />

            <Tab.Screen 
                name='FriendsThatHave'
                component={FriendsHaveGame}
                initialParams={{ jogo }}
            />
        </Tab.Navigator>
    )
}