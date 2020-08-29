import React, { createRef, Component } from "react";
import { Link, withRouter } from "react-router-dom";

import * as Yup from 'yup';

import api from "../../services/api";
import { login, logout } from "../../services/auth";

import Input from '../../components/Form/Input';

import { Form } from "./styles";

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
            email: Yup.string().email().required('O E-mail é obrigatório'),        
            password: Yup.string().min(3, 'Mínimo de 3 caracteres').required('A senha é obrigatória'),                
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
            this.setState({error: "Houve um problema com o login, verifique suas credenciais."});
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
            <Form ref={this.formRef} onSubmit={this.handleSubmit}>
            
            {this.state.error && <p className="error">{this.state.error}</p>}

            <Input type="email" name="email" label="E-mail" />
            <Input type="password" name="password" label="Senha" />
            
            <button type="submit">Entrar</button>
            <hr />
            {/* <Link to="/signup">Criar conta grátis</Link> */}
            </Form>
        );
    }
}

export default withRouter(Login);