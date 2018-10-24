import React from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import { Button, Text, Header, Input, Icon } from 'react-native-elements';
import { withTheme } from 'react-native-elements';
import { styles, style } from './Register.styles';
import { colors } from '../../config/theme';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: true,
    };

    this.viewPassword = this.viewPassword.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  viewPassword() {
    this.setState({
      visible: !this.state.visible,
    });
  }

  render() {
    return (
      <KeyboardAvoidingView style={styles.container} behavior="padding">
        <Text style={styles.header}>Register</Text>
        <View style={styles.inputContainer}>
          <Input
            label="EMAIL"
            labelStyle={{ color: colors.red }}
            placeholder="Email"
          />
          <Input
            placeholder="Password"
            labelStyle={{ color: colors.red }}
            label="PASSWORD"
            secureTextEntry={this.state.visible}
            rightIcon={
              <Icon
                type="font-awesome"
                name={this.state.visible ? 'eye' : 'eye-slash'}
                color={colors.red}
                onPress={this.viewPassword}
              />
            }
          />
        </View>
        <Button
          buttonStyle={{ backgroundColor: colors.red }}
          title="REGISTER"
        />
      </KeyboardAvoidingView>
    );
  }
}

export default Register;