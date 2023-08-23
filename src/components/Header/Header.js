import { View, Image, StyleSheet, TouchableOpacity } from "react-native";
import Logo from '../../../assets/images/Logo.png'
import Profile from '../../../assets/images/Profile.png'

export const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imgWrapper}>
        <Image
          source={Logo}
        />
      </View>
      <TouchableOpacity style={styles.img}>
        <Image source={Profile}/>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: 100,
    // marginTop: 35,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    position: 'relative'
  },
  imgWrapper: {
    position: 'relative'
  },
  img: {
    position: 'absolute',
    top: 0,
    right: 10,
    marginTop: 20,
  }
});