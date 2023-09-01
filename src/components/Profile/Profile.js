import { Button, Image, SafeAreaView, StatusBar, Text, View } from "react-native"
import { fetchAuthData } from "../Extra/FetchAuthData/FetchAuthData"
import { useEffect, useState } from "react"
import * as SecureStore from 'expo-secure-store';
import AxiosInstance from '../Extra/Axios/AxiosInstance'

export const Profile = ({ navigation }) => {
    const [authData, setAuthData] = useState()
    useEffect(() => {
        const fetchData = async () => {
            const auth = await fetchAuthData()
            setAuthData(auth)
        }
        fetchData()
    }, [])
    // console.log(authData);
    const logout = () => {
        AxiosInstance.post('auth/logout', { refreshToken: authData.refreshToken })
            .then(res => {
                if (res.status === 200) {
                    SecureStore.deleteItemAsync('Auth', {})
                    navigation.goBack()
                    setIsReg(false)
                }
            })
    }
    return (
        <SafeAreaView style={{flexDirection: 'column', alignItems: 'center'}}>
            <StatusBar
                translucent
                barStyle={Platform.OS === 'ios' ? 'dark-content' : null}
            />
            <View style={{flexDirection: 'column', alignItems: 'center', gap: 10}}>
                <Image style={{borderColor: 'black', borderWidth: 2, borderRadius: 50, width: 50, height: 50}} src={authData?.user?.avatar} />
                <Text>{authData?.user?.name}{' '}{authData?.user?.sname}</Text>
                <Text>{authData?.user?.email}</Text>
                <Button onPress={() => logout()} title="Выйти"></Button>
            </View>
        </SafeAreaView>
    )
}