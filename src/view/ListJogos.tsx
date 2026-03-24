import React, { useState } from 'react';
import { StyleSheet, FlatList, View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { JogosModel } from '../model/Jogos';
import {
  Button,
  Card,
  Text,
  Modal,
  Portal,
  TextInput,
  Divider,
  Surface,
  IconButton
} from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigator/types';

interface ListJogosProps {
  jogos: JogosModel[];
  setJogos: React.Dispatch<React.SetStateAction<JogosModel[]>>;
}

export default function ListJogos({ jogos, setJogos }: ListJogosProps) {
  const [modalVisivel, setModalVisivel] = useState(false);
  const [jogoEditado, setJogoEditado] = useState<JogosModel | null>(null);
  const [idxEditado, setIdxEditado] = useState<number | null>(null);

  const navigator = useNavigation<NativeStackNavigationProp<RootStackParams, 'Home'>>();

  const abrirEdicao = (jogo: JogosModel, idx: number) => {
    setJogoEditado({ ...jogo });
    setIdxEditado(idx);
    setModalVisivel(true);
  };

  const fecharModal = () => {
    setModalVisivel(false);
    setTimeout(() => {
      setJogoEditado(null);
      setIdxEditado(null);
    }, 300); // Aguarda a animação fechar
  };

  const salvarEdicao = () => {
    if (jogoEditado === null || idxEditado === null) return;
    const novaLista = [...jogos];
    novaLista[idxEditado] = jogoEditado;
    setJogos(novaLista);
    fecharModal();
  };

  const removerJogo = (idx: number) => {
    const novaLista = [...jogos];
    novaLista.splice(idx, 1);
    setJogos(novaLista);
  };

  const renderItem = ({ item, index }: { item: JogosModel; index: number }) => (
    <Card style={estilos.card} elevation={2} onPress={() => navigator.navigate("JogoDetail", {jogo: item })}>
      {item.image_link ? (
        <Card.Cover source={{ uri: item.image_link }} style={estilos.capa} />
      ) : (
        <View style={[estilos.capa, estilos.capaVazia]}>
          <Text variant="titleMedium" style={{ color: '#aaa' }}>Sem Imagem</Text>
        </View>
      )}
      <Card.Title
        title={item.nome || 'Jogo sem nome'}
        subtitle={item.descricao || 'Sem descrição'}
        titleStyle={estilos.titulo}
        subtitleStyle={estilos.subtitulo}
      />
      <Card.Content style={estilos.conteudo}>
        <Surface style={estilos.infoPill} elevation={1}>
          <Text variant="labelSmall" style={estilos.labelInfo}>💰 Preço</Text>
          <Text variant="bodyMedium" style={estilos.valorInfo}>
            R$ {item.preco ? Number(item.preco).toFixed(2) : '0.00'}
          </Text>
        </Surface>
        <Surface style={estilos.infoPill} elevation={1}>
          <Text variant="labelSmall" style={estilos.labelInfo}>⭐ Rating</Text>
          <Text variant="bodyMedium" style={estilos.valorInfo}>{item.ratings || '0'}</Text>
        </Surface>
      </Card.Content>
      <Divider style={estilos.divisor} />
      <Card.Actions style={estilos.acoes}>
        <Button
          mode="text"
          icon="pencil"
          textColor="#6200ee"
          onPress={() => abrirEdicao(item, index)}
          style={estilos.btnEditar}
        >
          Editar
        </Button>
        <Button
          mode="contained-tonal"
          icon="trash-can-outline"
          buttonColor="#ffebee"
          textColor="#e53935"
          onPress={() => removerJogo(index)}
          style={estilos.btnRemover}
        >
          Remover
        </Button>
      </Card.Actions>
    </Card>
  );

  return (
    <>
      {jogos.length === 0 ? (
        <View style={estilos.emptyContainer}>
          <Text variant="bodyLarge" style={estilos.emptyText}>
            Nenhum jogo cadastrado.
          </Text>
          <Text variant="bodyMedium" style={estilos.emptySubtext}>
            Clique no botão + para adicionar!
          </Text>
        </View>
      ) : (
        <FlatList
          data={jogos}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderItem}
          contentContainerStyle={estilos.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}

      <Portal>
        <Modal
          visible={modalVisivel}
          onDismiss={fecharModal}
          contentContainerStyle={estilos.modal}
        >
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
            <View style={estilos.modalHeader}>
              <Text variant="titleLarge" style={estilos.modalTitulo}>✏️ Editar Jogo</Text>
              <IconButton icon="close" size={20} onPress={fecharModal} />
            </View>
            <Divider style={estilos.divisorModal} />

            {jogoEditado && (
              <ScrollView showsVerticalScrollIndicator={false}>
                <TextInput
                  label="Nome"
                  value={jogoEditado.nome}
                  onChangeText={(val) => setJogoEditado({ ...jogoEditado, nome: val })}
                  mode="outlined"
                  style={estilos.campo}
                  left={<TextInput.Icon icon="controller-classic" />}
                />
                <TextInput
                  label="Descrição"
                  value={jogoEditado.descricao}
                  onChangeText={(val) => setJogoEditado({ ...jogoEditado, descricao: val })}
                  mode="outlined"
                  style={estilos.campo}
                  multiline
                  numberOfLines={2}
                />
                <View style={estilos.row}>
                  <TextInput
                    label="Preço"
                    value={jogoEditado.preco ? String(jogoEditado.preco) : ''}
                    onChangeText={(val) => setJogoEditado({ ...jogoEditado, preco: parseFloat(val) || 0 })}
                    mode="outlined"
                    style={[estilos.campo, estilos.flex1, { marginRight: 8 }]}
                    keyboardType="numeric"
                    left={<TextInput.Icon icon="currency-usd" />}
                  />
                  <TextInput
                    label="Rating"
                    value={jogoEditado.ratings ? String(jogoEditado.ratings) : ''}
                    onChangeText={(val) => setJogoEditado({ ...jogoEditado, ratings: parseFloat(val) || 0 })}
                    mode="outlined"
                    style={[estilos.campo, estilos.flex1]}
                    keyboardType="numeric"
                    left={<TextInput.Icon icon="star" />}
                  />
                </View>
                <TextInput
                  label="Link da Imagem"
                  value={jogoEditado.image_link}
                  onChangeText={(val) => setJogoEditado({ ...jogoEditado, image_link: val })}
                  mode="outlined"
                  style={estilos.campo}
                  left={<TextInput.Icon icon="image" />}
                />

                <View style={estilos.acoesModal}>
                  <Button mode="text" onPress={fecharModal} style={estilos.btnCancelar}>
                    Cancelar
                  </Button>
                  <Button mode="contained" onPress={salvarEdicao} style={estilos.btnSalvar} icon="content-save">
                    Salvar
                  </Button>
                </View>
              </ScrollView>
            )}
          </KeyboardAvoidingView>
        </Modal>
      </Portal>
    </>
  );
}

const estilos = StyleSheet.create({
  listContainer: {
    paddingBottom: 100, // Espaço para o FAB
    paddingTop: 8,
  },
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    backgroundColor: '#ffffff',
  },
  capa: {
    height: 160,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  capaVazia: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e0e0e0',
  },
  titulo: {
    fontWeight: '800',
    fontSize: 18,
    color: '#1a1a1a',
  },
  subtitulo: {
    fontSize: 14,
    color: '#666',
    marginTop: -4,
  },
  conteudo: {
    flexDirection: 'row',
    gap: 12,
    paddingVertical: 12,
  },
  infoPill: {
    borderRadius: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
  },
  labelInfo: {
    color: '#666',
    fontSize: 11,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  valorInfo: {
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginTop: 2,
  },
  divisor: {
    marginHorizontal: 16,
    backgroundColor: '#f0f0f0',
  },
  acoes: {
    justifyContent: 'flex-end',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  btnEditar: {
    marginRight: 8,
  },
  btnRemover: {
    borderRadius: 8,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 60,
  },
  emptyText: {
    fontWeight: 'bold',
    color: '#555',
  },
  emptySubtext: {
    color: '#888',
    marginTop: 8,
  },
  // Modal
  modal: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    maxHeight: '90%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  modalTitulo: {
    fontWeight: 'bold',
    color: '#333',
  },
  divisorModal: {
    marginVertical: 12,
    backgroundColor: '#eee',
  },
  campo: {
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  row: {
    flexDirection: 'row',
  },
  flex1: {
    flex: 1,
  },
  acoesModal: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 20,
    gap: 12,
  },
  btnCancelar: {
    borderRadius: 8,
  },
  btnSalvar: {
    borderRadius: 8,
  },
});