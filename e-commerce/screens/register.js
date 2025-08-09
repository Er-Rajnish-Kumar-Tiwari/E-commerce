import {
  Alert,
  ActivityIndicator, // <-- import this
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
import axios from "axios";
import { showMessage } from "react-native-flash-message";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false); // <-- loading state
  const navigation = useNavigation();

  const handleRegister = () => {
    setLoading(true); // start loading
    const user = { name, email, password };

    axios
      .post("https://e-commerce-fj9h.onrender.com/api/users/register", user, {
        headers: { "Content-Type": "application/json" },
      })
      .then((response) => {
        showMessage({
          message: "Registration successful",
          description: response.data.message,
          type: "success",
        });
        setName("");
        setEmail("");
        setPassword("");
        navigation.navigate("Login");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Error data:", error.response.data);
          showMessage({
            message: "Registration error",
            description: error.response.data.message || "Unknown error",
            type: "danger",
          });
        } else {
          showMessage({
            message: "Registration failed",
            description:
              "An error occurred while registering. Please try again.",
            type: "danger",
          });
        }
      })
      .finally(() => {
        setLoading(false); // stop loading in both success & error cases
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
          {/* Name input */}
          <View style={styles.inputContainer}>
            <MaterialIcons
              name="person"
              size={24}
              color="#ADD8E6"
              style={{ marginLeft: 10 }}
            />
            <TextInput
              placeholder="Enter your name"
              style={styles.input}
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* Email input */}
          <View style={styles.inputContainer}>
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
              value={email}
              onChangeText={setEmail}
            />
          </View>

          {/* Password input */}
          <View style={styles.inputContainer}>
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
              value={password}
              onChangeText={setPassword}
            />
          </View>

          {/* Loading indicator or button */}
          {loading ? (
            <ActivityIndicator
              size="large"
              color="#FF6B6B"
              style={{ marginTop: 50 }}
            />
          ) : (
            <Pressable style={styles.registerButton} onPress={handleRegister}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                Register
              </Text>
            </Pressable>
          )}

          <Pressable
            style={{ marginTop: 10, alignItems: "center" }}
            onPress={() => navigation.navigate("Login")}
          >
            <Text style={{ color: "blue", fontWeight: "400" }}>
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
  inputContainer: {
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
  registerButton: {
    backgroundColor: "#FF6B6B",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 60,
  },
});
