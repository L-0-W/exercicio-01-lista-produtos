import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { JogosModel } from '../model/Jogos';
import ListJogos from './ListJogos';
import ValidarJogos from '../viewmodel/JogosValidator';
import {
  Appbar,
  FAB,
  Snackbar,
  useTheme
} from 'react-native-paper';
import estilos from './style';
import AddItem from './ModalJogos';

export default function Jogos() {
  const [jogos, setJogos] = useState<JogosModel[]>([]);
  const [modalCriarVisible, setModalCriarVisible] = useState(false);
  const [snackbarVisivel, setSnackbarVisivel] = useState(false);

  const [novoJogo, setNovoJogo] = useState<JogosModel>({
    nome: '',
    descricao: '',
    preco: 0,
    ratings: 0,
    image_link: '',
  });

  const theme = useTheme();

  const handleSalvar = () => {
    if (ValidarJogos(novoJogo)) {
      setJogos([...jogos, { ...novoJogo }]);
      setModalCriarVisible(false);
      setNovoJogo({ nome: '', descricao: '', preco: 0, ratings: 0, image_link: '' });
      setSnackbarVisivel(true);
    } else {
      alert("Por favor, preencha corretamente os dados do jogo!");
    }
  };

  return (
    <View style={estilos.container}>
      <Appbar.Header style={{ backgroundColor: theme.colors.primaryContainer }} elevated>
        <Appbar.Content title="🎮 Meus Jogos" titleStyle={estilos.headerTitle} />
      </Appbar.Header>

      <ListJogos jogos={jogos} setJogos={setJogos} />

      <FAB
        icon="plus"
        style={estilos.fab}
        color="white"
        onPress={() => setModalCriarVisible(true)}
      />

      <AddItem 
        novoJogo={novoJogo}
        modalCriarVisible={modalCriarVisible} 
        setModalCriarVisible={setModalCriarVisible} 
        setJogos={setJogos}
        setNovoJogo={setNovoJogo}
        handleSalvar={handleSalvar}
      />

      <Snackbar
        visible={snackbarVisivel}
        onDismiss={() => setSnackbarVisivel(false)}
        duration={3000}
        action={{
          label: 'OK',
          onPress: () => setSnackbarVisivel(false),
        }}
      >
        Jogo adicionado com sucesso! 🎉
      </Snackbar>
    </View>
  );
}
