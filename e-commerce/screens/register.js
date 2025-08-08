import {
  Alert,
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import React, { useState } from "react";
import logo from "../assets/logo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";
import axios from 'axios';

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    const user = {
      name,
      email,
      password,
    };
    // Send user data to backend API for registration
    axios.post("http://localhost:2000/api/users/register", user)
      .then((response) => {
       Alert.alert("Registration successful:", response.data);
        setName("");
        setEmail("");
        setPassword("");
        // Navigate to the login screen or show a success message
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert("Registration error:", error.message);
        // Show an error message to the user
      });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View>
        <Image source={logo} style={styles.logo} />
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={{ alignItems: "center", justifyContent: "center" }}>
          <Text style={styles.textForLogin}>Register to your account</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#DDDDDD",
              paddingVertical: 1,
              borderRadius: 5,
              marginTop: 30,
              gap: 7,
            }}
          >
            <MaterialIcons
              name="person"
              size={24}
              color="#ADD8E6"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your name"
              style={{ color: "black", marginVertical: 2, width: 280 }}
              keyboardType="default"
              autoCapitalize="words"
              autoCorrect={false}
              textContentType="name"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#DDDDDD",
              paddingVertical: 1,
              borderRadius: 5,
              marginTop: 30,
              gap: 7,
            }}
          >
            <MaterialIcons
              name="email"
              size={24}
              color="#FF6B6B"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your email"
              style={{ color: "black", marginVertical: 2, width: 280 }}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "#DDDDDD",
              paddingVertical: 1,
              borderRadius: 5,
              marginTop: 30,
              gap: 7,
            }}
          >
            <Foundation
              name="lock"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your password"
              style={{ color: "black", marginVertical: 2, width: 280 }}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 25,
              width: 300,
            }}
          >
            <Text style={{ color: "gray" }}>Keep me logged in</Text>
            <Text
              style={{ color: "blue", cursor: "pointer", fontWeight: "400" }}
            >
              Forgot Password?
            </Text>
          </View>

          <Pressable
            style={{
              backgroundColor: "#FF6B6B",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 60,
            }}
            onPress={handleRegister}
          >
            <Text style={{ color: "white", fontWeight: "bold" }}>Register</Text>
          </Pressable>

          <Pressable style={{ marginTop: 10, alignItems: "center" }} onPress={() => navigation.navigate("Login")}>
            <Text
              style={{ color: "blue", cursor: "pointer", fontWeight: "50" }}
            >
              Already have an account? Login
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Register;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    alignItems: "center",
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    marginTop: 50,
  },
  textForLogin: {
    fontSize: 17,
    fontWeight: "bold",
    marginTop: 12,
    color: "#041E42",
  },
});
