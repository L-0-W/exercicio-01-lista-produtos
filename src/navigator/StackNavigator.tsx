import { RouteProp } from '@react-navigation/native'
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack'
import { RootStackParams } from './types'
import Jogos from '../view/Jogos'
import JogoDetail from '../view/JogoDetail'
import TabNavigator from './TabNavigator'


type NavegacaoHome = NativeStackNavigationProp<RootStackParams, "Home">
type RotaAddItem = RouteProp<RootStackParams, 'JogoDetail'>

const Stack  = createNativeStackNavigator<RootStackParams>();

export default function StackNavigator() {

    return (
        <Stack.Navigator
            screenOptions={{
                headerShown: false,
            }}
        >
        <Stack.Screen
        name='Home'
        component={Jogos}
        />
        
        <Stack.Screen 
        name='JogoDetail'
        component={TabNavigator}
        />

        </Stack.Navigator>
    )
}