import { useRoute } from "@react-navigation/native"
import { Text } from "react-native-paper"

export default function FriendsHaveGame() {
    const route = useRoute();
    const { jogo } = route.params;


    return (
        <Text>{jogo.preco}</Text>
    )
}