import styled from "styled-components";
import { Form as Unform } from '@unform/web';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Form = styled(Unform)`
  display: flex;
  flex-direction: column;
  align-items: stretch;

  form img {
    height: 80px;
    align-self: center;
    margin-bottom: 30px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 5px;
    text-align: left;
  }

  input {
    width: 100%;
    margin-bottom: 15px;
    padding: 12px 16px;
    border-radius: 4px;
    border: 2px solid #ddd;
    font-size: 15px;
    color: #444;
    transition: border-color 0.2s;
  }

  input:focus {
    border-color: #111;
  }

  button {
    display: block;
    background: #111;
    color: #fff;
    border: 0;
    cursor: pointer;
    border-radius: 4px;
    width: 100%;
    padding: 16px;
    font-weight: bold;
    font-size: 15px;
    transition: background-color 0.2s;
  }

  button:hover {
    background-color: #000;
  }
`;