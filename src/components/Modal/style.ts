import styled from 'styled-components'

export const Modal = styled.div`
  position: relative;
  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 3rem 8rem;

  .c-wrapper {
    position: relative;
    max-width: 70%;
    max-height: 70%;

    padding: 1.5rem;

    background-color: #27281f;
    border-radius: 10px;

    display: flex;
    justify-content: center;
    align-items: center;

    .e-photo {
      position: relative;
      max-width: 1000px;
      max-height: 650px;

      border-radius: 10px;
    }

    .e-trash {
      position: absolute;
      top: 5px;
      right: 5px;
      z-index: 20;

      max-width: 40px;
      min-width: 30px;
      max-height: auto;
      min-height: auto;

      cursor: pointer;

      opacity: 0.4;
      transform: scale(0.9);

      transition: 0.3s ease-in-out;

      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }

    .e-close {
      position: absolute;
      top: 5px;
      left: 5px;
      z-index: 20;

      max-width: 40px;
      min-width: 30px;
      max-height: auto;
      min-height: auto;

      cursor: pointer;

      opacity: 0.4;
      transform: scale(0.9);

      transition: 0.3s ease-in-out;

      &:hover {
        opacity: 1;
        transform: scale(1);
      }
    }
  }
`
