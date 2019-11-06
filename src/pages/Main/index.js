import React, {Component} from 'react';

import {Keyboard} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {Container, Form, Input, SubmitButton} from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
  };

  handleAddUser = async () => {
    console.tron.log('date');
    const {users, newUser} = this.state;
    const response = await api.get(`/users/${newUser}`);

    const {name, login, bio, avatar} = response;

    this.setState({
      users: [...users, {name, login, bio, avatar}],
      newUser: '',
    });

    Keyboard.dismiss();
  };

  render() {
    const {users, newUser} = this.state;
    return (
      <Container>
        <Form>
          <Input
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="Adicionar Usuário"
            value={newUser}
            onChangeText={text => this.setState({newUser: text})}
            returnKeyType="send"
            onSubmitEditing={this.handleAddUser}
          />
          <SubmitButton onPress={this.handleAddUser}>
            <Icon name="add" size={20} color="#FFF" />
          </SubmitButton>
        </Form>
      </Container>
    );
  }
}

Main.navigationOptions = {
  title: 'Main',
};
