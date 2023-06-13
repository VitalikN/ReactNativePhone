import React, { useEffect, useState } from "react";

import { db } from "../../firebase/config";
import { collection, onSnapshot } from "firebase/firestore";

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
import { useSelector } from "react-redux";

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
      <View style={{ flexDirection: "row" }}>
        <Text style={styles.textLogin}>{login}</Text>
        <Text style={styles.textEmail}>{userEmail}</Text>
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
                {posts.length !== 0 && (
                  <Text style={styles.placeTitle}>{item.place}</Text>
                )}
              </View>
              <View style={styles.containerIcon}>
                <FontAwesome
                  name="comment-o"
                  size={24}
                  color="black"
                  onPress={() =>
                    navigation.navigate("CommentsScreen", {
                      postId: item.id,
                      photo: item.photoStorage,
                    })
                  }
                  sx={{ marginRight: "auto" }}
                />

                <View>
                  {posts.length !== 0 && (
                    <TouchableOpacity
                      style={{ flexDirection: "row", alignItems: "center" }}
                      onPress={() => {
                        navigation.navigate("MapScreen", {
                          location: item.location,
                        });
                      }}
                    >
                      <EvilIcons
                        name="location"
                        size={20}
                        color="rgba(33, 33, 33, 0.8)"
                      />
                      <Text style={styles.nameLocation}>
                        {item.photoLocationName}
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
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
    marginLeft: 8,
  },

  textLogin: {
    fontWeight: 700,
    fontSize: 13,
    lineHeight: 15,
    color: "#212121",
    marginTop: 8,
    marginRight: 10,
  },
  textEmail: {
    fontWeight: 400,
    fontSize: 11,
    lineHeight: 13,
    marginTop: 8,

    color: "rgba(33, 33, 33, 0.8)",
  },
  placeTitle: {
    color: "#212121",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },
});
