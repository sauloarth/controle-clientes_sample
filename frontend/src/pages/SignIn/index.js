import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';

import Logo from '../../assets/community-grey.svg';
import api from '../../services/api';
import { login } from '../../services/auth';

import { Form, Container } from "./styles";

class SignIn extends Component {
    state = {
        email: "",
        password: ""
    }

    handleSignIn = async e => {
        e.preventDefault();
        const { email, password} = this.state;

        if(!email || !password) {
            this.setState({error: 'Preencha e-mail e senha para fazer login'});
        } else {
            try {
                const response = await api.post('funcionarios/signin', {email, password});
                login(response.data);
                this.props.history.push('/app');
            } catch (err) {
                this.setState({error: `Erro ao entrar: ${err}`});
            }
        }
    }

    render () {
        return (
            <Container>
                <Form onSubmit={this.handleSignIn}>
                    <img src={Logo} alt='App logo'/>
                    {this.state.error && <p>{this.state.error}</p>}

                    <input 
                        type='email' 
                        placeholder='Digite o e-mail'
                        onChange={e => this.setState({ email: e.target.value })}
                    />

                    <input 
                        type='password' 
                        placeholder='Sua senha'
                        onChange={e => this.setState({ password: e.target.value })}
                    />

                    <button type='submit'>Fazer Login</button>
                    <hr />

                    <Link to='/'>Fazer login</Link>
                </Form>
            </Container>
        )
    }
}

export default withRouter(SignIn);