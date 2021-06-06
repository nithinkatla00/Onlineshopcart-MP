import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  StyleSheet,
  ActivityIndicator
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';

import Colors from '../../constants/Colors';

const paymentScreen = props => {
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();
  const sendOrderHandler = () => {
    props.navigation.navigate('Organisations');
  };
  setTimeout(()=>{setIsLoading(false)}, 3000); 
  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }
  return (
    <View style={styles.main}>
          <Button
            color={Colors.accent}
            title="UPI"
            onPress={sendOrderHandler}
          />
          <Button
            color={Colors.accent}
            title="Debit Card"
            onPress={sendOrderHandler}
          />
          <Button
            color={Colors.accent}
            title="Credit Card"
            onPress={sendOrderHandler}
          />
    </View>
  );
};

export const screenOptions = {
  headerTitle: 'Payment Gateway'
};

const styles = StyleSheet.create({
    centered: {
        flex:1,
        justifyContent:'center',
        alignItems:'center'
  },
  main:{
      flex:1
  }
});

export default paymentScreen;
