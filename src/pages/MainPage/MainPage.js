import { StyleSheet, Platform, StatusBar, View, Text, SafeAreaView, Keyboard } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Header } from '../../components/Header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Group } from '../../components/Group/Group';
import { NavFooter } from '../../components/NavFooter/NavFooter';
import { useEffect, useState } from 'react';
import { AuthLogin } from '../../components/Auth/AuthLogin/AuthLogin';
import { AuthRegister } from '../../components/Auth/AuthRegister/AuthRegister';
import AxiosInstance from '../../components/Extra/Axios/AxiosInstance'
import { ViewCamera } from '../../components/UI/ViewCamer/ViewCamera'
import axios from 'axios';
import { socket } from '../../components/Extra/Sockets/socket';
import { ChatRoomNotificationSocket } from '../../components/Extra/Sockets/messangerSocket'
import { ContextChatMenu } from '../../components/UI/ContextChatMenu/ContextChatMenu';
import { useDispatch, useSelector } from 'react-redux';
import { setAuth } from '../../redux/slices/authSlice';
// import axios from 'axios';
// grabrick@mail.ru   62xs_vqfHZNrZCJ


export default function MainPage({ navigation }) {
  const [activeElement, setActiveElement] = useState('');
  const [isReg, setIsReg] = useState(false);
  const [isAuth, setIsAuth] = useState(true); // Временно поменял на true
  const isCameraVisible = useSelector(state => state.cameraSlice.isCameraVisible)
  const state = useSelector(state => state.contextMenuSlice)
  const authData = useSelector(state => state.authSlice.authData)
  const dispatch = useDispatch()

  //  ContextMenu
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [touchMessage, setTouchMessage] = useState(null)
  const [contextConfig, setContextConfig] = useState(null)

  const handleElementChange = (element) => {
    setActiveElement(element);
  };

  const getAuth = async () => {
    try {
      const serializedData = await SecureStore.getItemAsync('Auth');
      if (serializedData) {
        const data = JSON.parse(serializedData);
        dispatch(setAuth(data))
        return data;
      }
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return null;
    }
  }

  const saveAuthToken = async (token) => {
    try {
      const serializedData = JSON.stringify(token);
      if (serializedData) {
        await SecureStore.setItemAsync('Auth', serializedData);
      }
    } catch (error) {
      console.error('Ошибка при сохранении токена:', error);
    }
  }

  useEffect(() => {
    // SecureStore.deleteItemAsync('Auth', {})
    const checkAuth = async () => {
      const authData = await getAuth();
      if (authData && authData.refreshToken) {
        setIsAuth(true);
      } else {
        setIsAuth(false)
      }
    };

    checkAuth();
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'light-content' : 'default')
  }, []);

  useEffect(() => {
    if (authData?._id) {
      ChatRoomNotificationSocket(authData._id);
    }
  }, [authData])

  useEffect(() => {
    socket.on("message:recive", (data) => {
      dispatch(pushMessage(data));
    })
    socket.on("message:delete_recive", (data) => {
      dispatch(delMessage(data));
    })
  }, [socket])

  useEffect(() => {
    if (authData && authData.refreshToken) {
      const config = {
        headers: {
          Authorization: authData.refreshToken
        }
      };
      axios.get(`https://puzzle.araratchess.ru:8080/api/auth/refresh`, { params: { refreshToken: authData.refreshToken } }, config).then(res => {
        if (res.status === 200) {
          console.log("2");
          saveAuthToken(res.data)
        }
      }).catch(() => {
        SecureStore.deleteItemAsync('Auth', {})
        console.log("Logout");
        setIsReg(false)
      })
    }
  }, [authData, isReg])

  return (
    <LinearGradient
      style={styles.container}
      colors={['#000', '#0D0D0D', '#333333']}
      start={[0.7, 0]}
      end={[0, 0]}
    >
      <StatusBar
        translucent
        barStyle='light-content'
      />

      <SafeAreaView style={styles.SafeAreaView}>
        {isCameraVisible ? (
          <ViewCamera />
        ) : (
          <>
            {isAuth && <Header navigation={navigation} />}
            <View style={styles.wrapper}>
              {isAuth ? (
                <>
                  {(() => {
                    switch (activeElement) {
                      case 'chat':
                        return (
                          <>
                            <Group
                              authData={authData}
                              setContextMenuVisible={setContextMenuVisible}
                              setTouchMessage={setTouchMessage}
                              setContextConfig={setContextConfig}
                              navigation={navigation}
                            />
                          </>
                        )
                      case '':
                        return (
                          <View style={styles.infoWrapper}>
                            <Text style={styles.info}>
                              Дорогие родители.
                              На данный момент все разделы портала работают в веб версии.

                              Ориентировочно До 01.10.2023 все разделы должны быть готовы и в мобильной версии.
                              Последвотельно, можно будет на урок прийти с телефона. (напоминаем, что не советуем прийти с телефона на урок, предпочтительнее планшет или ноутбук)

                              А пока для вашего удобства в данной мобильной версии работает раздел Чат - МЕСЕНДЖЕР.
                            </Text>
                          </View>
                        )
                      default:
                        return null
                    }
                  })()}
                </>
              ) : (
                // ""
                isReg ? <AuthRegister swap={setIsReg} onChange={setIsAuth} /> : <AuthLogin swap={setIsReg} onChange={setIsAuth} />
              )}
            </View>
            {isAuth && <NavFooter navigation={navigation} onChange={handleElementChange} activeElement={activeElement} />}
          </>
        )}
      </SafeAreaView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  SafeAreaView: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  },
  infoWrapper: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
  },
});
