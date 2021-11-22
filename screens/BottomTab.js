import * as React from 'react';
import { Text, View } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

function Feed() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Feed!</Text>
      </View>
    );
  }
  
  function Settings() {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Settings!</Text>
      </View>
    );
  }



  export default function BottomTab() {
    return (
  
        <Tab.Navigator initialRouteName="Feed" >
          <Tab.Screen name="Feed" component={Feed} options={{header: () => null}} />
          <Tab.Screen name="Settings" component={Settings} options={{header: () => null}} />
        </Tab.Navigator>

    );
  }