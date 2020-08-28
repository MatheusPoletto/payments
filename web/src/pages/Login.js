import React, { useRef, useEffect } from 'react';
import '../App.css';
import { Form } from '@unform/web';
import { Scope } from '@unform/core';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import "../styles.css";

import Input from '../components/Form/Input';


function Login() {
  const formRef = useRef(null);

  async function handleSubmit(data, { reset }){
    try{
      formRef.current.setErrors({});

      const schema = Yup.object().shape ({
        email: Yup.string().email().required('O E-mail é obrigatório'),        
        password: Yup.string().min(3, 'Mínimo de 3 caracteres').required('A senha é obrigatória'),                
      });

      await schema.validate(data, {
        abortEarly: false
      });

      reset();

    }catch(err){
      
      if(err instanceof Yup.ValidationError){
        const errorMessages = {};

        err.inner.forEach(error => {
          errorMessages[error.path] = error.message;
        });
        console.log(errorMessages);

        formRef.current.setErrors(errorMessages);
      }else{
        console.log(err)
      }
    }
  }

  return (
    <div className="App">
      <h1>Login</h1>

      <Form ref={formRef}  onSubmit={handleSubmit}>
        <Input type="email" name="email" label="E-mail" />
        <Input type="password" name="password" label="Senha" />
        <button type="submit">Entrar</button>
      </Form>
    </div>
  );
}

export default Login;
