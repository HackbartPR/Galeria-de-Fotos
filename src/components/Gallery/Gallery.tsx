//STYLED COMPONENTS
import * as S from './style'
//TIPAGEM
import * as Types from '../../types/Types'


export const Gallery = (props: Types.Gallery)=>{

    //RESPONSÁVEL POR REALIZAR O RETORNO DA FUNÇÃO MAP
    const handleListPhoto = (photo:Types.Photo, index:number) =>{
        return(
            <div className='c-wrapper' key={`wrapper-${index}`} onClick={()=>{props.handleOnClick(photo)}}>
                <img key={`photo-${index}`} src={photo.url} alt={photo.name}></img>
            </div>
        )
    }

    return (
        <S.Gallery>
        {props.photos.map(handleListPhoto)}
        </S.Gallery>
    )
}