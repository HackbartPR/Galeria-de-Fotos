import styled from 'styled-components'

export const Gallery = styled.div`
  width: 100%;
  height: auto;

  display: grid;
  grid-template-columns: repeat(5, 1fr);
  justify-items: center;
  gap: 1rem;

  padding: 3rem 8rem;

  .c-wrapper {
    width: 180px;
    height: 150px;
    padding: 0.5rem;

    background-color: #27281f;
    border-radius: 10px;

    display: inline-flex;
    align-items: center;
    justify-content: center;

    cursor: pointer;
    transform: scale(1);
    transition: 0.3s ease-in-out;

    &:hover {
      transform: scale(1.1);
    }
  }

  img {
    position: relative;
    max-width: 100%;
    max-height: 100%;
  }
`
