import React, { useState, useEffect } from "react";

import { useSelector, useDispatch } from "react-redux";

import { db } from "../../firebase/config";

import { MaterialIcons } from "@expo/vector-icons";
import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

import { authSignOutUser } from "../../redux/auth/authOperations";

import {
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from "react-native";

import {
  collection,
  query,
  where,
  onSnapshot,
  increment,
  doc,
  updateDoc,
} from "firebase/firestore";

const ProfileScreen = ({ navigation }) => {
  const [posts, setPosts] = useState([]);
  const { userId, login } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const handleLike = async (item) => {
    const postLiksRef = doc(db, "posts", item.id);

    await updateDoc(postLiksRef, {
      liks: increment(1),
    });
  };
  useEffect(() => {
    getUserPosts();
  }, []);

  const getUserPosts = async () => {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    onSnapshot(q, (docSnap) =>
      setPosts(docSnap.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    );
  };

  const signOut = () => {
    dispatch(authSignOutUser());
  };
  return (
    <ImageBackground
      style={styles.imageBg}
      source={require("../../assets/photo.png")}
    >
      <View style={styles.container}>
        <View style={styles.wrappContent}>
          <TouchableOpacity onPress={signOut} style={styles.btnSignOut}>
            <MaterialIcons name="logout" size={24} color="#BDBDBD" />
          </TouchableOpacity>
          <View style={styles.nameProfile}>
            <Text style={styles.userTitle}>{login}</Text>
          </View>
          <FlatList
            data={posts}
            keyExtractor={(_, i) => i.toString()}
            renderItem={({ index, item }) => (
              <View style={styles.wrapImg}>
                <Image
                  source={{ uri: item.photoStorage }}
                  style={{
                    ...styles.img,
                  }}
                />
                <View style={styles.wrappContentPost}>
                  {posts.length !== 0 && (
                    <Text style={styles.placeTitle}>{item.place}</Text>
                  )}
                </View>
                <View style={styles.wrappIcon}>
                  <View style={styles.wrappContentIcon}>
                    <TouchableOpacity
                      onPress={() => {
                        navigation.navigate("CommentsScreen", {
                          postId: item.id,
                          photo: item.photoStorage,
                        });
                      }}
                    >
                      <FontAwesome name="comment-o" size={20} color="#FF6C00" />
                    </TouchableOpacity>

                    <View style={styles.wrapCountComment}>
                      <Text style={styles.countComment}>{item.comments}</Text>
                    </View>
                    <TouchableOpacity
                      style={styles.iconThumbUp}
                      onPress={() => handleLike(item)}
                    >
                      <EvilIcons name="like" size={25} color="#FF6C00" />
                    </TouchableOpacity>
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        marginLeft: 5,
                      }}
                    >
                      <Text
                        style={{
                          color: "#212121",
                          fontSize: 16,
                          lineHeight: 19,
                        }}
                      >
                        {item.liks}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.wrappIconMap}>
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
            )}
          />
        </View>
      </View>
    </ImageBackground>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  imageBg: {
    flex: 1,
  },
  container: {
    flex: 1,
    marginTop: 147,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "rgba(180, 180, 180, 0.2)",
    paddingHorizontal: 16,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingBottom: 150,
  },

  wrapImg: {
    marginBottom: 34,
  },

  wrappContentPost: {
    marginTop: 8,
    marginBottom: 11,
  },

  countComment: { fontSize: 16, lineHeight: 19 },

  btnSignOut: {
    position: "absolute",
    right: 0,
    top: 20,
    zIndex: 1000,
  },

  wrapCountComment: { marginLeft: 5 },

  wrappContentIcon: {
    flex: 1,
    flexDirection: "row",
  },

  wrappContent: {
    marginLeft: "auto",
    marginRight: "auto",
  },

  iconThumbUp: { marginLeft: 27 },

  img: {
    width: 343,
    height: 240,
    borderRadius: 8,
  },

  placeTitle: {
    color: "#212121",
    fontWeight: 500,
    fontSize: 16,
    lineHeight: 19,
  },

  nameLocation: {
    fontSize: 16,
    lineHeight: 19,
    textAlign: "right",
    textDecorationLine: "underline",
  },

  wrappIconMap: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 15,
  },

  wrappIcon: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  nameProfile: {
    marginBottom: 33,
    marginTop: 15,
  },

  userTitle: {
    textAlign: "center",
    color: "#212121",
    fontSize: 20,
    lineHeight: 35,
    letterSpacing: 0.01,
    marginTop: 63,
  },
});
