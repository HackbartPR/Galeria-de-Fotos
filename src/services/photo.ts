//BIBLIOTECAS
import { storage } from '../libs/firebase'
import { ref, getDownloadURL, listAll, uploadBytes, deleteObject } from 'firebase/storage'
//TIPAGEM
import * as Types from '../types/Types'
//SERVICES
import * as Services from './random'

//LISTA TODOS OS ARQUIVOS CONTIDOS NA PASTA IMAGES
export const getAll = async () => {
  //RESPONSÁVEL POR SALVAR TODOS OS DADOS RESUMIDOS DA PESQUISA
  let resultList: Types.Photo[] = []

  //CRIA UMA REFERÊNCIA DA PASTA ONDE ESTÃO CONTIDAS AS FOTOS
  const imagesFolder = ref(storage, 'images')

  //LISTA TODAS AS FOTOS CONTIDAS NA PASTA IMAGES FOLDER
  const photoList = await listAll(imagesFolder)

  //PERCORRO TODAS AS FOTOS DENTRO DA LISTA RECEBIDA DO FIREBASE
  for (let i in photoList.items) {
    //RECEBE A URL DA PHOTO ATUAL ATRAVÉS DO MÉTODO GETDOWNLOADURL
    const photoUrl = await getDownloadURL(photoList.items[i])

    //ENVIA TODAS AS INFORMAÇÕES RECEBIDAS PARA O ARRAY RESULTADO
    resultList.push({
      name: photoList.items[i].name,
      url: photoUrl,
    })
  }

  return resultList
}

//REALIZA O UPLOAD DE UMA IMAGEM DO DISPOSITIVO PARA O BANCO DE DADOS
export const setFile = async (file: File) => {
  //RECEBE UMA STRING ALEATÓRIA
  const fileName = Services.setRandomString(10)
  //CRIAR REFERÊNCIA DO BANCO DE DADOS, COM DIRETÓRIO E O NOME DO NOVO ARQUIVO
  const storageRef = ref(storage, `images/${fileName}`)

  try {
    //REALIZA O UPLOAD DO ARQUIVO E RECEBE A REFERÊNCIA DA FOTO
    const uploadResp = await uploadBytes(storageRef, file)

    //RECEBE A URL DA PHOTO ATUAL ATRAVÉS DO MÉTODO GETDOWNLOADURL
    const PHOTO_URL = await getDownloadURL(uploadResp.ref)

    //RETORNA O OBJETO DA FOTO RECEM ENVIADA
    return { name: uploadResp.ref.name, url: PHOTO_URL } as Types.Photo
  } catch (error) {
    return new Error('Erro ao realizar o uploading')
  }
}

//REALIZA A EXLCUSÃO DA PHOTO SELECIONADA
export const deleteFile = async (name: string) => {
  //CRIAR REFERÊNCIA DO BANCO DE DADOS, COM DIRETÓRIO E O NOME DO NOVO ARQUIVO
  const storageRef = ref(storage, `images/${name}`)

  try {
    await deleteObject(storageRef)
    return true
  } catch (error) {
    return new Error('Erro ao realizar a exclusão')
  }
}
