import { View, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import {
  Modal,
  TextInput,
  Button,
  Text,
  Divider,
  Portal
} from 'react-native-paper';
import { useState } from 'react';
import estilos from './style';


export default function AddItem(props: any) {  
  return (
       <Portal>
        <Modal
          visible={props.modalCriarVisible}
          onDismiss={() => props.setModalCriarVisible(false)}
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
                value={props.novoJogo.nome}
                onChangeText={(text) => props.setNovoJogo({ ...props.novoJogo, nome: text })}
                style={estilos.input}
                left={<TextInput.Icon icon="controller-classic" />}
              />
              <TextInput
                mode="outlined"
                label="Descrição"
                value={props.novoJogo.descricao}
                onChangeText={(text) => props.setNovoJogo({ ...props.novoJogo, descricao: text })}
                multiline
                numberOfLines={3}
                style={estilos.input}
              />
              <View style={estilos.row}>
                <TextInput
                  mode="outlined"
                  label="Preço (R$)"
                  value={props.novoJogo.preco ? String(props.novoJogo.preco) : ''}
                  onChangeText={(text) => props.setNovoJogo({ ...props.novoJogo, preco: parseFloat(text) || 0 })}
                  keyboardType="numeric"
                  style={[estilos.input, estilos.flex1, { marginRight: 8 }]}
                  left={<TextInput.Icon icon="currency-usd" />}
                />
                <TextInput
                  mode="outlined"
                  label="Rating (0 a 5)"
                  value={props.novoJogo.ratings ? String(props.novoJogo.ratings) : ''}
                  onChangeText={(text) => props.setNovoJogo({ ...props.novoJogo, ratings: parseFloat(text) || 0 })}
                  keyboardType="numeric"
                  style={[estilos.input, estilos.flex1]}
                  left={<TextInput.Icon icon="star" />}
                />
              </View>
              <TextInput
                mode="outlined"
                label="Link da Imagem (URL)"
                value={props.novoJogo.image_link}
                onChangeText={(text) => props.setNovoJogo({ ...props.novoJogo, image_link: text })}
                style={estilos.input}
                left={<TextInput.Icon icon="image" />}
              />

              <View style={estilos.botoesContainer}>
                <Button
                  mode="text"
                  onPress={() => props.setModalCriarVisible(false)}
                  style={estilos.btn}
                >
                  Cancelar
                </Button>
                <Button
                  mode="contained"
                  onPress={props.handleSalvar}
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
  )
}

