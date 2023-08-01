import { StyleSheet, View, Image, Text, Pressable, Alert } from "react-native";

import { useState, useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Header(props) {
  const [image, setImage] = useState(null);
  const defaultImg = require("../assets/Logo.png");
  const isFocused = useIsFocused();
  const [forceLoading, setForceLoading] = useState(false);

  useEffect(() => {
    if (isFocused) {
      setForceLoading(!forceLoading);
    }
  }, [isFocused]);

  useEffect(() => {
    (async () => {
      try {
        const img = await AsyncStorage.getItem("@image");
        setImage(img);
      } catch (e) {
        Alert.alert(e.message);
      }
    })();
  }, [forceLoading]);

  return (
    <View
      style={[
        props.style.header,
        { justifyContent: props.allowProfile ? "center" : "center" },
      ]}
    >
      {props.allowProfile && <View style={{ width: 100, height: 40 }}></View>}

      <Image source={require("../assets/Logo.png")} style={props.style.logo} />
      {props.allowProfile && (
        <View
          style={{
            marginHorizontal: 20,
          }}
        >
          <Pressable
            onPress={() => {
              props.navigation.navigate("Profile");
            }}
            style={{
              flex: 1,
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <View style={{ width: 40, height: 40 }}></View>

            {image ? (
              <Image
                source={{ uri: image }}
                style={{
                  paddingHorizontal: 10,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              />
            ) : (
              <Image
                source={require("../assets/Logo.png")}
                style={{
                  paddingHorizontal: 10,
                  height: 50,
                  width: 50,
                  borderRadius: 25,
                  borderColor: "black",
                  borderWidth: 1,
                }}
              />
            )}
          </Pressable>
        </View>
      )}
    </View>
  );
}
