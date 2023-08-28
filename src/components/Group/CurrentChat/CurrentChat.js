import { useEffect, useState } from "react";
import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Platform,
    KeyboardAvoidingView,
    TouchableWithoutFeedback,
    Keyboard,
} from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { startRecording, stopRecording } from '../../Extra/AudiRecorder/AudiRecorder';
import { Camera } from 'expo-camera';
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import Back from '../../../../assets/images/back.png'
import More from '../../../../assets/images/more.png'
import Phone from '../../../../assets/images/phone.png'
import Mic from '../../../../assets/images/mic.png'
import CameraImg from '../../../../assets/images/camera.png'
import Kind from '../../../../assets/images/kind.png'
import Smile from '../../../../assets/images/smile.png'
import { useDispatch, useSelector } from "react-redux";
import { openedChatCheck, updateData } from "../../../redux/slices/contextMenuSlice";
import { cameraVisible } from "../../../redux/slices/cameraSlice";
import { chatData } from "../../../redux/slices/chatSlice";

export const CurrentChat = ({
    chatID,
    setIsActiveChat,
    authData,
    setTouchMessage,
    setContextMenuVisible,
    setContextConfig,
    setIsActiveKeyoard
}) => {
    const [isTap, setIsTap] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputValue, setInputValue] = useState({
        input: '',
        reply: '',
        files: ''
    })
    const [isRecording, setIsRecording] = useState(false);
    const [audioPath, setAudioPath] = useState('');
    const state = useSelector(state => state.contextMenuSlice)
    const dispatch = useDispatch()
    const message = state?.data.messages

    const openCamera = async () => {
        const { status } = await Camera.requestCameraPermissionsAsync();

        if (status === 'granted') {
            dispatch(cameraVisible(true))
        }
    };

    const handleInputChange = (name, value) => {
        setInputValue({ ...inputValue, [name]: value });
    };

    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 0.5,
        });

        if (!result.canceled) {
            // Вместо result.uri, используйте result.assets[0].uri
            setSelectedImage({ uri: result.assets[0].uri });
        }
    };

    const handleSendMessage = () => {
        if (inputValue.input.trim() !== '') {
            const msg = 'msg';
            const to = 'to';
            const reply = 'reply';
            const files = 'files';
            const formData = new FormData();
            formData.append(msg, inputValue.input);
            formData.append(to, state.chatId);
            formData.append(reply, '');
            formData.append(files, audioPath || selectedImage);
            const formParts = formData._parts.map((part) => [part[0], part[1]]);
            const msgValue = formParts.find((part) => part[0] === msg)[1];
            const toValue = formParts.find((part) => part[0] === to)[1];
            const replyValue = formParts.find((part) => part[0] === reply)[1];
            const filesValue = formParts.find((part) => part[0] === files)[1];

            //   console.log({...formData});
            //   if (inputValue.audioFiles && inputValue.audioFiles.length > 0) {
            //     formData.append('files', inputValue.audioFiles[0]);
            //   }

            //   if (inputValue.imageFiles && inputValue.imageFiles.length > 0) {
            //     formData.append('files', inputValue.imageFiles[0]);
            //     formData.append('text', inputValue.input);
            //   }

            AxiosInstance.post('dialog/sendMessage', { msg: msgValue, to: toValue, reply: replyValue, files: filesValue })
                .then((res) => {
                    if (res.status === 200) {
                        setInputValue({ input: '', reply: '', imageFiles: [], audioFiles: [] });
                        AxiosInstance.get('/dialog/chat', { params: { id: chatID } }).then(res => {
                            if (res.status === 200) {
                                dispatch(updateData({ chat: res.data, chatId: chatID }))
                            }
                        })
                    }
                })
                .catch((error) => {
                    console.error('Ошибка при отправке сообщения:', error);
                });
        }
    };

    useEffect(() => {
        setIsActiveKeyoard(isTap)
    }, [isTap])

    useEffect(() => {
        AxiosInstance.get('/dialog/chat', { params: { id: chatID } }).then(res => {
            if (res.status === 200) {
                dispatch(updateData({ chat: res.data, chatId: chatID }))
            }
        })
    }, [state])

    const pressable = (item) => {
        setContextConfig("CurrentChat")
        dispatch(openedChatCheck(true))
        setContextMenuVisible(true)
        setTouchMessage(item)
    }

    const handleEmptyAreaPress = () => {
        if (isTap) {
            setIsTap(false);
            Keyboard.dismiss();
        }
    }

    const handlerBack = () => {
        setIsActiveChat(false)
        dispatch(openedChatCheck(false))
    }

    const startAudioRecording = async () => {
        try {
            const path = await startRecording();
            setIsRecording(true);
            setAudioPath(path);
        } catch (error) {
            console.error('Ошибка при начале записи:', error);
        }
    };

    const stopAudioRecording = async () => {
        try {
            const path = await stopRecording();
            setIsRecording(false);
            setAudioPath(path);
        } catch (error) {
            console.error('Ошибка при завершении записи:', error);
        }
    };

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.index} onPress={handleEmptyAreaPress}>
                <View style={styles.messangerWrapper}>
                    <View style={styles.groupInfo}>
                        <View style={styles.personInfo}>
                            <TouchableOpacity onPress={() => handlerBack()}>
                                <Image style={styles.backImg} source={Back} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.groupImg} src={state?.data?.user?.avatar} />
                            </TouchableOpacity>
                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>{state?.data?.user?.name}</Text>
                                <View style={styles.peapleContainer}>
                                    <Text
                                        numberOfLines={1}
                                        ellipsizeMode="tail"
                                        style={styles.peapleWrapper}
                                    >
                                        {state?.data?.users?.map(i => (
                                            <Text
                                                key={i._id}
                                                style={styles.people}
                                            >
                                                {i.name}{" "}
                                            </Text>
                                        ))}
                                    </Text>
                                </View>
                            </View>
                        </View>
                        <View style={styles.moreFunc}>
                            <TouchableOpacity>
                                <Image style={styles.backImg} source={Phone} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image source={More} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableWithoutFeedback style={styles.index} onPress={handleEmptyAreaPress}>
                        <FlatList
                            data={message}
                            style={styles.flatList}
                            keyExtractor={(item) => item._id}
                            renderItem={({ item }) => (
                                <View style={item?.from?._id === authData?.user?._id ? styles.myMessage : styles.message}>
                                    <TouchableOpacity style={styles.avatarOpacity}>
                                        <Image style={styles.img} src={item?.from?.avatar} />
                                    </TouchableOpacity>
                                    <TouchableOpacity
                                        style={styles.messageWrapper}
                                        onLongPress={() => pressable(item)}
                                    >
                                        <Text
                                            style={styles.name}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >
                                            {item.from.name}{" "}{item.from.sname}
                                        </Text>
                                        <View>
                                            {item?.reply && (
                                                <View style={styles.replyWrapper}>
                                                    <View style={styles.bar}>
                                                        <Text style={styles.replyMsg}>{item?.reply.msg}</Text>
                                                    </View>
                                                </View>
                                            )}
                                            <Text>{item.msg}</Text>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={isTap === true ? styles.mover : null}
            >
                <View style={styles.chatContainer}>
                    <View style={[styles.chatFooter, inputValue.input.length > 15 && { height: 60 }]}>
                        <View style={[styles.inputWrapper, inputValue.input.length > 15 && { height: 60 }]}>
                            <TouchableOpacity>
                                <Image style={styles.inputImg} source={Smile} />
                            </TouchableOpacity>
                            <TextInput
                                onPressIn={() => setIsTap(true)}
                                onChangeText={(text) => handleInputChange('input', text)}
                                onSubmitEditing={handleSendMessage}
                                multiline={true}
                                numberOfLines={4}
                                returnKeyType="send"
                                placeholder="Сообщение"
                                style={styles.input}
                            />
                        </View>
                        <View style={styles.imgWrapper}>
                            <TouchableOpacity onPress={() => openImagePicker()}>
                                <Image style={styles.inputImage} source={Kind} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => openCamera()}>
                                <Image style={styles.inputImage} source={CameraImg} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={isRecording ? styles.micActive : styles.mic} onPress={isRecording ? stopAudioRecording : startAudioRecording}>
                        <Image style={styles.inputImage} source={Mic} />
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: 200,
        backgroundColor: '#F0F0F0',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    messangerWrapper: {
        flex: 1,
        flexDirection: 'column'
    },
    flatListContainer: {
        flex: 1,
    },
    index: {
        zIndex: 1,
    },
    mover: {
        flex: 1,
        marginBottom: 15,
    },
    replyMsg: {
        marginLeft: 10,
    },
    bar: {
        borderLeftColor: 'black',
        borderLeftWidth: 2,
    },
    replyWrapper: {
        padding: 5,
        backgroundColor: '#f0f0f0',
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    chatContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 20,
        padding: 10,
    },
    flatList: {
        flex: 1,
        paddingLeft: 7,
        paddingRight: 7,
        // width: '100%',
        // maxHeight: '75%',
        flexDirection: 'column'
    },
    imgWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    mic: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#353535'
    },
    micActive: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#e04b5a'
    },
    chatFooter: {
        // flex: 1,
        width: '85%',
        minHeight: 50,
        backgroundColor: '#fff',
        // backgroundColor: 'red',
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    input: {
        width: 160,
        fontSize: 17,
        padding: 5,
        // backgroundColor: 'red'
        backgroundColor: 'transparent',
    },
    inputImage: {
        width: 25,
        height: 25
    },
    inputImg: {
        width: 30,
        height: 30
    },
    groupInfo: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10,
    },
    peapleWrapper: {
        maxWidth: 190,
        flexDirection: 'row',
    },
    moreFunc: {
        flexDirection: 'row',
        gap: 20,
        alignItems: 'center'
    },
    personInfo: {
        gap: 10,
        flexDirection: 'row',
        alignItems: 'center',
    },
    groupImg: {
        width: 30,
        height: 30,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 50,
    },
    backImg: {
        width: 20,
        height: 20,
    },
    avatarOpacity: {
        width: 30,
        height: 30,
    },
    img: {
        width: 30,
        height: 30,
        borderColor: '#000',
        borderWidth: 1,
        borderRadius: 50,
    },
    messageWrapper: {
        backgroundColor: '#fff',
        padding: 10,
    },
    myMessage: {
        gap: 10,
        flexDirection: 'row-reverse',
        maxWidth: 300,
        marginLeft: 'auto',
        marginBottom: 20,
    },
    message: {
        gap: 10,
        maxWidth: 300,
        flexDirection: 'row',
        marginRight: 'auto',
        marginBottom: 20,
    },
})