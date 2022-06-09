//STYLED COMPONENTS
import * as S from './style'
//TIPAGEM
import * as Types from '../../types/Types'
//IMAGENS
import trash_img from '../../assets/images/trash.png'
import close_img from '../../assets/images/close.png'


export const Modal = (props: Types.Modal)=>{
    return(
        <S.Modal>
            <div className='c-wrapper'>
                <img className='e-trash' src={trash_img} onClick={()=>props.handleDeletePhoto(props.photo.name)}/>
                <img className='e-close' src={close_img} onClick={props.handleCloseModal}/>
                <img className='e-photo' src={props.photo.url} />
            </div>            
        </S.Modal>
    )
}