import React from 'react';
import { useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';

import { ShopNavigator, Auth1Navigator,MartAdminNavigation } from './ShopNavigator';
import StartupScreen from '../screens/StartupScreen';

const AppNavigator = props => {
  const isAuth = useSelector(state => !!state.auth.token);
  const didTryAutoLogin = useSelector(state => state.auth.didTryAutoLogin);
  const isAdmin = useSelector(state => state.auth.isAdmin);

  return (
    <NavigationContainer>
      {isAuth && isAdmin && <MartAdminNavigation />}
      {isAuth && !isAdmin && <ShopNavigator />}
      {!isAuth && !didTryAutoLogin && <StartupScreen />}
      {!isAuth && didTryAutoLogin && <Auth1Navigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
