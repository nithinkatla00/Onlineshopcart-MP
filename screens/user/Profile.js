import React,{useEffect} from 'react';
import {View,Text,StyleSheet} from 'react-native';
import {useSelector,useDispatch} from 'react-redux';
import HeaderButton from '../../components/UI/HeaderButton';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import Card from '../../components/UI/Card';
import { fetchProfile } from '../../store/actions/products'

const Profile=()=>{
    const state1=useSelector(state=>state.auth);
    const isAdmin=useSelector(state=>state.auth.isAdmin);
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(fetchProfile(isAdmin));
    },[])
    return(
      <View style={styles.centered}>
      <Card style={styles.card}>
          <View style={{padding:'5%'}}>
            <Text style={styles.inputfield}>Name  : {state1.name}</Text>
            <Text style={styles.inputfield}>email :  {state1.email}</Text>
            <Text style={styles.inputfield}>Mobile number : {state1.mobile}</Text>
            <Text style={styles.inputfield}>userIdToken  : {state1.userId}</Text>
          </View>
      </Card>
      </View>
    )
}
const styles=StyleSheet.create({
    centered:{
        flex:1,
        alignItems:'center',
        marginTop:'10%'
    },
    card: {
      width: '80%',
      maxWidth: 400,
      maxHeight: 600,
      padding: 20
    },
    inputfield:{
      padding:'2%',
      fontFamily: 'open-sans-bold',
      fontSize: 13,
      marginVertical: 2
    }
})
export const screenOptions = navData => {
    return {
      headerTitle: 'Profile',
      headerLeft: () => (
        <HeaderButtons HeaderButtonComponent={HeaderButton}>
          <Item
            title="Menu"
            iconName={Platform.OS === 'android' ? 'md-menu' : 'ios-menu'}
            onPress={() => {
              navData.navigation.toggleDrawer();
            }}
          />
        </HeaderButtons>
      ),
    };
  };
export default Profile;