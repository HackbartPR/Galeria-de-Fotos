//BIBLIOTECAS
import {useEffect, useState, FormEvent} from 'react';
//STYLED COMPONENTS
import {Header} from './components/Header/Header'
import { Loader } from './components/Loader/Loader';
import { Empty } from './components/Empty/Empty';
import {Gallery} from './components/Gallery/Gallery';
import { Uploader } from './components/Uploader/Uploader';
import { Modal } from './components/Modal/Modal';
//SERVICES
import * as Services from './services/photo';
//TYPES
import * as Types from './types/Types';

export function App() {
  //RESPONSÁVEL POR INDICAR QUE A PÁGINA ESTÁ CARREGANDO AS INFORMAÇÕES
  const [loading, setLoading] = useState(true);
  //RESPONSÁVEL POR INDICAR O LOADING DO UPLOADING DE UMA NOVA FOTO
  const [uploading, setUploading] = useState(false);
  //RESPONSÁVEL  POR GUARDAR TODAS AS FOTOS RECEBIDAS DO SERVICES PHOTOS
  const [photos, setPhotos] = useState<Types.Photo[]>([]);
  //RESPONSÁVEL POR GUARDAR O STATUS DO MODAL, OU SEJA, SE DEVE APARECER OU NÃO
  const [showModal, setShowModal] = useState(false);
  //RESPONSÁVEL POR GUARDAR A URL DO MODAL
  const [modalPhoto, setModalPhoto] = useState<Types.Photo>(Types.PhotoDefault);

  //RESPONSÁVEL POR REALIZAR A CHAMADA DO SERVIÇOS DE PHOTOS
  useEffect(()=>{
    /* REALIZAR A CHAMADA DA FUNÇÃO GETALL DENTRO DOS SERVICES
     * PARA CHAMAR UM FUNÇÃO ASSÍNCRONA DENTRO DE UM USEEFFECT, DEVE-SE CRIAR UMA FUNÇÃO E CHAMÁ-LA EM SEGUIDA */
    const handleGetAll = async ()=>{
      //SETAR LOADING COMO TRUE, OU SEJA, A PÁGINA ESTÁ CARREGANDO INFORMAÇÕES
      setLoading(true);
      //RECEBE TODAS AS FOTOS DO SERVICE
      setPhotos(await Services.getAll());
      //SETA O LOADING COMO TRUE, INDICANDO QUE O CARREGAMENTO ESTÁ CONCLUÍDO
      setLoading(false);
    }
    //CHAMANDO A FUNÇÃO CRIADA ACIMA
    handleGetAll();

  }, [])

  //RESPONSÁVEL POR GERENCIAR O ENVIO DO FORMULÁRIO
  const handleOnSubmit = async (e:FormEvent<HTMLFormElement>)=>{
    //EVITA O ENVIO DO FORMULÁRIO PARA O SERVIDOR LOCALHOST
    e.preventDefault()
    //CRIA UM NOVO OBJETO PARA FORMATAR OS DADOS RECEBIDOS DO FORM EVENT
    const formData = new FormData(e.currentTarget)
    //RECEBE TODAS AS INFORMAÇÕES DO OBJETO CRIADO
    const file = formData.get('file') as File
    
    //VERIFICAR SE O ARQUIVO FOI SELECIONADO
    if(!file) return 
    //VERIFICAR SE O ARQUIVO POSSUI ALGUM TAMANHO (CORROMPIDO)
    if(file.size == 0) return
    //VERIFICAR SE O ARQUIVO É DO TIPO IMAGEM
    if(!['image/jpeg', 'image/jpg', 'image/png'].includes(file.type)) return

    //INICIALIZA O STATUS DE UPLOADING
    setUploading(true)
    //REALIZA O ENVIO E RECEBE A REFERÊNCIA DA FOTO ENVIADA OU ALGUM ERRO
    const newPhoto = await Services.setFile(file)

    //VERIFICA SE NÃO HOUVE ERRO DE ENVIO
    if(newPhoto instanceof Error){
      alert(newPhoto.message)
      setUploading(false)
      return  
    } 

    //ENVIA PARA O ARRAY DE PHOTOS A FOTO RECÉM ENVIADA
    setPhotos([...photos, newPhoto])
    //FINALIZA O STATUS DE UPLOADING
    setUploading(false)
  }

  //RESPONSÁVEL POR IDENTIFICAR SE UMA FOTO FOI CLICADA, E MOSTRAR O MODAL DESSA FOTO
  const handleShowModal = (photo:Types.Photo)=>{
    setModalPhoto(photo)
    setShowModal(true)    
  }

  //RESPONSÁVEL POR IDENTIFICAR QUE A FOTO DO MODAL FOI FECHADA
  const handleCloseModal = ()=>{
    setShowModal(false)    
  }

  //RESPONSÁVEL POR ECLUIR A FOTO DO MODAL
  const handleDeletePhoto = async (name: string)=>{
    //REALIZA A EXCLUSÃO DA PHOTO
    const isDeleted = await Services.deleteFile(name)
    
    //VERIFICA SE HOUVE ALGUM ERRO NA EXCLUSÃO
    if(isDeleted instanceof Error){
      alert(isDeleted.message)
      return setShowModal(false)          
    }

    //RECEBE UMA CÓPIA DE PHOTOS
    const newPhotos = [...photos]
    //RECEBERÁ O INDEX DA FOTO A SER EXCLUÍDA
    let index = 0 

    //PERCORRE TODO O ARRAY DE FOTOS E VERIFICA QUAL POSSUI O MESMO NOME DO PARAMETRO
    for(let i  in newPhotos){
      //VERIFICA SE A FOTO DO INDICE ATUAL É A QUE FOI EXCLUÍDA
      if(newPhotos[i].name === name){
        index = parseInt(i);
        break
      }
    }
    
    //REMOVE A FOTO DO ARRAY CÓPIA
    newPhotos.splice(index, 1)
    //SET UM NOVO ARRAY DE FOTOS
    setPhotos(newPhotos)
    //FECHA O MODAL
    setShowModal(false)
  }

  return (
    <>
      {/* HEADER */}
      <Header />      
      {/* CARREGANDO AS FOTOS */}
      {loading && <Loader />}
      {/* UPLOADER DE FOTOS*/}
      {!loading && !showModal && <Uploader handleOnSubmit={handleOnSubmit} uploading={uploading}/>}
      {/* FOTOS CARREGADAS, MAS SEM FOTOS SALVAS */}
      {!loading && photos.length == 0 && <Empty />}
      {/* FOTOS CARREGADAS E COM FOTOS ENCONTRADAS E O MODAL ESCONDIDO */}
      {!loading && photos.length > 0 && !showModal && <Gallery photos={photos} handleOnClick={handleShowModal}/>}
      {/* MOSTRAR O MODAL */}
      {showModal && <Modal photo={modalPhoto} handleCloseModal={handleCloseModal} handleDeletePhoto={handleDeletePhoto}/>}      
    </>
    
  )
}


