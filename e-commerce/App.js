import { Text, View } from "react-native";
import "./global.css";
import StackNavigator from "./navigation/stackNavigator";
import FlashMessage, { showMessage } from "react-native-flash-message";

export default function App() {
  return (
    <>
      <StackNavigator />
      <FlashMessage position="top" />
    </>
  );
}
