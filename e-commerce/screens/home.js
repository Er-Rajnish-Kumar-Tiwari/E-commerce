import { Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView style={{flex:1,backgroundColor:"white",paddingTop:Platform.OS === 'android' ? 25 : 0}}>
      <Text>Home</Text>
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({})