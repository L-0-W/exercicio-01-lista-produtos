import {JogosModel} from '../model/Jogos'

export default function ValidarJogos(jogo: JogosModel): boolean {
    
  if (jogo.nome.length < 3)
    return false;
  

  if (jogo.descricao.length < 5)
    return false;

  if (!Number(jogo.preco))
    return false;

  if (!Number(jogo.ratings))
    return false;

  if (jogo.preco <= 0)
    return false;

  if (jogo.ratings < 0)
    return false;

  if (jogo.ratings > 10) 
    return false;


  
  return true
}