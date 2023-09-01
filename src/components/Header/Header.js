import { View, Image, StyleSheet, TouchableOpacity, Platform } from "react-native";
import Logo from '../../../assets/images/Logo.png'
import Profile from '../../../assets/images/Profile.png'

export const Header = ({ navigation }) => {
  return (
    <View style={[styles.container, Platform.OS === 'android' && {marginTop: 40}]}>
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
    // height: 100,
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
    top: 6,
    right: 10,
  }
});