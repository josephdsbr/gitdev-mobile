import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import {Keyboard, ActivityIndicator} from 'react-native';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  Container,
  Form,
  Input,
  SubmitButton,
  List,
  User,
  Avatar,
  Name,
  Bio,
  ProfileButton,
  ProfileButtonText,
} from './styles';

import api from '../../services/api';

export default class Main extends Component {
  state = {
    newUser: '',
    users: [],
    loading: false,
  };

  static navigationOptions = {
    title: 'Usuário',
  };

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
    }).isRequired,
  };

  async componentDidMount() {
    const users = await AsyncStorage.getItem('users');

    if (users) {
      this.setState({users: JSON.parse(users)});
    }
  }

  async componentDidUpdate(_, prevState) {
    const {users} = this.state;
    if (prevState.users !== users) {
      AsyncStorage.setItem('users', JSON.stringify(users));
    }
  }

  handleAddUser = async () => {
    const {users, newUser} = this.state;
    this.setState({loading: true});
    const response = await api.get(`/users/${newUser}`);

    const {name, login, bio, avatar_url: avatar} = response.data;

    this.setState({
      users: [...users, {name, login, bio, avatar}],
      newUser: '',
      loading: false,
    });

    Keyboard.dismiss();
  };

  handleNavigate = user => {
    const {navigation} = this.props;

    navigation.navigate('User', {user});
  };

  render() {
    const {users, newUser, loading} = this.state;
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
          <SubmitButton onPress={this.handleAddUser} loading={loading}>
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Icon name="add" size={20} color="#FFF" />
            )}
          </SubmitButton>
        </Form>

        <List
          data={users}
          keyExtractor={user => user.login}
          renderItem={({item}) => (
            <User>
              <Avatar source={{uri: item.avatar}} />
              <Name>{item.name}</Name>
              <Bio>{item.bio}</Bio>
              <ProfileButton onPress={() => this.handleNavigate(item)}>
                <ProfileButtonText>Ver perfil</ProfileButtonText>
              </ProfileButton>
            </User>
          )}
        />
      </Container>
    );
  }
}
