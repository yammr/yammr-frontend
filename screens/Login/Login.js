import React from 'react';
import { View, KeyboardAvoidingView } from 'react-native';
import { Button, Text, Header, Input, Icon } from 'react-native-elements';
import { styles, style } from './Login.styles';
import { colors } from '../../config/theme';
import AuthenticationHeader from '../../components/CustomHeaders/AuthenticationHeaders/AuthenticationHeader';

import { userActions } from '../../actions/user.actions';
import { userConstants } from '../../constants/user.constants';

class Login extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
      passwordError: ' ',
      emailError: ' ',
    };
  }

  _signInAsync = async () => {
    let emailRegex = /\S+@\S+\.edu/;
    let shouldReturn = false;
    if (!this.state.email.match(emailRegex)) {
      this.setState({ emailError: 'Valid .edu email required' });
      shouldReturn = true;
    } else {
      this.setState({ emailError: ' ' });
    }

    if (this.state.password.length < 1) {
      this.setState({ passwordError: 'Password required' });
      shouldReturn = true;
    } else {
      this.setState({ passwordError: ' ' });
    }

    if (shouldReturn) return;

    const { dispatch } = this.props.navigation;
    dispatch(
      userActions.login(this.state.email, this.state.password).then(res => {
        if (res.type === userConstants.LOGIN_SUCCESS) {
          this.props.navigation.navigate('App');
        } else {
          this.setState({
            passwordError: 'Invalid email/password. Please try again.',
          });
        }
        return res;
      })
    );
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
            onChangeText={text => this.setState({ email: text })}
            errorMessage={this.state.emailError}
            labelStyle={style.labelStyle}
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            labelStyle={style.labelStyle}
            label="PASSWORD"
            errorMessage={this.state.passwordError}
            onChangeText={text => this.setState({ password: text })}
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
