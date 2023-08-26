import { StyleSheet, Platform, StatusBar, View, SafeAreaView } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Header } from './src/components/Header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Group } from './src/components/Group/Group';
import { NavFooter } from './src/components/NavFooter/NavFooter';
import { useEffect, useState } from 'react';
import { AuthLogin } from './src/components/Auth/AuthLogin/AuthLogin';
import { AuthRegister } from './src/components/Auth/AuthRegister/AuthRegister';
import AxiosInstance from './src/components/Extra/Axios/AxiosInstance'
import axios from 'axios';
import { ContextChatMenu } from './src/components/UI/ContextChatMenu/ContextChatMenu';
// import axios from 'axios';
// grabrick@mail.ru   62xs_vqfHZNrZCJ
export default function App() {
  const [activeElement, setActiveElement] = useState('');
  const [isReg, setIsReg] = useState(false);
  const [isAuth, setIsAuth] = useState(false);
  const [authData, setAuthData] = useState(null);


  //  ContextMenu
  const [contextMenuVisible, setContextMenuVisible] = useState(false);
  const [touchMessage, setTouchMessage] = useState(null)


  useEffect(() => {
    console.log(contextMenuVisible);
  }, [touchMessage])

  const handleElementChange = (element) => {
    setActiveElement(element);
  };

  const getAuth = async () => {
    try {
      const serializedData = await SecureStore.getItemAsync('Auth');
      if (serializedData) {
        const data = JSON.parse(serializedData);
        setAuthData(data);
        return data;
      }
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return null;
    }
  }

  const saveAuthToken = async (token) => {
    // console.log(token);
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
        {contextMenuVisible ? (
          <ContextChatMenu
            touchMessage={touchMessage}
            contextMenuVisible={contextMenuVisible}
            setTouchMessage={setTouchMessage}
            setContextMenuVisible={setContextMenuVisible}
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
                            />
                          </>
                        )
                      default:
                        return null;
                    }
                  })()}
                </>
              ) : (
                isReg ? <AuthRegister swap={setIsReg} onChange={setIsAuth} /> : <AuthLogin swap={setIsReg} onChange={setIsAuth} />
              )}
            </View>
            {isAuth && <NavFooter onChange={handleElementChange} activeElement={activeElement} />}
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
  }
});
