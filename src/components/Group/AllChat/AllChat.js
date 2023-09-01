import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity,
    TouchableWithoutFeedback,
    TextInput,
    Button,
    Platform
} from "react-native";
import Archive from '../../../../assets/images/archive_folder.png'
import { useEffect, useState } from "react";
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import SearchLoop from '../../../../assets/images/Search.png'
import { Labels } from "../../UI/Labels/Labels";
import { isActive } from "../../../redux/slices/otherFuncSlice";
import { useDispatch, useSelector } from "react-redux";
import { fetchAuthData } from "../../Extra/FetchAuthData/FetchAuthData";
import { getChatId } from "../../../redux/slices/chatSlice";
import { openedChatCheck, setConfig } from "../../../redux/slices/contextMenuSlice";
import { setData } from "../../../redux/slices/groupSlice";
import { LinearGradient } from "expo-linear-gradient";
// import Data from '../../Extra/Catalog.json'
// import NotFound from '../../../../assets/images/Profile.png'

export const AllChat = ({
    setIsActiveChat,
    setChatID,
    setContextConfig,
    navigation,
    categoryActive,
    setCategoryActive
}) => {
    const [isAuthData, setIsAuthData] = useState({})
    const [searchText, setSearchText] = useState('');
    const [highlightMessages, setHighlightMessages] = useState(false);
    const [searchResults, setSearchResults] = useState([]);
    const isActiveKeyboard = useSelector(state => state.otherFuncSlice.isActiveKeyboard)
    const data = useSelector(state => state.groupSlice)
    const findGroup = data.findGroup
    const dispatch = useDispatch()
    const group = data?.data?.chats
    useEffect(() => {
        const params = { id: isAuthData?.user?._id }
        const config = {
            headers: {
                Authorization: isAuthData?.refreshToken
            }
        };
        AxiosInstance.get(`/dialog/getDialogs`, { params }, config)
            .then(res => {
                // console.log(res.data);
                dispatch(setData(res.data))
            }).catch(e => {
                console.log(e);
            })
    }, [isAuthData])

    useEffect(() => {
        const asyncFun = async () => {
            const authData = await fetchAuthData()
            setIsAuthData(authData)
        }
        asyncFun()
    }, [])
    const moveToChat = (chatId) => {
        setContextConfig("GroupChat")
        setIsActiveChat(true)
        setChatID(chatId)
        dispatch(getChatId(chatId))
    }
    const callContextMenu = (item) => {
        navigation.navigate("ContextMenu")
        dispatch(setConfig({ contextConfig: "Group", isVisibleMenu: true, touchMessage: item }))
    }

    const handleEmptyAreaPress = () => {
        dispatch(isActive(false))
    }
    useEffect(() => {
        if (isActiveKeyboard === true) {
            handleEmptyAreaPress()
        }
    }, [])
    return (
        <SafeAreaView style={styles.container}>
            <>
            <View style={styles.searchContainer}>
                <LinearGradient
                    colors={['#CCC', '#FFF', '#C8C8C8', '#FFF', '#C4C4C4']}
                    locations={[0, 0.2292, 0.5208, 0.7813, 1]}
                    start={[0.5, 0]}
                    end={[0.5, 1]}
                    style={styles.LinearGradient}
                >
                    <View style={[styles.inputWrapper, { marginBottom: 10 }]}>
                        <TextInput
                            style={styles.input}
                            placeholder="Поиск"
                            onChangeText={(text) => {
                                setSearchText(text);
                              
                                if (String(text).length === 0) {
                                  setSearchResults([]);
                                } else {
                                  const results = group.filter((chat) =>
                                    chat.name.toLowerCase().includes(text.toLowerCase())
                                  );
                                  setSearchResults(results);
                                }
                              
                                setHighlightMessages(!!text);
                              }}
                            value={searchText}
                        />
                        <TouchableOpacity>
                            <Image style={styles.img} source={SearchLoop} />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.buttonWrapper}>
                        {Platform.OS === 'android' ? (
                            <View style={{flexDirection: 'row', alignItems: 'center', }}>
                                <Button color={categoryActive === "Чат" ? '#353535' : '#353535'} onPress={() => setCategoryActive("Чат")} title="Чат" style={styles.gradientButton}></Button>
                                {/* <Button color={categoryActive === "Звонки" ? '#353535' : '#FFFFFF'} onPress={() => { setCategoryActive("Звонки")}} title="Звонки" style={styles.gradientButton} disabled={true}></Button> */}
                            </View>
                        ) : (
                            <>
                            <LinearGradient
                            colors={categoryActive === "Чат"
                                ? ['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']
                                : ['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']
                            }
                            locations={categoryActive === "Чат" ? [0, 0.2292, 0.5208, 0.7813, 1] : null}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.gradientButton}
                        >
                            <Button color={categoryActive === "Чат" ? '#353535' : '#FFFFFF'} onPress={() => setCategoryActive("Чат")} title="Чат" style={styles.button}></Button>
                        </LinearGradient>
                        {/* <LinearGradient
                            disabled={true}
                            colors={categoryActive === "Звонки"
                                ? ['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']
                                : ['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']
                            }
                            locations={categoryActive === "Звонки" ? [0, 0.0771, 0.4937, 0.749, 1] : null}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.gradientButton}
                        >
                            <Button color={categoryActive === "Звонки" ? '#353535' : '#FFFFFF'} onPress={() => { setCategoryActive("Звонки")}} title="Звонки" style={styles.button} disabled={true}></Button>
                        </LinearGradient> */}
                        </>
                        )}
                    </View>
                </LinearGradient>
            </View>
            <TouchableOpacity
                onPress={() => navigation.navigate("Archive")}
                style={[styles.TouchableOpacity, { backgroundColor: 'transparent', }]}
            >
                <View style={styles.archive}>
                    <Image style={styles.archiveImg} source={Archive} />
                    <Text style={styles.text}>Архив</Text>
                </View>
            </TouchableOpacity>
            <TouchableWithoutFeedback onPress={handleEmptyAreaPress}>
                {group?.length > 0 ? (
                    <FlatList
                        data={searchResults.length !== 0 ? searchResults : group}
                        style={styles.flatList}
                        scrollEnabled={data.length > 4 ? true : false}
                        keyExtractor={(item) => item._id}
                        renderItem={({ item }) => (
                            <TouchableOpacity
                                onLongPress={() => callContextMenu(item)}
                                onPress={() => {
                                    navigation.navigate("Chat"),
                                    moveToChat(item._id)
                                }}
                                style={searchResults.length === 0 ? styles.chat : styles.activeChat}>
                                <Image
                                    style={styles.chatImage}
                                    src={item.avatar}
                                />
                                <View>
                                    <Text>{item.name}</Text>
                                    {item?.lastmsg?.audio === null && (
                                        <Text
                                            style={styles.lastmsg}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >{item?.lastmsg?.msg}</Text>
                                    )}
                                    {item?.lastmsg?.msg.length === 0 && (
                                        <Text
                                            style={styles.lastmsg}
                                            numberOfLines={1}
                                            ellipsizeMode="tail"
                                        >{'Голосовое сообщение'}</Text>
                                    )}
                                </View>
                            </TouchableOpacity>
                        )}
                    />

                ) : (
                    <View style={styles.warningWrapper}>
                        <Text style={styles.warningMsg}>У вас нет активных чатов.</Text>
                    </View>
                )}
            </TouchableWithoutFeedback>
            </>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: '#F0F0F0',
    },
    TouchableOpacity: {
        width: '100%',
        paddingLeft: 20,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
    },
    LinearGradient: {
        // width: '100%',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        paddingTop: 10,
        // height: 80,
        flexDirection: 'column',
        justifyContent: 'center',
        // alignItems: 'center'
    },
    searchContainer: {
        width: '100%'
    },
    inputWrapper: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        paddingRight: 10,
        backgroundColor: '#fff',
        gap: 10,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10
    },
    button: {
        width: 150,
    },
    gradientButton: {
        width: 160,
        borderRadius: 20
    },
    buttonWrapper: {
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 10,
        paddingRight: 10,
    },
    input: {
        backgroundColor: '#fff',
        flex: 1,
        // margin: 10,
        padding: 7,
        fontSize: 15,
        borderRadius: 10
    },
    img: {
        width: 20,
        height: 20
    },
    flatList: {
        flex: 1,
        width: '100%',
    },
    archiveImg: {
        width: 40,
        height: 40,
    },
    lastmsg: {
        maxWidth: 220,
        overflow: 'hidden',
    },
    chatImage: {
        width: 40,
        height: 40,
        borderColor: '#000',
        borderRadius: 50,
        borderWidth: 2,
    },
    warningWrapper: {
        flex: 1,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningMsg: {
        fontSize: 20,
    },
    activeChat: {
        width: '100%',
        paddingLeft: 20,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        gap: 30,
        backgroundColor: '#FBCEB1',
    },
    chat: {
        width: '100%',
        paddingLeft: 20,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        gap: 30,
    },
    text: {
        color: '#000',
        fontSize: 17,

    },
    archive: {
        gap: 20,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'transparent',
        paddingTop: 5,
        paddingBottom: 5,
    }
});