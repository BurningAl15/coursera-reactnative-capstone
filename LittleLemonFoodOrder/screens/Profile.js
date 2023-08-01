import {
  View,
  Text,
  Pressable,
  TextInput,
  StyleSheet,
  ScrollView,
  Image,
} from "react-native";

import { useState, useEffect } from "react";

import AsyncStorage from "@react-native-async-storage/async-storage";

import BouncyCheckbox from "react-native-bouncy-checkbox";

import * as ImagePicker from "expo-image-picker";
import { styles } from "../styles";
import { Dimensions } from "react-native";

const { width, height } = Dimensions.get("window");

export default function Porfile({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [notifications, setNotifications] = useState({
    order: false,
    password: false,
    special: false,
    news: false,
  });
  const [image, setImage] = useState(null);

  let orderCB: BouncyCheckbox | null = null;
  let passwordCB: BouncyCheckbox | null = null;
  let specialCB: BouncyCheckbox | null = null;
  let newsCB: BouncyCheckbox | null = null;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value);
      await AsyncStorage.setItem("@profile", jsonValue);
    } catch (e) {
      // console.err(e)
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem("@profile");
      navigation.navigate("Onboarding");
    } catch (e) {
      // console.err(e)
    }
  };

  const onLogout = () => {
    logout();
  };

  useEffect(() => {
    (async () => {
      try {
        const dt = await AsyncStorage.getItem("@profile");
        const dataObj = JSON.parse(dt);
        const ob = await AsyncStorage.getItem("@onboarding");
        const obObj = JSON.parse(ob);
        const img = await AsyncStorage.getItem("@image");
        setFirstName(
          dataObj.firstName ? dataObj.firstName : obObj.name ? obObj.name : ""
        );
        setLastName(dataObj.lastName ? dataObj.lastName : "");
        setEmail(
          dataObj.email ? dataObj.email : obObj.email ? obObj.email : ""
        );
        setPhone(dataObj.phone ? dataObj.phone : "");
        setNotifications({ ...dataObj.notifications });
        setImage(img);
        orderCB.isChecked(notifications.order);
        passwordCB.isChecked(notifications.password);
        specialCB.isChecked(notifications.special);
        newsCB.isChecked(notifications.news);
      } catch (e) {
        // console.err(e)
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await AsyncStorage.setItem("@image", image);
      } catch (e) {
        // console.err(e)
      }
    })();
  }, [image]);

  const removeImage = async () => {
    try {
      await AsyncStorage.removeItem("@image");
      setImage(null);
    } catch (e) {
      // console.err(e)
    }
  };

  return (
    <ScrollView
      style={styles.containerScroll}
      contentContainerStyle={{
        ...styles.contentContainer,
        alignItems: "stretch",
        width: width - 40,
        marginHorizontal: 20,
      }}
      automaticallyAdjustContentInsets={false}
      contentInset={{ top: 0, bottom: 0 }}
    >
      <Text style={{ fontSize: 18, marginVertical: 10, marginHorizontal: 5 }}>
        Personal Information
      </Text>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          width: "100%",
          justifyContent: "center",
        }}
      >
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
        <Pressable
          style={[
            localStyles.button,
            { backgroundColor: "#495E57", color: "#EDEFEE" },
          ]}
          onPress={pickImage}
        >
          <Text style={{ color: "#EDEFEE" }}>Change</Text>
        </Pressable>
        <Pressable style={localStyles.button} onPress={removeImage}>
          <Text>Remove</Text>
        </Pressable>
      </View>
      <View>
        <Text style={localStyles.label}>First Name</Text>
        <TextInput
          placeholder="First name"
          style={localStyles.input}
          onChangeText={(data) => setFirstName(data)}
          value={firstName}
        />
        <Text style={localStyles.label}>Last Name</Text>
        <TextInput
          placeholder="Last name"
          style={localStyles.input}
          onChangeText={(data) => setLastName(data)}
          value={lastName}
        />
        <Text style={localStyles.label}>Email</Text>
        <TextInput
          placeholder="Email"
          style={localStyles.input}
          onChangeText={(data) => setEmail(data)}
          value={email}
        />
        <Text style={localStyles.label}>Phone number</Text>
        <TextInput
          placeholder="Phone number"
          style={localStyles.input}
          onChangeText={(data) => setPhone(data)}
          value={phone}
        />
      </View>
      <View>
        <Text style={[localStyles.label, { fontSize: 14, paddingVertical: 5 }]}>
          Email notifications
        </Text>
        <View style={{ marginBottom: 15 }} />
        <BouncyCheckbox
          text="Order Statuses"
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            setNotifications({ ...notifications, order: !isChecked });
          }}
          isChecked={notifications.order}
          fillColor={"#495E57"}
          disableBuiltInState
          ref={(ref) => (orderCB = ref)}
        />
        <View style={{ marginBottom: 15 }} />
        <BouncyCheckbox
          text="Password changes"
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            setNotifications({ ...notifications, password: !isChecked });
          }}
          isChecked={notifications.password}
          fillColor={"#495E57"}
          disableBuiltInState
          ref={(ref) => (passwordCB = ref)}
        />
        <View style={{ marginBottom: 15 }} />
        <BouncyCheckbox
          text="Special offers"
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            setNotifications({ ...notifications, special: !isChecked });
          }}
          isChecked={notifications.special}
          fillColor={"#495E57"}
          disableBuiltInState
          ref={(ref) => (specialCB = ref)}
        />
        <View style={{ marginBottom: 15 }} />
        <BouncyCheckbox
          text="Newsletters"
          textStyle={{ textDecorationLine: "none" }}
          onPress={(isChecked) => {
            setNotifications({ ...notifications, news: !isChecked });
          }}
          isChecked={notifications.news}
          fillColor={"#495E57"}
          disableBuiltInState
          ref={(ref) => (newsCB = ref)}
        />
      </View>
      <View style={{ marginBottom: 15 }} />
      <Pressable
        style={[
          localStyles.button,
          {
            backgroundColor: "#F4CE14",
            color: "#333333",
            marginTop: 10,
            alignItems: "center",
          },
        ]}
        onPress={onLogout}
      >
        <Text>Log out</Text>
      </Pressable>
      <View style={{ flexDirection: "row", alignSelf: "center" }}>
        <Pressable
          style={[
            localStyles.button,
            {
              backgroundColor: "white",
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
          <Text>Disard changes</Text>
        </Pressable>
        <Pressable
          style={[
            localStyles.button,
            {
              backgroundColor: "#495E57",
              color: "#EDEFEE",
              width: "45%",
              alignItems: "center",
              justifyContent: "center",
            },
          ]}
          onPress={() => {
            const dt = {
              firstName: firstName,
              lastName: lastName,
              email: email,
              phone: phone,
              notifications: notifications,
            };

            storeData(dt);
            navigation.navigate("Home");
          }}
        >
          <Text style={{ color: "#EDEFEE" }}>Save changes</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const localStyles = StyleSheet.create({
  other: {
    alignSelf: "stretch",
  },
  button: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "#495E57",
    padding: 10,
    margin: 10,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: "black",
    minHeight: 35,
    marginVertical: 5,
    marginHorizontal: 3,
    paddingHorizontal: 8,
  },
  label: {
    fontSize: 10,
    marginHorizontal: 3,
  },
});
