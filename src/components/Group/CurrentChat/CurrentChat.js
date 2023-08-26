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
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import Back from '../../../../assets/images/back.png'
import More from '../../../../assets/images/more.png'
import Phone from '../../../../assets/images/phone.png'
import Mic from '../../../../assets/images/mic.png'
import Camera from '../../../../assets/images/camera.png'
import Kind from '../../../../assets/images/kind.png'
import Smile from '../../../../assets/images/smile.png'

export const CurrentChat = ({ chatID, setIsActiveChat, authData, setTouchMessage, setContextMenuVisible }) => {
    const [data, setData] = useState()
    const [isTap, setIsTap] = useState(false)
    
    const findMyMessage = data?.messages.find(i => i)
    const message = data?.messages
    // console.log(data.users);
    useEffect(() => {
        AxiosInstance.get('/dialog/chat', { params: { id: chatID } }).then(res => {
            if (res.status === 200) {
                // console.log(res.data);
                setData(res.data)
            }
        })
    }, [])

    const pressable = (item) => {
        setContextMenuVisible(true)
        setTouchMessage(item)
    }

    const handleEmptyAreaPress = () => {
        if (isTap) {
            setIsTap(false);
            Keyboard.dismiss(); 
        }
    }

    return (
        <View style={styles.container}>
            <TouchableWithoutFeedback style={styles.index} onPress={handleEmptyAreaPress}>
                <View style={styles.messangerWrapper}>
                    <View style={styles.groupInfo}>
                        <View style={styles.personInfo}>
                            <TouchableOpacity onPress={() => setIsActiveChat(false)}>
                                <Image style={styles.backImg} source={Back} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.groupImg} src={data?.user.avatar} />
                            </TouchableOpacity>
                            <View style={styles.textWrapper}>
                                <Text style={styles.title}>{data?.user.name}</Text>
                                <View style={styles.peapleContainer}>
                                    <Text 
                                        numberOfLines={1} 
                                        ellipsizeMode="tail" 
                                        style={styles.peapleWrapper}
                                    >
                                        {data?.users.map(i => (
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
                            <View style={item.from._id === authData.user._id ? styles.myMessage : styles.message}>
                                <TouchableOpacity style={styles.avatarOpacity}>
                                    <Image style={styles.img} src={item.from.avatar} />
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
                                    <Text>{item.msg}</Text>
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
                    <View style={styles.chatFooter}>
                        <View style={styles.inputWrapper}>
                            <TouchableOpacity>
                                <Image style={styles.inputImg} source={Smile} />
                            </TouchableOpacity>
                            <TextInput onPressIn={() => setIsTap(true)} placeholder="Сообщение" style={styles.input} />
                        </View>
                        <View style={styles.imgWrapper}>
                            <TouchableOpacity>
                                <Image style={styles.inputImage} source={Kind} />
                            </TouchableOpacity>
                            <TouchableOpacity>
                                <Image style={styles.inputImage} source={Camera} />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <TouchableOpacity style={styles.mic}>
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
        marginBottom: 130,
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
    chatFooter: {
        // flex: 1,
        height: 50,
        width: '85%',
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
        maxWidth: 200,
        fontSize: 17,
        padding: 5,
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