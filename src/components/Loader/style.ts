import styled from 'styled-components'

export const Loader = styled.div`
  width: 100%;
  height: auto;

  padding: 5rem;

  display: flex;
  justify-content: center;
  align-items: center;

  .c-loader {
    margin: 2rem;

    width: 3.5rem;
    height: 3.5rem;

    border: 0.375rem solid #000000;
    border-top-color: #ffffff;
    border-radius: 50%;

    animation: loading_rotate 1s infinite;
  }

  @keyframes loading_rotate {
    to {
      transform: rotate(1turn);
    }
  }
`
