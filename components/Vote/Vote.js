import React from 'react';
import { View } from 'react-native';
import {
  Text,
  Icon,
  Header,
  ButtonGroup,
  ListItem,
} from 'react-native-elements';
import { colors } from '../../config/theme';
import { style, styles } from './Vote.styles';
import TouchablePlatformSpecific from '../TouchablePlatformSpecific/TouchablePlatformSpecific';

export class Vote extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      score: this.props.score || 0,
      voteType: this.props.voteType, // null = no vote, up = upvote, down = downvote
    };

    this.handleScore = this.handleScore.bind(this);
  }

  handleScore = type => {
    let score = 0;
    let voteType = null;
    let { voteHandler, postId } = this.props;

    switch (type) {
      case 'up':
        console.log('Upvote');
        if (this.state.voteType === 'down') {
          voteType = 'up';
          score = this.state.score + 2;
        }
        if (this.state.voteType === 'up') {
          voteType = null;
          score = this.state.score - 1;
        }
        if (this.state.voteType == null) {
          voteType = 'up';
          score = this.state.score + 1;
        }

        this.setState({
          voteType: voteType,
          score: score,
        });

        break;

      case 'down':
        console.log('Downvote');
        if (this.state.voteType === 'up') {
          voteType = 'down';
          score = this.state.score - 2;
        }
        if (this.state.voteType === 'down') {
          voteType = null;
          score = this.state.score + 1;
        }
        if (this.state.voteType == null) {
          voteType = 'down';
          score = this.state.score - 1;
        }

        this.setState({
          voteType: voteType,
          score: score,
        });
        break;
    }

    // Callback to parent to handle the vote action
    if (voteHandler) {
      voteHandler(postId, type);
    } else {
      console.log(
        `Warning: voteHandler called on Vote without being passed a voteHandler prop`
      );
    }
  };

  render() {
    const { voteType, score } = this.state;
    return (
      <View style={styles.container}>
        <Icon
          component={TouchablePlatformSpecific}
          iconStyle={
            voteType === 'up' ? [style.vote, style.upvote] : style.vote
          }
          type="ionicon"
          name="ios-arrow-up"
          onPress={() => this.handleScore('up')}
        />
        <Text style={style.scoreStyle}>{score}</Text>
        <Icon
          component={TouchablePlatformSpecific}
          iconStyle={
            voteType === 'down' ? [style.vote, style.downvote] : style.vote
          }
          type="ionicon"
          name="ios-arrow-down"
          onPress={() => this.handleScore('down')}
        />
      </View>
    );
  }
}
