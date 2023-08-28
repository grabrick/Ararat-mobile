import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from "react-native";
import * as SecureStore from 'expo-secure-store';
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import Logo from '../../../../assets/images/Logo.png'
import { useState } from "react";
import { setAuth } from "../../../redux/slices/authSlice";
import { useDispatch } from "react-redux";

export const AuthLogin = ({swap, onChange}) => {
    const dispatch = useDispatch()
    const [inputValue, setInputValue] = useState({
        email: '',
        password: ''
    })
    const handleInputChange = (name, value) => {
        setInputValue({ ...inputValue, [name]: value });
    };

    const saveAuthToken = async (token) => {
        try {
          const serializedData = JSON.stringify(token);
          if(serializedData) {
            await SecureStore.setItemAsync('Auth', serializedData);
            onChange(true)
          }
        } catch (error) {
          console.error('Ошибка при сохранении токена:', error);
        }
    }

    const onClickAuth = () => {
        AxiosInstance.post(`/auth/login`, inputValue)
        .then(res => {
            if (res.status === 200) {
                saveAuthToken(res.data)
                dispatch(setAuth(res.data))
            }
        }).catch(e => {
            console.error(e)
        })
    }
    return (
        <View style={styles.container}>
            <View style={styles.wrapper}>
                <Image source={Logo} />

                <View style={styles.formInput}>
                    <TextInput 
                        value={inputValue.email} 
                        onChangeText={(text) => handleInputChange('email', text)} 
                        placeholder="Email пользователя" 
                        style={styles.input} 
                    />
                    <TextInput 
                        value={inputValue.password} 
                        onChangeText={(text) => handleInputChange('password', text)} 
                        placeholder="Пароль пользователя" 
                        style={styles.input} 
                    />
                    <View style={styles.regLinkWrapper}>
                        <Text style={styles.link}>Нет аккаунта</Text>
                        <Button title="Регистрация" onPress={() => swap(true)}></Button>
                    </View>
                </View>
                <View style={styles.loginWrapper}>
                    <TouchableOpacity 
                        style={styles.button}
                        onPress={() => onClickAuth()}
                    >
                        <Text style={styles.text}>Войти</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    wrapper: {
        paddingTop: 20,
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        height: 600,
    },
    button: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
        width: 80
    },
    regLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    link: {
        color: '#fff',
        fontSize: 17,
    },
    text: {
        color: '#000',
        fontWeight: 600,
        fontSize: 17
    },
    formInput: {
        padding: 15,
    },
    input: {
        backgroundColor: '#fff',
        borderRadius: 5,
        padding: 5,
        marginBottom: 20,
        fontSize: 18,
        width: 300
    },
    loginWrapper: {

    }
});