import {
  Image,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
  ActivityIndicator, //  Added
} from "react-native";
import React, { useEffect, useState } from "react";
import logo from "../assets/logo.png";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import Foundation from "@expo/vector-icons/Foundation";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { showMessage } from "react-native-flash-message";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false); //  Loading state
  const navigation = useNavigation();

  useEffect(()=>{
    const checkLogin = async () => {
      const token = await AsyncStorage.getItem("token");
      if (token) {
        navigation.navigate("Main");
      }
    };
    checkLogin();
  },[]);

  const handleLogin = () => {
    setLoading(true); //  Start loading
    const user = { email, password };

    axios
      .post(`https://e-commerce-fj9h.onrender.com/api/users/login`, user)
      .then((response) => {
        const { token } = response.data;
        AsyncStorage.setItem("token", token);

        showMessage({
          message: "Login successful",
          description: response.data.message,
          type: "success",
        });
        setEmail("");
        setPassword("");
        navigation.navigate("Main");
      })
      .catch((error) => {
        showMessage({
          message: error.response?.data?.message || "Login failed",
          type: "danger",
        });
      })
      .finally(() => {
        setLoading(false); //  Stop loading
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
          <Text style={styles.textForLogin}>Login in to your account</Text>
        </View>

        <View style={{ marginTop: 30 }}>
          {/* Email Input */}
          <View style={styles.inputWrapper}>
            <MaterialIcons
              name="email"
              size={24}
              color="#FF6B6B"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your email"
              style={styles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="emailAddress"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputWrapper}>
            <Foundation
              name="lock"
              size={24}
              color="black"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your password"
              style={styles.input}
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              textContentType="password"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </View>

          {/* Keep Me Logged In */}
          <View style={styles.rememberRow}>
            <Text style={{ color: "gray" }}>Keep me logged in</Text>
            <Text style={{ color: "blue", fontWeight: "400" }}>
              Forgot Password?
            </Text>
          </View>

          {/* Login Button */}
          <Pressable
            style={{
              backgroundColor: "#FF6B6B",
              padding: 15,
              borderRadius: 5,
              alignItems: "center",
              marginTop: 60,
              flexDirection: "row",
              justifyContent: "center",
            }}
            onPress={handleLogin}
            disabled={loading} //  Disable when loading
          >
            {loading ? (
              <ActivityIndicator color="#fff" /> //  Spinner
            ) : (
              <Text style={{ color: "white", fontWeight: "bold" }}>Login</Text>
            )}
          </Pressable>

          {/* Register Link */}
          <Pressable
            style={{ marginTop: 10, alignItems: "center" }}
            onPress={() => navigation.navigate("Register")}
          >
            <Text style={{ color: "blue" }}>
              Don't have an account? Sign up
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Login;

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
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DDDDDD",
    paddingVertical: 1,
    borderRadius: 5,
    marginTop: 30,
    gap: 7,
  },
  input: {
    color: "black",
    marginVertical: 2,
    width: 280,
  },
  rememberRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 25,
    width: 300,
  },
});
