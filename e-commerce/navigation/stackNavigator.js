import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Login from "../screens/login";
import Register from "../screens/register";
import Home from "../screens/home";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Entypo from '@expo/vector-icons/Entypo';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';



const StackNavigator = () => {
  const Stack = createNativeStackNavigator();
   const Tab=createBottomTabNavigator();

   const BottomTab=()=>{
     return(
       <Tab.Navigator>

         <Tab.Screen name="Home" component={Home} 
          options={{headerShown:false,tabBarLabel:"Home",tabBarLabelStyle:{color:"#008E97"},tabBarIcon:({focused})=>focused ? (<Entypo name="home" size={24} color="#008E97" />) : (<AntDesign name="home" size={24} color="black" />)}}/>

          
         <Tab.Screen name="Profile" component={Home} 
          options={{headerShown:false,tabBarLabel:"Profile",tabBarLabelStyle:{color:"#008E97"},tabBarIcon:({focused})=>focused ? (<Ionicons name="person-sharp" size={24} color="#008E97" />) : (<Ionicons name="person-outline" size={24} color="black" />)}}/>

          
         <Tab.Screen name="Cart" component={Home} 
          options={{headerShown:false,tabBarLabel:"Cart",tabBarLabelStyle:{color:"#008E97"},tabBarIcon:({focused})=>focused ? (<MaterialCommunityIcons name="cart" size={24} color="#008E97" />) : (<MaterialCommunityIcons name="cart-minus" size={24} color="black" />)}}/>
       </Tab.Navigator>
     )
   }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Register" component={Register} options={{headerShown:false}}/>
        <Stack.Screen name="Main" component={BottomTab} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default StackNavigator;

const styles = StyleSheet.create({});
