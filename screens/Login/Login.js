import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Header, Input, Icon } from 'react-native-elements';
import { styles, style } from './Login.styles';
import { colors } from '../../config/theme';
import AuthenticationHeader from '../../components/CustomHeaders/AuthenticationHeaders/AuthenticationHeader';

import { userActions } from '../../actions/user.actions';
import { userService } from '../../services';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };
  }

  _signInAsync = async () => {
    const { dispatch } = this.props.navigation;
    console.log('before dispatch');
    await dispatch(userActions.login(this.state.email, this.state.password));
    console.log('after dispatch');
    const userToken = await userService.getUser(); //login(this.state.email, this.state.password);
    if (userToken) this.props.navigation.navigate('App');
  };

  static navigationOptions = ({ navigation }) => {
    return {
      headerStyle: {
        backgroundColor: colors.transparent,
      },
      headerBackImage: (
        <Icon type="ionicons" name="arrow-back" title="Info" size={28} />
      ),
      headerTransparent: true,
    };
  };

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Log In</Text>
        <View style={styles.inputContainer}>
          <Input
            label="EMAIL"
            onChangeText={text => this.setState({ ...this.state, email: text })}
            labelStyle={style.labelStyle}
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            labelStyle={style.labelStyle}
            label="PASSWORD"
            onChangeText={text =>
              this.setState({ ...this.state, password: text })
            }
            secureTextEntry
          />
        </View>
        <Text style={styles.forgotPassword}>Forgot your password?</Text>
        <Button
          buttonStyle={style.loginButton}
          onPress={this._signInAsync}
          title="LOG IN"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Login;
