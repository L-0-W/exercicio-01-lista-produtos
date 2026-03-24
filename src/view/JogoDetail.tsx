import { useRoute } from "@react-navigation/native"
import { Button, Text } from "react-native-paper"
import { JogosModel } from "../model/Jogos";

export default function JogoDetail() {
    const route = useRoute();
    const { jogo } = route.params;

    return (
        <>
            <Text>Olá {jogo.nome}</Text>
            <Button
                onPress={() => alert("a")}
            >ABC</Button>
        </>
    )
}