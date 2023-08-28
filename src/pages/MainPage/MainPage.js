import { StyleSheet, Platform, StatusBar, View, Text, SafeAreaView } from 'react-native';
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


export default function MainPage() {
  const [activeElement, setActiveElement] = useState('');
  const [isReg, setIsReg] = useState(false);
  const [isAuth, setIsAuth] = useState(true); // Временно поменял на true
  const isCameraVisible = useSelector(state => state.cameraSlice.isCameraVisible)
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
    // console.log(authData);
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
      })
    }
  }, [authData])

  return (
      <LinearGradient
        style={styles.container}
        colors={['#000', '#0D0D0D', '#333333']}
        start={[0.7, 0]}
        end={[0, 0]}
      >
        <StatusBar
          translucent
          backgroundColor="#61dafb"
          barStyle='light-content'
        />
        
        <SafeAreaView style={styles.SafeAreaView}>
          {isCameraVisible ? (
            <ViewCamera />
          ) : (
            <>
              {contextMenuVisible ? (
                <ContextChatMenu
                  touchMessage={touchMessage}
                  contextMenuVisible={contextMenuVisible}
                  setTouchMessage={setTouchMessage}
                  setContextMenuVisible={setContextMenuVisible}
                  contextConfig={contextConfig}
                  authData={authData}
                />
              ) : (
                <>
                  {isAuth && <Header />}
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
                                  />
                                </>
                              )
                            case '':
                              return (
                                  <View style={styles.infoWrapper}>
                                    <Text style={styles.info}>Данный раздел пока не доступен для использования</Text>
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
                  {isAuth && <NavFooter onChange={handleElementChange} activeElement={activeElement} />}
                </>
              )}
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
    fontSize: 18,
  },
});
