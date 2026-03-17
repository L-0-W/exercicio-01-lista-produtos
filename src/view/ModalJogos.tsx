import {View, Button, Modal, Alert, TextInput} from 'react-native';
import styles from './style'



export default function Jogos(props: any) {
  return (
    <Modal 
          animationType="slide"
          transparent={true}
          visible={props.modalVisible}
          style={styles.modal}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            props.setModalVisible(!props.modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                onChangeText={(text: string) => props.setNewJogoName(text)}
                placeholder="Adicionar nome do jogo"
              />
              <TextInput
                onChangeText={(preco: number) => props.setNewJogoPreco(preco)}
                placeholder="Adicionar preço do jogo"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={(rating: number) => props.setNewJogoRatings(rating)}
                placeholder="Adicionar ratings ao jogo"
                keyboardType="numeric"
              />
              <TextInput
                onChangeText={(desc: string) => props.setNewJogoDescricao(desc)}
                placeholder="Adicionar descrição ao jogo"
              />
              <TextInput
                onChangeText={(url: string) => props.setNewJogoImgLink(url)}
                placeholder="Adicionar imagem do jogo"
              />
              <Button 
                style={[styles.button, styles.buttonClose]}
                onPress={props.criarNewGame}
                title="Adicionar jogo"
              />
              <Button  
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(false)}
                title="Esconder"
              />
            </View>
          </View>
    </Modal>
  )
}

