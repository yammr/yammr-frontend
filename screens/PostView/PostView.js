import React from 'react';
import {
  View,
  KeyboardAvoidingView,
  FlatList,
  TouchableHighlight,
} from 'react-native';
import { Text, Icon, Divider, Button, ListItem } from 'react-native-elements';
import { colors } from '../../config/theme';
import { style, styles } from './PostView.styles';
import { PostViewHeader, Vote } from '../../components';
import { getTimeAgo } from '../../config/helpers';
import {
  FeedItem,
  BottomComment,
  FeedList,
  Modal,
  TouchablePlatformSpecific,
} from '../../components';
import { inject, observer } from 'mobx-react';
import PostStore from '../../mobx/postStore';

@inject('postStore')
@observer
class PostView extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      modalVisible: false,
    };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'PostView',
      header: null,
      tabBarVisible: false,
    };
  };

  componentDidMount = () => {
    const { postStore, navigation } = this.props;
    const postData = navigation.getParam('postData', {});
    const { postId } = postData;
    console.log(`Getting initial comments`);
    postStore.setSelectedPost(postId);
    postStore.getComments(postId);
  };

  componentWillUnmount = () => {
    console.log(`Postview unmounted`);
  };

  // Used for handling the back arrow on the header
  goBack = () => {
    this.props.navigation.goBack();
  };

  // Used for menu press
  menuHandler = () => {
    console.log(`Clicked menu handler`);
    this.toggleModal();
  };

  // Toggles the menu
  toggleModal = () => {
    this.setState({ modalVisible: !this.state.modalVisible });
  };

  // Used for issuing a service command for a vote on a comment
  commentVoteHandler = (commentId, type, score) => {
    const { postStore, navigation } = this.props;
    const postData = navigation.getParam('postData', {});
    const { postId } = postData;
    console.log(
      `Comment vote handler: ${type} on parentID:${postId} on commentID: ${commentId} with score" ${score}`
    );
    postStore.updateCommentScore(postId, commentId, type, score);
  };

  render() {
    const { navigation, postStore } = this.props;
    const { modalVisible } = this.state;
    const postData = navigation.getParam('postData', {});
    const voteHandler = navigation.getParam('voteHandler', () => {});
    const parentId = postData.postId;
    const storeData = postStore.getPostById(parentId);

    const data = storeData ? storeData : postData;

    const {
      comments,
      postId,
      text,
      score,
      postTime,
      replyCount,
      postType,
      voteType,
    } = data;

    const pT = new Date(postTime.split('.000+0000')[0]);
    return (
      <React.Fragment>
        <PostViewHeader goBack={this.goBack} menuHandler={this.menuHandler} />
        <KeyboardAvoidingView
          style={styles.mainContainer}
          behavior="padding"
          enabled
        >
          <View style={styles.aboveContainer} />
          <View style={styles.contentContainer}>
            <View style={styles.postContainer}>
              <Text style={styles.contentStyle}>{text}</Text>
            </View>
            <View style={styles.sideContainer}>
              <Vote
                postId={postId}
                voteHandler={voteHandler}
                score={score}
                voteType={voteType}
              />
              <Text>{getTimeAgo(pT)}</Text>
            </View>
          </View>
          <View style={styles.belowContainer} />
          <View style={styles.commentContainer}>
            <Text style={styles.commentHeader}>COMMENTS</Text>
            <Divider />
            <View style={styles.commentFeed}>
              {comments && comments.length > 0 ? (
                <FeedList
                  data={comments.slice()}
                  voteHandler={this.commentVoteHandler}
                  isLoading={comments ? false : true}
                />
              ) : (
                <View
                  style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%',
                  }}
                >
                  <Text
                    style={{
                      fontSize: 16,
                    }}
                  >
                    No comments yet
                  </Text>
                </View>
              )}
            </View>

            <BottomComment />
          </View>
        </KeyboardAvoidingView>
        <Modal
          isVisible={modalVisible}
          onBackdropPress={this.toggleModal}
          onBackButtonPress={this.toggleModal}
        >
          <ListItem
            component={TouchablePlatformSpecific}
            title="Report"
            leftIcon={<Icon type="font-awesome" name="flag" />}
          />
          <Divider />
          <ListItem
            component={TouchablePlatformSpecific}
            title="Delete Post"
            leftIcon={<Icon type="font-awesome" name="close" />}
          />
        </Modal>
      </React.Fragment>
    );
  }
}

export default PostView;
