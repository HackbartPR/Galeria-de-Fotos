import styled from 'styled-components'

export const Uploader = styled.div`
  width: 100%;
  height: auto;

  padding: 0rem 8rem;

  .c-form {
    position: relative;
    width: 100%;
    height: 100%;

    padding: 1rem 2rem;

    background-color: #27281f;
    border-radius: 10px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    color: #ffffff;
  }

  .c-form__input-file {
    display: inline-flex;
    gap: 1rem;
    align-items: center;

    label {
      padding: 0.8rem 1.2rem;

      border: none;
      border-radius: 5px;

      background-color: #756df4;

      cursor: pointer;
      transition: 0.3s ease-in-out;

      font-size: 16px;

      &:hover {
        opacity: 0.85;
      }
    }

    input[type='file'] {
      display: none;
    }
  }

  input[type='submit'] {
    padding: 0.8rem 1.2rem;

    border: none;
    border-radius: 5px;

    background-color: #756df4;

    cursor: pointer;
    transition: 0.3s ease-in-out;

    font-size: 16px;

    color: #ffffff;

    &:hover {
      opacity: 0.85;
    }
  }
`
