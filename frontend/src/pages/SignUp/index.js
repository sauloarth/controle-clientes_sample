import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Logo from '../../assets/community-grey.svg';
import { Form, Container } from './styles';
import api from '../../services/api';

class SignUp extends Component {
    state = {
        nome: "",
        email: "",
        password: ""
    }

    handleSignUp = async e => {
        e.preventDefault();
        const { nome, email, password} = this.state;

        if(!nome || !email || !password) {
            this.setState({error: 'Preencha todos os dados para cadastrar um usuário'});
        } else {
            try {
                await api.post('funcionarios/signup', {nome, email, password});
                this.props.history.push('/');
            } catch (err) {
                this.setState({error: `Erro ao registrar o usuário: ${err}`});
            }
        }
    }

    render () {
        return (
            <Container>
                <Form onSubmit={this.handleSignUp}>
                    <img src={Logo} alt='App logo'/>
                    {this.state.error && <p>{this.state.error}</p>}

                    <input 
                        type='nome' 
                        placeholder='Nome completo'
                        onChange={e => this.setState({ nome: e.target.value })}
                    />

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

                    <button type='submit'>Cadastrar Usuário</button>
                    <hr />

                    <Link to='/'>Fazer login</Link>
                </Form>
            </Container>
        )
    }
}

export default withRouter(SignUp);