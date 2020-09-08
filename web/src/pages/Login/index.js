import React, { createRef, Component } from "react";
import { Link, withRouter } from "react-router-dom";

import * as Yup from 'yup';
import api from "../../services/api";

import { Form } from '@unform/web';
import Input from '../../components/Form/Input';
import Menu from '../../components/Template/Menu';
import { Alert } from 'react-bootstrap';

import './styles.css'

import { login, logout } from "../../services/auth";

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: ""
          };

        this.formRef = createRef();
    }

    handleSubmit = async (data, { reset }) => {
        try{
        this.formRef.current.setErrors({});

        const schema = Yup.object().shape ({
            email: Yup.string().email().required('O E-mail é obrigatório.'),        
            password: Yup.string().min(3, 'Mínimo de 3 caracteres').required('A senha é obrigatória.'),                
        });

        await schema.validate(data, {
            abortEarly: false
        });

        //reset();

        api.post('auth/authenticate', { ...data })
        .then(res => {
            login(res.data.token);
            this.props.history.push("/");
            
            
        }).catch(e => {
            alert(JSON.stringify(e));
            this.setState({error: "Houve um problema com o login, verifique suas credenciais e tente novamente."});
        });

        }catch(err){
        if(err instanceof Yup.ValidationError){
            const errorMessages = {};

            err.inner.forEach(error => {
            errorMessages[error.path] = error.message;
            });
            console.log(errorMessages);

            this.formRef.current.setErrors(errorMessages);
        }else{
            console.log(err)
        }
        }
    };



    render() {
        logout();
        return (
            <>
            <Menu/>
            <Form ref={this.formRef} onSubmit={this.handleSubmit}>
                <h3 className="text-center">Autenticação</h3>                

                <Input type="email" name="email" label="E-mail" className="form-control" placeholder="Digite seu e-mail" />
                <Input type="password" name="password" label="Senha" className="form-control" placeholder="Digita sua senha" />
                           
                <button type="submit" className="btn btn-primary btn-block">Entrar</button>

                {this.state.error && 
                <Alert className="field-error" variant='danger'>
                {this.state.error}
                </Alert>}
        

                {/* <p className="text-right">
                    Novo usuário? <a href="#">Cadastre-se.</a>
                </p> */}
            </Form></>
        );
    }
}

export default withRouter(Login);