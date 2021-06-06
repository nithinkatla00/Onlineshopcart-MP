import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform
} from 'react-native';

import Card from '../UI/Card';

const ProductItem = props => {
  let TouchableCmp = TouchableOpacity;

  if (Platform.OS === 'android' && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }
  if(!props.store){
    return (
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: props.image }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.title}</Text>
                <Text style={styles.price}>Rs.{props.price}</Text>
              </View>
              <View style={styles.actions}>
                {props.children}
              </View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    );
  } else{
    return(
      <Card style={styles.product}>
        <View style={styles.touchable}>
          <TouchableCmp onPress={props.onSelect} useForeground>
            <View>
              <View style={styles.imageContainer}>
                <Image style={styles.image} source={{ uri: 'https://images.unsplash.com/photo-1540340061722-9293d5163008?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MXx8Z3JvY2VyeSUyMHN0b3JlfGVufDB8fDB8&ixlib=rb-1.2.1&w=1000&q=80' }} />
              </View>
              <View style={styles.details}>
                <Text style={styles.title}>{props.name}</Text>
                <Text style={styles.price}>{props.location}</Text>
              </View>
              <View style={styles.actions}>
                <Text style={styles.price}>{props.email}</Text>
                <Text style={styles.price}>contact:{props.mobile}</Text>
              </View>
            </View>
          </TouchableCmp>
        </View>
      </Card>
    )
  }
};

const styles = StyleSheet.create({
  product: {
    height: 300,
    margin: 20
  },
  touchable: {
    borderRadius: 10,
    overflow: 'hidden'
  },
  imageContainer: {
    width: '100%',
    height: '60%',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: 'hidden'
  },
  image: {
    width: '100%',
    height: '100%'
  },
  details: {
    alignItems: 'center',
    height: '17%',
    padding: 10
  },
  title: {
    fontFamily: 'open-sans-bold',
    fontSize: 20,
    marginVertical: 2
  },
  price: {
    fontFamily: 'open-sans',
    fontSize: 14,
    color: '#888'
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: '23%',
    paddingHorizontal: 20
  }
});

export default ProductItem;
