import React, { useRef, useEffect } from 'react';
import '../App.css';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import "../styles.css";

import Input from '../components/Form/Input';


function Debt() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try{
      formRef.current.setErrors({});
      
      const schema = Yup.object().shape ({
        descricao: Yup.string().required('A descrição é obrigatória'),        
        // conta: Yup.object().shape({
        //   rua: Yup.string()
        //     .min(3, 'Mínimo de 3 caracteres')
        //     .required('A rua é obrigatória')
        // })
      });

      await schema.validate(data, {
        abortEarly: false
      });

      reset();
      console.log(data);
    }catch(err){
      if(err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        console.log(errorMessages);

        formRef.current.setErrors(errorMessages);
      }
    }
  }

  useEffect(() => {
    setTimeout(() => {
      formRef.current.setData({
        descricao: 'Cartão Havan',        
        conta: {
          codigoDeBarras: '0015 115',
          valor: 150.15,
          dataVencimento: '15/09/2020'
        }
      });

    }, 2000);
  }, [])

  return (
    <div className="App">
      <h1>Contas a Pagar - debt</h1>
      <Link to="/">Go Home</Link>

      <Form ref={formRef}  onSubmit={handleSubmit}>
        <Input name="descricao" label="Descrição" />

        <Scope path="conta">
          <Input name="codigoDeBarras" label="Código de Barras"/>
          <Input type="number" name="valor" label="Valor R$"/>
          <Input name="dataVencimento" label="Data de Vencimento"/>
        </Scope>

        <button type="submit">Salvar</button>
      </Form>
    </div>
  );
}

export default Debt;
