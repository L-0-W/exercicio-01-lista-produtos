import React, { useState } from 'react';
import { View, StyleSheet, FlatList, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { JogosModel } from '../model/Jogos';
import ListJogos from './ListJogos';
import ValidarJogos from '../viewmodel/JogosValidator';
import {
  Appbar,
  FAB,
  Portal,
  Modal,
  TextInput,
  Button,
  Text,
  Surface,
  Divider,
  Snackbar,
  useTheme
} from 'react-native-paper';

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

      <Portal>
        <Modal
          visible={modalCriarVisible}
          onDismiss={() => setModalCriarVisible(false)}
          contentContainerStyle={estilos.modalContainer}
        >
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : undefined}
          >
            <ScrollView showsVerticalScrollIndicator={false}>
              <Text variant="headlineSmall" style={estilos.modalTitulo}>✨ Novo Jogo</Text>
              <Divider style={estilos.divisor} />

              <TextInput
                mode="outlined"
                label="Nome do Jogo"
                value={novoJogo.nome}
                onChangeText={(text) => setNovoJogo({ ...novoJogo, nome: text })}
                style={estilos.input}
                left={<TextInput.Icon icon="controller-classic" />}
              />
              <TextInput
                mode="outlined"
                label="Descrição"
                value={novoJogo.descricao}
                onChangeText={(text) => setNovoJogo({ ...novoJogo, descricao: text })}
                multiline
                numberOfLines={3}
                style={estilos.input}
              />
              <View style={estilos.row}>
                <TextInput
                  mode="outlined"
                  label="Preço (R$)"
                  value={novoJogo.preco ? String(novoJogo.preco) : ''}
                  onChangeText={(text) => setNovoJogo({ ...novoJogo, preco: parseFloat(text) || 0 })}
                  keyboardType="numeric"
                  style={[estilos.input, estilos.flex1, { marginRight: 8 }]}
                  left={<TextInput.Icon icon="currency-usd" />}
                />
                <TextInput
                  mode="outlined"
                  label="Rating (0 a 5)"
                  value={novoJogo.ratings ? String(novoJogo.ratings) : ''}
                  onChangeText={(text) => setNovoJogo({ ...novoJogo, ratings: parseFloat(text) || 0 })}
                  keyboardType="numeric"
                  style={[estilos.input, estilos.flex1]}
                  left={<TextInput.Icon icon="star" />}
                />
              </View>
              <TextInput
                mode="outlined"
                label="Link da Imagem (URL)"
                value={novoJogo.image_link}
                onChangeText={(text) => setNovoJogo({ ...novoJogo, image_link: text })}
                style={estilos.input}
                left={<TextInput.Icon icon="image" />}
              />

              <View style={estilos.botoesContainer}>
                <Button
                  mode="text"
                  onPress={() => setModalCriarVisible(false)}
                  style={estilos.btn}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={handleSalvar}
                  style={estilos.btn}
                  icon="check"
                >
                  Adicionar
                </Button>
              </View>
            </ScrollView>
          </KeyboardAvoidingView>
        </Modal>
      </Portal>

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

const estilos = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  headerTitle: {
    fontWeight: 'bold',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 20,
    backgroundColor: '#6200ee',
  },
  modalContainer: {
    backgroundColor: 'white',
    margin: 20,
    borderRadius: 16,
    padding: 24,
    maxHeight: '90%',
  },
  modalTitulo: {
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 8,
    color: '#333',
  },
  divisor: {
    marginBottom: 16,
  },
  input: {
    marginBottom: 12,
    backgroundColor: 'white',
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  botoesContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 16,
    gap: 8,
  },
  btn: {
    borderRadius: 8,
  },
});
