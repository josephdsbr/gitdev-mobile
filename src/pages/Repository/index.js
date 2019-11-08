import React, {Component} from 'react';

export default class Repository extends Component {
  static navigationOptions = ({navigation}) => ({
    title: navigation.getParam('repository').name,
  });

  render() {
    return <WebView source={{uri: 'https://infinite.red'}} />;
  }
}
