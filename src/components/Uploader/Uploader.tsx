//LIBRARIES
import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react'
//STYLED COMPONENTS
import * as S from './style'
//TIPAGEM
import * as Types from '../../types/Types'

export const Uploader = (props: Types.Uploader )=>{
    //REPONSÁVEL POR GUARDAR O ARQUIVO SELECIONADO PELA LABEL DO INPUT FILE
    const [file, setFile] = useState('Nenhum arquivo selecionado')

    //RESPONSÁVEL POR RECEBER E SALVAR O NOME DO ARQUIVO SELECIONADO NO INPUT FILE
    const handleOnChange = (e:ChangeEvent<HTMLInputElement>)=>{
        e.target.value ?  setFile(e.target.value) : setFile('Nenhum arquivo selecionado');
    }

    useEffect(()=>{
        //CASO O STATE UPLOADING ESTEJA COMO TRUE, OU SEJA, ESTÁ ENVIANDO O ARQUIVO
        props.uploading && setFile('Enviando arquivo')
        //CASO O STATE UPLOADING ESTEJA COMO FALSE, OU SEJA, O ARQUIVO FOI ENVIADO
        !props.uploading && setFile('Nenhum arquivo selecionado')
    },[props.uploading])

    return(
        <S.Uploader>
            <form className='c-form' method='POST' onSubmit={props.handleOnSubmit}>
                <div className='c-form__input-file'>
                    <label htmlFor='btnFile'>Escolher arquivos</label>
                    <span>{file}</span>
                    <input id='btnFile' type='file' name='file' onChange={handleOnChange}/>
                </div>
                <input  type='submit' name='button' value='Enviar' />
            </form>
        </S.Uploader>
    )
}