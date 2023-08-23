// import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Platform, StatusBar, View } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { Header } from './src/components/Header/Header';
import { LinearGradient } from 'expo-linear-gradient';
import { Group } from './src/components/Group/Group';
import { NavFooter } from './src/components/NavFooter/NavFooter';
import { useEffect, useState } from 'react';
import { AuthLogin } from './src/components/Auth/AuthLogin/AuthLogin';
import { AuthRegister } from './src/components/Auth/AuthRegister/AuthRegister';

const getStatusBarHeight = () => {
  if (Platform.OS === 'ios') {

    if (Platform.isPad) {
      return 30; // для iPad
    } else if (Platform.isTV) {
      return 40; // для Apple TV
    } else if (Platform.isIPhoneX) {
      return 44; // для iPhone X и новее
    } else {
      return 30; // Значение по умолчанию для других устройств
    }
  } else if (Platform.OS === 'android') {
    // Для Android, стандартное значение.
    return StatusBar.currentHeight || 24; // 24 - значение по умолчанию
  }
};

export default function App() {
  const [activeElement, setActiveElement] = useState('');
  const [isReg, setIsReg] = useState(false)
  const [isAuth, setIsAuth] = useState(false)
  const checkAuth = SecureStore.getItemAsync('Auth')

  const handleElementChange = (element) => {
    setActiveElement(element);
  };
  const statusBarHeight = getStatusBarHeight();
  const getAuth = async () => {
    try {
      const serializedData = await SecureStore.getItemAsync('Auth');
      if (serializedData) {
        const data = JSON.parse(serializedData);
        return data;
      }
    } catch (error) {
      console.error('Ошибка при получении токена:', error);
      return null;
    }
  }
  useEffect(() => {
    // SecureStore.deleteItemAsync('Auth', {})
    const checkAuth = async () => {
      const authData = await getAuth();
      if (authData && authData.accessToken) {
        setIsAuth(true);
      } else {
        setIsAuth(false)
      }
    };
    checkAuth();
    StatusBar.setBarStyle(Platform.OS === 'ios' ? 'light-content' : 'default')
  }, [checkAuth]);

  return (
    <LinearGradient
      style={[styles.container, { paddingTop: statusBarHeight }]}
      colors={['#000', '#0D0D0D', '#333333']}
      start={[0.7, 0]}
      end={[0, 0]}
    >
      <StatusBar
        translucent
        backgroundColor="#61dafb"
        barStyle='light-content'
      />
      {isAuth && <Header />}
      <View style={styles.wrapper}>
        {isAuth ? (
          <>
            {(() => {
              switch (activeElement) {
                case 'chat':
                  return (
                    <>
                      <Group />
                    </>
                  )
                default:
                  return null;
              }
            })()}
          </>
        ) : (
          isReg ? <AuthRegister onChange={setIsReg} /> : <AuthLogin onChange={setIsReg} />
        )}
      </View>
      {isAuth && <NavFooter onChange={handleElementChange} activeElement={activeElement} />}
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrapper: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
  }
});
