import {Text, View} from 'react-native';
import { useState } from 'react';
import ValidarJogos from './JogosValidator';

export default function Jogos() {
  const [jogosList, setJogosList] = useState([]);
  const [newJogoName, setNewJogoName] = useState('');



  return (
    <View>
      <Button
        onPress={() => ValidarJogos(newJogoName, newJogoName, 10, 10)}
      >
        Ola Mundo
      </Button>
      <Text>Olá Mundo</Text>
      {
        jogosList.map((jogos) => {
          return (
            <>
            <Text>{jogos.nome}</Text>
            <Text>{jogos.descricao}</Text>
            <Text>{jogos.preco}</Text>
            </>
          )
        })
      }
    </View>
  )
}