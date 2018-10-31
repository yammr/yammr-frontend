import React from 'react';
import { View } from 'react-native';
import { Text, Icon, Header } from 'react-native-elements';
import { colors } from '../../config/theme';
import { style, styles } from './Feed.styles';

class Feed extends React.Component {
  static navigationOptions = {
    title: 'Feed Layout',
  };

  render() {
    return <Text>Feed</Text>;
  }
}

export default Feed;
