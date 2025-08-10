import {
  Platform,
  StatusBar,
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
  Text,
  Image,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import AntDesign from "@expo/vector-icons/AntDesign";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { SliderBox } from "react-native-image-slider-box";


const Home = () => {
  const list = [
    {
      id: "0",
      image: "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
      name: "Home",
    },
    {
      id: "1",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
      name: "Deals",
    },
    {
      id: "3",
      image:
        "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
      name: "Electronics",
    },
    {
      id: "4",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/All_Icons_Template_1_icons_01.jpg",
      name: "Mobiles",
    },
    {
      id: "5",
      image:
        "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/music.jpg",
      name: "Music",
    },
    {
      id: "6",
      image: "https://m.media-amazon.com/images/I/51dZ19miAbL._AC_SY350_.jpg",
      name: "Fashion",
    },
  ];

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: "white",
        paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0,
      }}
    >
      <ScrollView>
        <View
          style={{
            padding: 10,
            backgroundColor: "#00CED1",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Pressable
            style={{
              flexDirection: "row",
              alignItems: "center",
              backgroundColor: "white",
              borderRadius: 5,
              height: 40,
              paddingHorizontal: 10,
              flex: 1,
              marginRight: 10,
            }}
          >
            <AntDesign name="search1" size={20} color="black" />
            <TextInput
              placeholder="Search tanishzon.in"
              style={{ flex: 1, marginLeft: 8 }}
            />
          </Pressable>

          <Feather name="mic" size={24} color="black" />
        </View>

        <View
          style={{
            padding: 10,
            flexDirection: "row",
            alignItems: "center",
            gap: 5,
            backgroundColor: "#AFEEEE",
          }}
        >
          <Ionicons name="location-outline" size={24} color="black" />
          <Pressable>
            <Text style={{ fontSize: 13, fontWeight: "700" }}>
              Deliver to Rajnish bathinda-151302
            </Text>
          </Pressable>
          <MaterialIcons name="keyboard-arrow-down" size={24} color="black" />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {list.map((item) => (
            <Pressable key={item.id} style={{ margin:10,justifyContent:"center",alignItems:"center" }}>
              <Image
                source={{ uri: item.image }}
                style={{ width: 50, height: 50,resizeMode: "contain" }}
              />
              <Text style={{ textAlign: "center" ,fontSize:12,fontWeight:"500",marginTop:5}}>{item.name}</Text>
            </Pressable>
          ))}
        </ScrollView>

        <SliderBox
          images={[
            "https://m.media-amazon.com/images/I/41EcYoIZhIL._AC_SY400_.jpg",
            "https://m.media-amazon.com/images/G/31/img20/Events/Jup21dealsgrid/blockbuster.jpg",
            "https://images-eu.ssl-images-amazon.com/images/I/31dXEvtxidL._AC_SX368_.jpg",
          ]}
          sliderBoxHeight={200}
          autoplay
          circleLoop
          dotColor="#FFEE58"
          inactiveDotColor="#90A4AE"
        />
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({});
