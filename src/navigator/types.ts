import { JogosModel } from "../model/Jogos";

export type RootStackParams = {
    Home: undefined;
    JogoDetail: { jogo: JogosModel};
}

export type RootTabParams = {
    Details: { jogo: JogosModel },
    FriendsThatHave: { jogo: JogosModel }
}