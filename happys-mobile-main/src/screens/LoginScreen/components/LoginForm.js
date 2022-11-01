import React, { useState, useRef, useEffect } from 'react';
import { Field, reduxForm } from 'redux-form';
import {
  StyleSheet,
  View,
  TouchableOpacity,
  Keyboard,
  TouchableWithoutFeedback,
  ActivityIndicator,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Image,
  Alert,
  Dimensions,
} from 'react-native';
//Colors
import Colors from '../../../utils/Colors';
import CustomText from '../../../components/UI/CustomText';
import { Ionicons } from '@expo/vector-icons';
//Redux
import { useDispatch, useSelector } from 'react-redux';
//Action
import { Login as LoginAction } from '../../../reducers';
//PropTypes check
import PropTypes from 'prop-types';
import renderField from './RenderField';
//Authentiation Touch ID Face ID
import * as LocalAuthentication from 'expo-local-authentication';
import * as SecureStore from 'expo-secure-store';
import { secretKey } from '../../../utils/Config';

const { height } = Dimensions.get('window');

//Validation
const validate = (values) => {
  const errors = {};
  // if (!values.email) {
  //   errors.email = 'Email không được bỏ trống';
  // } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //   errors.email = 'Email không hơp lệ';
  // }
  // if (!values.password) {
  //   errors.password = 'Mật khẩu không được bỏ trống';
  // } else if (values.password.length < 6) {
  //   errors.password = 'Mật khẩu phải nhiều hơn hoặc bằng 6 ký tự';
  // }
  return errors;
};

const Login = (props) => {
  const dispatch = useDispatch();
  const { handleSubmit } = props;
  const [showPass, setShowPass] = useState(false);
  const auth = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);

  const submit = async (values) => {
    try {
      setLoading(true);
      await dispatch(LoginAction(values.username, values.password));
      props.navigation.navigate('Home');
    } catch (err) {
      setLoading(false);
      alert(err);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS == 'ios' ? 'position' : 'height'}>
      <View style={{ position: "absolute", top: 0 }}>
				<Image
					source={require("../../../assets/Images/auth/background_login.png")}
					resizeMode="contain"
					resizeMethod="auto"
				/>
			</View>
      <TouchableOpacity
        onPress={() => {
          props.navigation.goBack();
        }}
        style={{ position: 'absolute', top: 50, left: 20 }}
      >
        <Ionicons name="ios-arrow-back" size={35} color={Colors.leave_green} />
      </TouchableOpacity>
      <View style={styles.header}>
        <View>
          <CustomText style={styles.title}>Welcome Back!</CustomText>
        </View>
      </View>
      <ScrollView>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View
            style={{
              flexDirection: 'column',
              marginHorizontal: 10,
              zIndex: -1,
            }}
          >
            <View>
              <Field
                name="username"
                keyboardType="default"
                label="Username"
                icon="account"
                component={renderField}
              />
              <Field
                name="password"
                keyboardType="default"
                label="Password"
                component={renderField}
                secureTextEntry={showPass ? false : true}
                passIcon="eye"
                icon="lock"
                showPass={showPass}
                setShowPass={setShowPass}
              />
            </View>
            <View style={styles.group}>
              <TouchableOpacity
                onPress={() => {
                  props.navigation.navigate('ForgetPwScreen');
                }}
              >
                <CustomText
                  style={{
                    ...styles.textSignSmall,
                    fontFamily: 'Roboto-Medium',
                  }}
                >
                  Forgot Password ?
                </CustomText>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={handleSubmit(submit)}
              style={{ marginVertical: 10, alignItems: 'center' }}
            >
              <View style={styles.signIn}>
                {loading ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <CustomText style={styles.textSign}>LOGIN</CustomText>
                )}
              </View>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

Login.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
};
const styles = StyleSheet.create({
  group: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginVertical: 10,
  },
  header: {
    marginTop: height * 0.3,
    marginBottom: 10,
    marginHorizontal: 20,
  },
  title: {
    color: Colors.leave_green,
    fontSize: 28,
    fontFamily: 'Roboto-Bold',
    textAlign: 'center',
  },
  text: {
    color: '#fff',
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    flexDirection: 'row',
    backgroundColor: Colors.leave_green,
  },
  textSign: {
    fontSize: 15,
    color: '#fff',
    fontFamily: 'Roboto-Medium',
    fontWeight: '700'
  },
  textSignSmall: {
    color: Colors.leave_green,
    textAlign: 'center',
  },
  center: {
    alignItems: 'center',
  },
  circleImage: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    padding: 20,
    borderRadius: 55,
    borderStyle: 'dashed',
    borderColor: Colors.grey,
  },
  loginOpt: {
    color: Colors.lighter_green,
    fontFamily: 'Roboto-Medium',
    marginBottom: 10,
  },
});
export const LoginForm = reduxForm({
  form: 'login', // a unique identifier for this form
  validate, // <--- validation function given to redux-form
})(Login);
