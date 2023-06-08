import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from "react-native";

import { EvilIcons } from "@expo/vector-icons";
import { FontAwesome } from "@expo/vector-icons";

const PostsScreen = ({ route, navigation }) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    if (route.params) {
      setPosts((prevState) => [...prevState, route.params]);
    }
  }, [route.params]);

  const mapNavigate = () => {
    navigation.navigate("MapScreen");
  };
  const commentsNavigate = () => {
    navigation.navigate("CommentsScreen");
  };
  return (
    <View style={styles.container}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ marginBottom: 10 }}>
            <Image source={{ uri: item.photo }} style={styles.takePhoto} />
            <View>
              <View>
                <Text>{item.place}</Text>
              </View>
              <View style={styles.containerIcon}>
                <FontAwesome
                  name="comment-o"
                  size={24}
                  color="black"
                  onPress={commentsNavigate}
                  sx={{ marginRight: "auto" }}
                />
                <TouchableOpacity onPress={mapNavigate}>
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
