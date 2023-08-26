import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, Button } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as SecureStore from 'expo-secure-store';
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import Logo from '../../../../assets/images/Logo.png'
import { useState } from "react";
import axios from 'axios'

export const AuthRegister = ({ swap, onChange }) => {
    const [inputValue, setInputValue] = useState({
        email: '',
        name: '',
        sname: '',
        password: ''
    })
    const handleInputChange = (name, value) => {
        setInputValue({ ...inputValue, [name]: value });
    };

    const onClickAuth = () => {
        axios.post(`/auth/registration`, inputValue)
            .then(res => {
                saveAuthToken(res.data)
            })
    }

    const saveAuthToken = async (token) => {
        try {
            const serializedData = JSON.stringify(token);
            console.log(serializedData);
            await SecureStore.setItemAsync('Auth', serializedData);
            onChange(true)
        } catch (error) {
            console.error('Ошибка при сохранении токена:', error);
        }
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
                        value={inputValue.name}
                        onChangeText={(text) => handleInputChange('name', text)}
                        placeholder="Имя пользователя"
                        style={styles.input}
                    />
                    <TextInput
                        value={inputValue.sname}
                        onChangeText={(text) => handleInputChange('sname', text)}
                        placeholder="Фамилия пользователя"
                        style={styles.input}
                    />
                    <TextInput
                        value={inputValue.password}
                        onChangeText={(text) => handleInputChange('password', text)}
                        placeholder="Пароль пользователя"
                        style={styles.input}
                    />
                    <View style={styles.regLinkWrapper}>
                        <Text style={styles.link}>Есть аккаунт</Text>
                        <Button title="Войти" onPress={() => swap(false)}></Button>
                    </View>
                </View>
                <View style={styles.loginWrapper}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => onClickAuth()}
                    >
                        <Text style={styles.text}>Регистрация</Text>
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
        height: 750,
    },
    regLinkWrapper: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    button: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10,
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