//STYLED COMPONENTS
import * as S from './style'
//IMAGENS
import empty_img from '../../assets/images/empty.png'

export const Empty = ()=>{
    return (
        <S.Empty>
            <div className='c-emoticon'>😔</div>
            <div className='c-text'>Não há fotos cadastradas</div>
        </S.Empty>
    )
}