import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Text,
  FlatList,
  Linking,
  Alert,
  ToastAndroid
} from "react-native";
import * as Clipboard from 'expo-clipboard';
import Search from '../../../assets/images/Search.png'
import BackLeft from '../../../assets/images/arrow-left.png'
import img from '../../../assets/images/image.png'
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAuthData } from "../Extra/FetchAuthData/FetchAuthData";
import { isActiveSearch } from "../../redux/slices/otherFuncSlice";

export const GroupProfile = ({ navigation }) => {
  const state = useSelector(state => state.contextMenuSlice)
  const dispatch = useDispatch()
  const [authData, setAuthData] = useState()
  const data = state?.data?.users

  useEffect(() => {
    const fetchData = async () => {
        const auth = await fetchAuthData()
        setAuthData(auth)
    }
    fetchData()
  }, [])

  const copyToClipboard = (email) => {
    Clipboard.setStringAsync(email)

    // Вывод уведомления на iOS
    if (Platform.OS === 'ios') {
      Alert.alert(
        'Почта скопирована',
        'Почта была скопирована в буфер обмена'
        [{ text: 'OK' }],
        { cancelable: false }
      );
    } else if (Platform.OS === 'android') {
      // Вывод уведомления на Android
      ToastAndroid.show('Почта скопирована', ToastAndroid.SHORT);
    }
  }

  // const onClickSearch = () => {
  //   dispatch(isActiveSearch(true))
  //   navigation.goBack()
  // }

  return (
    <SafeAreaView style={styles.container}>
      <View style={{width: '100%'}}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={BackLeft} />
        </TouchableOpacity>
      </View>
      <View style={styles.wrapper}>
        <Image style={styles.img} src={state?.data?.user?.avatar} />
        <Text style={styles.title}>{state?.data?.user?.name}</Text>
        <Text style={styles.desc}>{state?.data?.description}</Text>
        <View style={styles.funcWrapper}>
          <TouchableOpacity style={styles.buttonWrap}>
            <Image style={styles.funcImg} source={img} />
            <Text>Файлы</Text>
          </TouchableOpacity>
        </View>
        
          <View style={styles.userContainer}>
            <Text style={{ fontWeight: 'bold' }}>Пользователи</Text>
            <FlatList
              data={data}
              style={styles.flatList}
              scrollEnabled={data.length > 7 ? true : false}
              keyExtractor={(item) => item._id}
              renderItem={({ item }) => (
                <TouchableOpacity style={styles.userWrapper} onPress={() => copyToClipboard(item.email)}>
                  <Image style={styles.avatar} src={item.avatar} />
                  <View style={styles.nameWrapper}>
                    <Text style={styles.name}>{item.name}{' '}{item.sname}</Text>
                    {authData?.user?.role !== "USER" ? (
                      <Text style={{ fontWeight: 'bold' }}>{item.email}</Text>
                    ) : (
                      ""
                    )}
                  </View>
                </TouchableOpacity>
              )}
            />
          </View>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    // height: 100,
    // marginTop: 35,
    flexDirection: 'column',
    alignItems: 'center'
    // backgroundColor: 'black'
  },
  buttonWrap: {
    alignItems: 'center',
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: '#C2C2C2',
    gap: 5,
    padding: 5,
    width: 200,
    borderRadius: 10,
  },
  userContainer: {
    // gap: 20,
    width: '100%',
    flex: 1
  },
  userWrapper: {
    flexDirection: 'row',
    gap: 10,
    padding: 5,
  },
  funcWrapper: {
    flexDirection: 'column',
    gap: 10,
  },
  wrapper: {
    flexDirection: 'column',
    alignItems: 'center',
    padding: 20,
    gap: 10,
  },
  avatar: {
    width: 35,
    height: 35,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  funcImg: {
    width: 25,
    height: 25,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderColor: 'black',
    borderWidth: 2,
  },
  title: {
    fontSize: 21,
  }
});