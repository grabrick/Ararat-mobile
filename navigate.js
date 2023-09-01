import MainPage from './src/pages/MainPage/MainPage';
import {Group} from './src/components/Group/Group'
import { LinearGradient } from 'expo-linear-gradient';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AllChat } from './src/components/Group/AllChat/AllChat';
import { NavFooter } from './src/components/NavFooter/NavFooter';
import { Archive } from './src/components/Group/Archive/Archive';
import { CurrentChat } from './src/components/Group/CurrentChat/CurrentChat';
import { ContextChatMenu } from './src/components/UI/ContextChatMenu/ContextChatMenu';
import {GroupProfile} from './src/components/GroupProfile/GroupProfile'
import { ViewCamera } from './src/components/UI/ViewCamer/ViewCamera';
import { WatchImage } from './src/components/UI/WatchImage/WatchImage';
import { Platform } from 'react-native';
import { Profile } from './src/components/Profile/Profile';
import { AuthRegister } from './src/components/Auth/AuthRegister/AuthRegister';


const Stack = createNativeStackNavigator();

export const Navigate = () => {

    return (
        <LinearGradient
        style={{
          flex: 1,
          flexDirection: 'column',
          justifyContent: 'space-between'
        }}
        colors={['#000', '#0D0D0D', '#333333']}
        start={[0.7, 0]}
        end={[0, 0]}
      >
        <NavigationContainer>
          <Stack.Navigator initialRouteName='Home' screenOptions={{ headerStyle: { backgroundColor: 'transparent' } }}>
            <Stack.Screen 
              name="Home" 
              component={MainPage} 
              options={{
                title: '',
                headerShown: false,
                animation: Platform.OS === 'android' ? 'none' : 'default'
              }}
            />
            <Stack.Screen 
              name="Chat" 
              component={CurrentChat} 
              options={{
                title: '', 
                headerShown: false,
                animation: Platform.OS === 'android' ? 'none' : 'default'
              }} 
            />
            <Stack.Screen 
              name="Archive" 
              component={Archive} 
              options={{
                title: '',
                headerShown: false,
                animation: Platform.OS === 'android' ? 'none' : 'default'
            }} 
            />
            <Stack.Screen 
              name="ContextMenu" 
              component={ContextChatMenu} 
              options={{
                title: '',
                presentation: 'modal',
                headerShown: false,
                animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
            <Stack.Screen 
              name="GroupProfile" 
              component={GroupProfile} 
              options={{
              title: '',
              headerShown: false,
              animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
            <Stack.Screen 
              name="Camera" 
              component={ViewCamera} 
              options={{
              title: '',
              headerShown: false,
              animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
            <Stack.Screen 
              name="Image" 
              component={WatchImage} 
              options={{
              title: '',
              presentation: 'modal',
              headerShown: false,
              animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
            <Stack.Screen 
              name="Profile" 
              component={Profile} 
              options={{
              title: '',
              headerShown: false,
              animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
            <Stack.Screen 
              name="Registr" 
              component={AuthRegister} 
              options={{
              title: '',
              headerShown: false,
              animation: Platform.OS === 'android' ? 'none' : 'default'
            }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </LinearGradient>
    )
}