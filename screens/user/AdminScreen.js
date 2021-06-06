import React, { useState, useEffect, useReducer, useCallback } from 'react';
import {
  Text,
  ScrollView,
  View,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  ActivityIndicator,
  Alert,
  ActionSheetIOS
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useDispatch } from 'react-redux';

import Input from '../../components/UI/Input';
import Card from '../../components/UI/Card';
import Colors from '../../constants/Colors';
import * as authActions from '../../store/actions/auth';
import { color } from 'react-native-reanimated';

const FORM_INPUT_UPDATE = 'FORM_INPUT_UPDATE';

const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const AdminScreen = props => {
  const [isSignup,setIsSignup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: '',
      password: '',
      name: '',
      mobile: '',
      location:''
    },
    inputValidities: {
      email: false,
      password: false,
      name: false,
      mobile: false,
      location:false
    },
    formIsValid: false
  });

  useEffect(() => {
    if (error) {
      Alert.alert('An Error Occurred!', error, [{ text: 'Okay' }]);
    }
  }, [error]);

  const authHandler = async () => {
    let action;
    if(isSignup){
        action = authActions.Adminsignup(
            formState.inputValues.email,
            formState.inputValues.password,
            formState.inputValues.name,
            formState.inputValues.mobile,
            formState.inputValues.location
        );
    }else{
        action = authActions.Adminlogin(
            formState.inputValues.email,
            formState.inputValues.password
        );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      <LinearGradient colors={['#ffedff', '#ffe3ff']} style={styles.gradient}>
        <Card style={styles.authContainer}>
          <ScrollView>
            <Text style={{color:'black',fontSize:22,textAlign:'center',paddingBottom:25,fontFamily: 'open-sans-bold'}}>Online Shop Cart</Text>
            {isSignup?(
            <Input
            id="name"
            label="Organisation Name"
            keyboardType="default"
            required
            autoCapitalize="none"
            errorText="Please enter a valid username."
            onInputChange={inputChangeHandler}
            initialValue=""
            />):
            null}   
            <Input
              id="email"
              label="E-Mail"
              keyboardType="email-address"
              required
              email
              autoCapitalize="none"
              errorText="Please enter a valid email address."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            <Input
              id="password"
              label="Password"
              keyboardType="default"
              secureTextEntry
              required
              minLength={5}
              autoCapitalize="none"
              errorText="Please enter a valid password."
              onInputChange={inputChangeHandler}
              initialValue=""
            />
            {isSignup?(
                <>
                <Input
                id="mobile"
                label="Mobile"
                keyboardType="decimal-pad"
                required
                minLength={10}
                autoCapitalize="none"
                errorText="Please enter a valid mobile number."
                onInputChange={inputChangeHandler}
                initialValue=""
                />
                <Input
                  id="location"
                  label="Location"
                  keyboardType="default"
                  required
                  autoCapitalize="none"
                  errorText="Please enter a valid address."
                  onInputChange={inputChangeHandler}
                  initialValue=""
                />
                </>
            ):null}
            <View style={styles.buttonContainer}>
              {isLoading ? (
                <ActivityIndicator size="small" color={Colors.primary} />
              ) : (
                <Button
                  title={isSignup ? 'SignUp' : 'Login'}
                  color={Colors.primary}
                  onPress={authHandler}
                />
              )}
            </View>
            <View style={styles.buttonContainer}>
              <Button
                title={isSignup ? 'Login To Mart' : 'Online Mart Signup'}
                color={Colors.accent}
                onPress={() => {
                  setIsSignup(prevState => !prevState);
                }}
              />
            </View>
          </ScrollView>
        </Card>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

export const screenOptions = {
  headerTitle: 'Stores Authentication'
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  authContainer: {
    width: '80%',
    maxWidth: 400,
    maxHeight: 600,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AdminScreen;
