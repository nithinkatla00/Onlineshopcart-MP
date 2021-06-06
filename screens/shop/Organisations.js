import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  FlatList,
  Button,
  Platform,
  ActivityIndicator,
  StyleSheet
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../../components/UI/HeaderButton';
import ProductItem from '../../components/shop/ProductItem';
import Colors from '../../constants/Colors';
import * as StoresActions from '../../store/actions/organisation';

const OrganisationsScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const stores = useSelector(state => state.organisations.stores);
  const dispatch = useDispatch();

  const loadStores = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(StoresActions.fetchStores());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const unsubscribe = props.navigation.addListener('focus', loadStores);

    return () => {
      unsubscribe();
    };
  }, [loadStores]);

  useEffect(() => {
    setIsLoading(true);
    loadStores().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadStores]);

  const selectItemHandler = (localId) => {
    props.navigation.navigate('ProductsOverview', {
      storeId: localId
    });
  };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadStores}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && stores.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No Organisations found.!</Text>
      </View>
    );
  }
  return (
    <FlatList
      onRefresh={loadStores}
      refreshing={isRefreshing}
      data={stores}
      keyExtractor={item => item.id}
      renderItem={itemData => (
        <ProductItem
          email={itemData.item.email}
          mobile={itemData.item.mobile}
          location={itemData.item.location}
          name={itemData.item.name}
          store={true}
          onSelect={() => {
            selectItemHandler(itemData.item.localId);
          }}
        >
        </ProductItem>
      )}
    />
  );
  }
export const screenOptions = navData => {
  return {
    headerTitle: 'All Organisations',
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
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="Cart"
          iconName={Platform.OS === 'android' ? 'md-cart' : 'ios-cart'}
          onPress={() => {
            navData.navigation.navigate('Cart');
          }}
        />
      </HeaderButtons>
    )
  };
};

const styles = StyleSheet.create({
  centered: { flex: 1, justifyContent: 'center', alignItems: 'center' }
});

export default OrganisationsScreen;
