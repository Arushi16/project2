import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'

import HomeScreen from '../Screens/HomeScreen'
import DetailScreen from '../Screens/DetailScreen'
const Stack = createStackNavigator()

function MainStackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName='HomeScreen'
        screenOptions={{
            gestureEnabled: true,
            headerStyle: {
                backgroundColor: '#000',
            },
            headerTitleStyle: {
                fontWeight: 'bold',
                fontSize: 18,
            },
            headerTintColor: '#fff',
            headerBackTitleVisible: false, //to make the Home title in Details screen invisible
        }}
        headerMode= 'float' //headerMode is for the heading alignment -> float,screen,none
        >
        <Stack.Screen 
            name='HomeScreen' 
            component={HomeScreen} 
            options = {{title: 'H.O.M.E'}}
        />
        <Stack.Screen 
            name='DetailScreen' 
            component={DetailScreen} 
            options = {({ route }) => ({
                title: route.params.item.Title
            })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default MainStackNavigator