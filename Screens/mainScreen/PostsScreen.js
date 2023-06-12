import React, { useEffect, useState } from "react";

import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase/config";

import { useSelector } from "react-redux";

import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  const { login, userEmail } = useSelector((state) => state.auth);

  const getAllPosts = async () => {
    const dbRef = await collection(db, "posts");
    onSnapshot(dbRef, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  useEffect(() => {
    (async () => {
      await getAllPosts();
    })();
  }, [route.params]);

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View style={{ marginLeft: 2, marginTop: 4 }}>
            <Text>{login}</Text>
            <Text>{userEmail}</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image
              source={{ uri: item.photoStorage }}
              style={styles.takePhoto}
            />
            <View>
              <View>
                <Text>{item.place}</Text>
              </View>
              <View style={styles.containerIcon}>
                <FontAwesome
                  name="comment-o"
                  size={24}
                  color="black"
                  onPress={() => navigation.navigate("CommentsScreen")}
                  sx={{ marginRight: "auto" }}
                />
                <TouchableOpacity
                  onPress={() => {
                    navigation.navigate("MapScreen", {
                      location: item.location,
                    });
                  }}
                >
                  <EvilIcons name="location" size={20} color="#BDBDBD" />
                  <Text style={styles.nameLocation}>
                    {item.photoLocationName}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
      />
    </View>
  );
};
export default PostsScreen;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffffff",
  },
  takePhoto: {
    width: 343,
    height: 240,
    borderRadius: 8,
    marginBottom: 8,
  },
  containerIcon: {
    marginTop: 11,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameLocation: {
    fontSize: 16,
    lineHeight: 19,
    textDecorationLine: "underline",
  },
});
