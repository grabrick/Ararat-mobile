import {
    View,
    Image,
    StyleSheet,
    TouchableOpacity,
    Text,
    TouchableWithoutFeedback,
    Platform,
    Alert,
    TextInput,
    Button,
} from "react-native"
import Archive from '../../../../assets/images/archive.png'
import Pin from '../../../../assets/images/pin.png'
import Mark from '../../../../assets/images/mark.png'
import IsSound from '../../../../assets/images/isSound.png'
import Smile from '../../../../assets/images/smile.png'
import Copy from '../../../../assets/images/copy.png'
import Forward from '../../../../assets/images/forward.png'
import Reply from '../../../../assets/images/reply.png'
import Edit from '../../../../assets/images/edit-line.png'
import EditWhite from '../../../../assets/images/edit-line-white.png'
import ReplyWhite from '../../../../assets/images/replyWhite.png'
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { openedChatCheck, updateData } from "../../../redux/slices/contextMenuSlice"
import * as Clipboard from 'expo-clipboard';


export const ContextChatMenu = ({
    contextMenuVisible,
    touchMessage,
    setTouchMessage,
    setContextMenuVisible,
    contextConfig,
    authData,
}) => {
    const state = useSelector(state => state.contextMenuSlice)
    const [isActiveChangeMsg, setIsActiveChangeMsg] = useState(false)
    const [isActiveReplyMsg, setIsActiveReplyMsg] = useState(false)
    const [audioPath, setAudioPath] = useState('');
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputValue, setInputValue] = useState({
        msg: '',
    })
    const dispatch = useDispatch()
    const handleInputChange = (name, value) => {
        setInputValue({ ...inputValue, [name]: value });
    };


    const handleOverlayPress = () => {
        if (state.openedChat === true) {
            dispatch(openedChatCheck(true))
        }
        setContextMenuVisible(false);
        setTouchMessage(null)
    };

    const copyToClipboard = () => {
        Clipboard.setStringAsync(touchMessage.msg)

        // Вывод уведомления на iOS
        if (Platform.OS === 'ios') {
            Alert.alert(
                'Текст скопирован',
                'Текст был скопирован в буфер обмена',
                [{ text: 'OK', onPress: () => handleOverlayPress() }],
                { cancelable: false }
            );
        } else if (Platform.OS === 'android') {
            // Вывод уведомления на Android
            ToastAndroid.show('Текст скопирован в буфер обмена', ToastAndroid.SHORT);
            handleOverlayPress()
        }
    };

    useEffect(() => {
        if (isActiveChangeMsg) {
            setInputValue({ ...inputValue, msg: touchMessage?.msg });
        }
    }, [isActiveChangeMsg, touchMessage?.msg]);

    const editMessage = () => {
        const msg_id = 'msg_id';
        const msg = 'msg';
        const files = 'files';
        const formData = new FormData();
        formData.append(msg, inputValue.msg);
        formData.append(msg_id, touchMessage._id);
        formData.append(files, audioPath || selectedImage);
        const formParts = formData._parts.map((part) => [part[0], part[1]]);
        const msgValue = formParts.find((part) => part[0] === msg)[1];
        const msgIdValue = formParts.find((part) => part[0] === msg_id)[1];
        const filesValue = formParts.find((part) => part[0] === files)[1];


        if (touchMessage?.msg === inputValue.msg) {
            setIsActiveChangeMsg(false)
        } else {
            AxiosInstance.put('/dialog/sendMessage', { msg_id: msgIdValue, msg: msgValue, files: filesValue })
                .then(res => {
                    if (res.status === 200) {
                        handleOverlayPress()
                        AxiosInstance.get('/dialog/chat', { params: { id: state.chatId } }).then(res => {
                            if (res.status === 200) {
                                dispatch(updateData({ chat: res.data, chatId: state.chatId }))
                            }
                        })
                        // dispatch(updateData({ chat: res.data, chatId: chatID }))
                    }
                })
        }
    }

    const onClickReply = () => {
        const msg = 'msg';
        const to = 'to';
        const reply = 'reply';
        const files = 'files';
        const formData = new FormData();
        formData.append(msg, inputValue.msg);
        formData.append(to, state.chatId);
        formData.append(reply, touchMessage?._id);
        formData.append(files, audioPath || selectedImage);
        const formParts = formData._parts.map((part) => [part[0], part[1]]);
        const msgValue = formParts.find((part) => part[0] === msg)[1];
        const toValue = formParts.find((part) => part[0] === to)[1];
        const replyValue = formParts.find((part) => part[0] === reply)[1];
        const filesValue = formParts.find((part) => part[0] === files)[1];

        AxiosInstance.post('dialog/sendMessage', { msg: msgValue, to: toValue, reply: replyValue, files: filesValue })
            .then((res) => {
                if (res.status === 200) {
                    handleOverlayPress()
                    setInputValue({ input: '', reply: '', imageFiles: [], audioFiles: [] });
                    AxiosInstance.get('/dialog/chat', { params: { id: state.chatId } }).then(res => {
                        if (res.status === 200) {
                            dispatch(updateData({ chat: res.data, chatId: state.chatId }))
                        }
                    })
                }
            })
            .catch((error) => {
                console.error('Ошибка при отправке сообщения:', error);
            });
    }

    const handleMenuItemPress = (trigger) => {
        if (contextConfig === "CurrentChat") {
            if (authData.user._id === touchMessage.from._id) {
                switch (trigger) {
                    case "Редактировать":
                        return (
                            isActiveChangeMsg
                                ? setIsActiveChangeMsg(false)
                                : setIsActiveChangeMsg(true)
                        )
                    case "Переслать сообщение":
                        return (
                            console.log("3")
                        )
                    case "Скопировать":
                        return (
                            copyToClipboard()
                        )
                    default:
                        null
                }
            } else {
                switch (trigger) {
                    case "Ответить":
                        return (
                            isActiveReplyMsg
                                ? setIsActiveReplyMsg(false)
                                : setIsActiveReplyMsg(true)
                        )
                    case "Отреагировать":
                        return (
                            console.log("2")
                        )
                    case "Переслать сообщение":
                        return (
                            console.log("3")
                        )
                    case "Скопировать":
                        return (
                            copyToClipboard()
                        )
                    default:
                        null
                }
            }
        } else {
            switch (trigger) {
                case "Добавить тег":
                    return (
                        console.log("2")
                    )
                case "Архив":
                    return (
                        console.log("3")
                    )
                case "Закрепить":
                    return (
                        console.log("4")
                    )
                case "Заглушить":
                    return (
                        console.log("4")
                    )
                default:
                    null
            }
        }

    }
    return (
        <>
            {contextConfig === "CurrentChat" ? (
                <TouchableWithoutFeedback onPress={() => handleOverlayPress()}>
                    <View style={styles.container}>
                        <View style={styles.touchWrapper}>
                            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                <View style={styles.touchMsg}>
                                    {isActiveChangeMsg && (
                                        <>
                                            <Text style={styles.title}>{touchMessage?.from?.name}{" "}{touchMessage?.from?.sname}</Text>
                                            <TextInput
                                                // style={styles.input}
                                                placeholder="Сообщение"
                                                value={inputValue.msg}
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text) => handleInputChange('msg', text)}
                                            />
                                            {inputValue.msg.length === 0
                                                ? <Text style={{
                                                    color: '#e04b5a',
                                                    fontSize: 12,
                                                    marginTop: 2,
                                                    marginBottom: 2,
                                                }}
                                                >
                                                    Поле должно быть заполнено
                                                </Text>
                                                : null
                                            }
                                            <Button
                                                onPress={() => editMessage()}
                                                disabled={inputValue.msg.length === 0 && true}
                                                title="Сохранить"
                                            ></Button>
                                        </>
                                    )}
                                    {isActiveReplyMsg || isActiveChangeMsg ? (
                                        <View style={{ display: 'none' }}>
                                            <Text style={styles.title}>{touchMessage?.from?.name}{" "}{touchMessage?.from?.sname}</Text>
                                            <Text>{touchMessage?.msg}</Text>
                                        </View>
                                    ) : (
                                        <>
                                            <Text style={styles.title}>{touchMessage?.from?.name}{" "}{touchMessage?.from?.sname}</Text>
                                            <Text>{touchMessage?.msg}</Text>
                                        </>
                                    )}
                                    {isActiveReplyMsg && (
                                        <>
                                            <View style={{ backgroundColor: '#868686', padding: 5, borderRadius: 5 }}>
                                                <View style={{ borderLeftWidth: 2, borderLeftColor: '#fff', paddingLeft: 5 }}>
                                                    <Text style={styles.smallTitle}>{touchMessage?.from?.name}{" "}{touchMessage?.from?.sname}</Text>
                                                    <Text>{touchMessage?.msg}</Text>
                                                </View>
                                            </View>
                                            <TextInput
                                                style={styles.input}
                                                placeholder="Сообщение"
                                                value={inputValue.msg}
                                                multiline={true}
                                                numberOfLines={4}
                                                onChangeText={(text) => handleInputChange('msg', text)}
                                            />
                                            {inputValue.msg.length === 0
                                                ? <Text style={{
                                                    color: '#e04b5a',
                                                    fontSize: 12,
                                                    marginTop: 2,
                                                    marginBottom: 2,
                                                }}
                                                >
                                                    Поле должно быть заполнено
                                                </Text>
                                                : null
                                            }

                                            <Button onPress={() => onClickReply()} disabled={inputValue?.msg?.length === 0 && true} title="Отправить"></Button>
                                        </>
                                    )}
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {contextMenuVisible && (
                            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                {authData?.user?._id === touchMessage?.from?._id ? (
                                    <View style={styles.contextMenu}>
                                        <TouchableOpacity
                                            style={isActiveChangeMsg
                                                ? styles.activeButtonWrapper
                                                : styles.buttonWrapper
                                            }
                                            onPress={() => handleMenuItemPress('Редактировать')}
                                        >
                                            <Image style={styles.icon} source={isActiveChangeMsg ? EditWhite : Edit} />
                                            <Text style={isActiveChangeMsg ? styles.activeText : null} >Редактировать</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Переслать сообщение')}>
                                            <Image style={styles.icon} source={Forward} />
                                            <Text>Переслать сообщение</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Скопировать')}>
                                            <Image style={styles.icon} source={Copy} />
                                            <Text>Скопировать</Text>
                                        </TouchableOpacity>
                                    </View>
                                ) : (
                                    <View style={styles.contextMenu}>
                                        <TouchableOpacity style={isActiveReplyMsg
                                            ? styles.activeButtonWrapper
                                            : styles.buttonWrapper
                                        }
                                            onPress={() => handleMenuItemPress('Ответить')}>
                                            <Image style={styles.icon} source={isActiveReplyMsg ? ReplyWhite : Reply} />
                                            <Text style={isActiveReplyMsg ? styles.activeText : null} >Ответить</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Отреагировать')}>
                                            <Image style={styles.icon} source={Smile} />
                                            <Text>Отреагировать</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Переслать сообщение')}>
                                            <Image style={styles.icon} source={Forward} />
                                            <Text>Переслать сообщение</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Скопировать')}>
                                            <Image style={styles.icon} source={Copy} />
                                            <Text>Скопировать</Text>
                                        </TouchableOpacity>
                                    </View>
                                )}
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            ) : (
                <TouchableWithoutFeedback onPress={() => handleOverlayPress()}>
                    <View style={styles.container}>
                        <View style={styles.touchWrapper}>
                            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                <View style={styles.groupTouchMsg}>
                                    <Image style={styles.img} src={touchMessage?.avatar}></Image>
                                    <View style={styles.nameWrapper}>
                                        <Text style={styles.title}>{touchMessage?.name}{" "}{touchMessage?.sname}</Text>
                                        {touchMessage?.lastmsg?.audio === null && (
                                            <Text
                                                style={styles.lastmsg}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >{touchMessage?.lastmsg?.msg}</Text>
                                        )}
                                        {touchMessage?.lastmsg?.msg.length === 0 && (
                                            <Text
                                                style={styles.lastmsg}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >{'Голосовое сообщение'}</Text>
                                        )}
                                    </View>
                                </View>
                            </TouchableWithoutFeedback>
                        </View>
                        {contextMenuVisible && (
                            <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                                <View style={styles.contextMenu}>
                                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Добавить тег')}>
                                        <Image style={styles.icon} source={Mark} />
                                        <Text>Добавить тег</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Архив')}>
                                        <Image style={styles.icon} source={Archive} />
                                        <Text>Архив</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Закрепить')}>
                                        <Image style={styles.icon} source={Pin} />
                                        <Text>Закрепить</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.buttonWrapper} onPress={() => handleMenuItemPress('Заглушить')}>
                                        <Image style={styles.icon} source={IsSound} />
                                        <Text>Заглушить</Text>
                                    </TouchableOpacity>
                                </View>
                            </TouchableWithoutFeedback>
                        )}
                    </View>
                </TouchableWithoutFeedback>
            )}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        position: 'relative',
        paddingLeft: 20,
        paddingRight: 20,
        paddingBottom: 20,
        // alignItems: 'center'
    },
    touchWrapper: {},
    contextMenu: {
        marginTop: 20,
        maxWidth: 210,
        backgroundColor: 'white',
        padding: 10,
        gap: 10,
        borderRadius: 5,
        elevation: 5,
    },
    activeText: {
        color: '#fff'
    },
    replyText: {
        backgroundColor: '#f0f0f0'
    },
    img: {
        width: 40,
        height: 40,
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 50
    },
    input: {
        marginTop: 10,
        padding: 5,
        fontSize: 17,
    },
    title: {
        fontSize: 17,
        marginBottom: 10,
    },
    groupTouchMsg: {
        padding: 10,
        borderRadius: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    touchMsg: {
        padding: 10,
        borderRadius: 10,
        // width: 100,
        // height: 100,
        backgroundColor: '#fff'
    },
    buttonWrapper: {
        flexDirection: 'row',
        gap: 10,
    },
    activeButtonWrapper: {
        flexDirection: 'row',
        gap: 10,
        padding: 5,
        backgroundColor: '#868686',
        borderRadius: 5,
    },
    icon: {
        width: 20,
        height: 20,
    },
});