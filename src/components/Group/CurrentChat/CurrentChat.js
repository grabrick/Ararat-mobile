import { useEffect, useRef, useState } from "react";
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
    Linking,
    SectionList,
    StatusBar,
    Dimensions,
    ScrollView,
} from "react-native";
import EmojiSelector, { Categories } from "react-native-emoji-selector";
import { BlurView } from 'expo-blur';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import { Audio } from 'expo-av';
import { startRecording, stopRecording } from '../../Extra/AudiRecorder/AudiRecorder';
import { Camera } from 'expo-camera';
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import BackLeft from '../../../../assets/images/arrow-left.png'
import More from '../../../../assets/images/more.png'
import Phone from '../../../../assets/images/phone.png'
import Mic from '../../../../assets/images/mic.png'
import CameraImg from '../../../../assets/images/camera.png'
import Kind from '../../../../assets/images/kind.png'
import Smile from '../../../../assets/images/smile.png'
import Play from '../../../../assets/images/play-line.png'
import Pause from '../../../../assets/images/pause-line.png'
import Close from '../../../../assets/images/close-line.png'
import TrashCan from '../../../../assets/images/trashCan.png'
import SearchIMG from '../../../../assets/images/Search.png'
import Send from '../../../../assets/images/send.png'
import { Timer } from '../../UI/Timer/Timer'
import notRead from '../../../../assets/images/check-line.png'
import isRead from '../../../../assets/images/check-double-line.png'
import { useDispatch, useSelector } from "react-redux";
import { openedChatCheck, setConfig, updateData } from "../../../redux/slices/contextMenuSlice";
import { cameraVisible, setCameraImg } from "../../../redux/slices/cameraSlice";
import { isActive, setUriImage } from "../../../redux/slices/otherFuncSlice";
import { fetchAuthData } from "../../Extra/FetchAuthData/FetchAuthData";
import { isActiveSearch } from "../../../redux/slices/otherFuncSlice";
import moment from 'moment';
import AutoHeightWebView from 'react-native-autoheight-webview'
import AutoLink from 'react-native-autolink';

export const CurrentChat = ({ navigation }) => {
    const [isTap, setIsTap] = useState(false)
    const [selectedImage, setSelectedImage] = useState(null);
    const [inputValue, setInputValue] = useState({
        input: '',
        reply: '',
        files: ''
    })
    const [isRecording, setIsRecording] = useState(false);
    const [isActivePlay, setIsActivePlay] = useState(false)
    const [selectEmoji, setSelectEmoji] = useState('')
    const [clickEmoji, setClickEmoji] = useState(false)
    const [audioPath, setAudioPath] = useState();
    const [authData, setAuthData] = useState()
    const [searchText, setSearchText] = useState('');
    const [highlightMessages, setHighlightMessages] = useState(false);
    const sectionListRef = useRef(null);
    const [searchResults, setSearchResults] = useState([]);
    const [fileObjects, setFileObjects] = useState([]);
    const [sound, setSound] = useState();
    const state = useSelector(state => state.contextMenuSlice)
    const cameraState = useSelector(state => state.cameraSlice.image)
    const chatId = useSelector(state => state.chatSlice.chatId)
    const isActiveSearchBar = useSelector(state => state.otherFuncSlice.isActiveSearchBar)
    const dispatch = useDispatch()
    const messageTimes = {};
    const groupedMessages = [];
    state?.data?.messages?.forEach(message => {
        const messageTime = moment(message.time);
        const formattedTime = messageTime.format('HH:mm');
        messageTimes[message._id] = formattedTime;
    });

    state?.data?.messages?.forEach(message => {
        const messageTime = moment(message.time);
        let dateLabel = messageTime.format('MMMM D');

        // Проверяем, существует ли уже группа с этой датой
        let group = groupedMessages.find(group => group.title === dateLabel);

        if (!group) {
            // Если группа с этой датой не существует, создаем новую
            group = { title: dateLabel, data: [] };
            groupedMessages.push(group);
        }

        group.data.push(message);
    });
    groupedMessages.sort((a, b) => moment(b.title, 'MMMM D').valueOf() - moment(a.title, 'MMMM D').valueOf());
    const reversedGroupedMessages = [...groupedMessages].reverse();

    useEffect(() => {
        const updatedInputValue = `${inputValue.input}${selectEmoji}`;
        setInputValue({ ...inputValue, input: updatedInputValue });
        setClickEmoji(false)
    }, [selectEmoji])

    useEffect(() => {
        dispatch(openedChatCheck(true))
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const auth = await fetchAuthData()
            setAuthData(auth)
        }
        fetchData()
    }, [])

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
            const { uri, fileName } = result.assets[0];
            const formData = new FormData();

            const imageFile = {
                uri,
                name: fileName,
                type: 'image/jpg', // Измените тип в зависимости от формата изображения
            };

            formData.append('files.file', imageFile);
            setSelectedImage(formData);
            setFileObjects((prevFiles) => [...prevFiles, {formData}]);
        }
    };
    // const todayIndex = reversedGroupedMessages.findIndex(group => moment(group.title, 'MMMM D').isSame(moment(), 'day'));
    // const todayGroup = reversedGroupedMessages[todayIndex];
    // const todayItemIndex = todayGroup ? todayGroup.data.length - 1 : 0; 
    // const scrollToEnd = () => {
    //     // console.log(sectionListRef.current.scrollToLocation());
    //     sectionListRef.current.scrollToLocation({
    //         sectionIndex: sectionIndex, // Индекс секции, к которой вы хотите прокрутиться
    //         itemIndex: itemIndex, // Это 0, так как вы хотите прокрутиться к началу секции
    //         viewPosition: 0, // 0, чтобы заголовок секции был в верхней части списка
    //         animated: true, // Позволяет сделать прокрутку анимированной
    //       });
    // };
    const handleSendMessage = () => {
        if (inputValue.input.trim() !== '') {
            const msg = 'msg';
            const to = 'to';
            const reply = 'reply';
            // const files = 'files';
            const formData = new FormData();
            formData.append(msg, inputValue.input);
            formData.append(to, state.chatId);
            formData.append(reply, '');
            // formData.append(files, audioPath || selectedImage);
            const formParts = formData._parts.map((part) => [part[0], part[1]]);
            const msgValue = formParts.find((part) => part[0] === msg)[1];
            const toValue = formParts.find((part) => part[0] === to)[1];
            const replyValue = formParts.find((part) => part[0] === reply)[1];
            // const filesValue = formParts.find((part) => part[0] === files)[1];

            //   console.log({...formData});
            //   if (inputValue.audioFiles && inputValue.audioFiles.length > 0) {
            //     formData.append('files', inputValue.audioFiles[0]);
            //   }

            //   if (inputValue.imageFiles && inputValue.imageFiles.length > 0) {
            //     formData.append('files.file', inputValue.imageFiles[0]);
            //     formData.append('text', inputValue.input);
            //   }

            AxiosInstance.post('dialog/sendMessage', { msg: msgValue, to: toValue, reply: replyValue.length === 0 ? null : replyValue, files: selectedImage })
                .then((res) => {
                    if (res.status === 200) {
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
        } else if(selectedImage) {
            const msg = 'msg';
            const to = 'to';
            const reply = 'reply';
            // const files = 'files';
            const formData = new FormData();
            formData.append(msg, inputValue.input);
            formData.append(to, state.chatId);
            formData.append(reply, '');
            // formData.append(files, audioPath || selectedImage);
            const formParts = formData._parts.map((part) => [part[0], part[1]]);
            const msgValue = formParts.find((part) => part[0] === msg)[1];
            const toValue = formParts.find((part) => part[0] === to)[1];
            const replyValue = formParts.find((part) => part[0] === reply)[1];
            // const filesValue = formParts.find((part) => part[0] === files)[1];

            //   console.log({...formData});
            //   if (inputValue.audioFiles && inputValue.audioFiles.length > 0) {
            //     formData.append('files', inputValue.audioFiles[0]);
            //   }

            //   if (inputValue.imageFiles && inputValue.imageFiles.length > 0) {
            //     formData.append('files.file', inputValue.imageFiles[0]);
            //     formData.append('text', inputValue.input);
            //   }

            AxiosInstance.post('dialog/sendMessage', { msg: msgValue, to: toValue, reply: replyValue.length === 0 ? null : replyValue, files: selectedImage })
                .then((res) => {
                    if (res.status === 200) {
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
        // console.log(selectedImage._parts[0][1].uri);
    };

    useEffect(() => {
        // setIsActiveKeyoard(isTap)
        dispatch(isActive(isTap))
    }, [isTap])

    useEffect(() => {
        AxiosInstance.get('/dialog/chat', { params: { id: chatId } }).then(res => {
            if (res.status === 200) {
                dispatch(updateData({ chat: res.data, chatId: chatId }))
            }
        })
    }, [])

    const pressable = (item) => {
        dispatch(openedChatCheck(true))
        navigation.navigate("ContextMenu")
        dispatch(setConfig({ contextConfig: "CurrentChat", isVisibleMenu: true, touchMessage: item }))
    }

    const handleEmptyAreaPress = () => {
        if (isTap) {
            setIsTap(false);
            dispatch(isActive(false))
            Keyboard.dismiss();
        }
    }

    const startAudioRecording = async () => {
        try {
            const path = await startRecording();
            setIsRecording(true);
            // setAudioPath(path);
        } catch {
            // console.error('Ошибка при начале записи:', error);
            stopAudioRecording()
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

    const AudioPlayer = ({ audioUri }) => {
        const [sound, setSound] = useState(null);
        const [isActivePlay, setIsActivePlay] = useState(false);
      
        const playSound = async () => {
          if (!sound) {
            const { sound: audioSound } = await Audio.Sound.createAsync(
              { uri: audioUri }
            );
            setSound(audioSound);
          }
      
          if (!isActivePlay) {
            setIsActivePlay(true);
            await sound.playAsync(); // Воспроизведение аудио
          } else {
            setIsActivePlay(false);
            await sound.stopAsync(); // Остановка аудио
          }
        };
    }

    const stopAudio = () => {
        setIsActivePlay(false);
    }

    const onClickPlay = () => {
        setIsActivePlay(!isActivePlay);
    }

    const onClickDelete = () => {
        setAudioPath();
    }
    const onClickSearch = () => {
        dispatch(isActiveSearch(true))
    }

    const cancelSearch = () => {
        dispatch(isActiveSearch(false))
        setSearchResults([])
        setHighlightMessages(false)
        setSearchText('')
    }
    const watchImg = (item) => {
        dispatch(setUriImage(item))
        navigation.navigate("Image")
    }
    return (
        <SafeAreaView style={[styles.container, Platform.OS === 'android' && {paddingTop: 40}]}>
            <StatusBar
                translucent
                barStyle={Platform.OS === 'ios' ? 'dark-content' : null}
            />
            <TouchableWithoutFeedback style={styles.index} onPress={handleEmptyAreaPress}>
                <View style={styles.messangerWrapper}>
                    <View style={styles.groupInfo}>
                        {isActiveSearchBar ? (
                            <View style={styles.searhBarContainer}>
                                <View style={styles.searhBar}>
                                    <TextInput
                                        style={styles.searchInput}
                                        onChangeText={(text) => {
                                            setSearchText(text)
                                            const results = groupedMessages.flatMap((group) =>
                                                group.data.filter((message) =>
                                                    message.msg.toLowerCase().includes(text.toLowerCase())
                                                )
                                            );

                                            setSearchResults(results);
                                            setHighlightMessages(!!text)
                                        }}
                                        value={searchText}
                                        placeholder="Поиск"
                                    />
                                    <View style={{ gap: 15, flexDirection: 'row', alignItems: 'center' }}>
                                        <TouchableOpacity style={styles.cancelBtn} onPress={() => cancelSearch()}>
                                            <Text>Отмена</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                                {searchResults.length === 0 && <Text style={{ marginTop: 5, fontWeight: '500' }}>Сообщений нет</Text>}
                            </View>
                        ) : (
                            <>
                                <View style={styles.wrapp}>
                                    <TouchableOpacity onPress={() => navigation.goBack()}>
                                        <Image source={BackLeft} />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.personInfo} onPress={() => navigation.navigate("GroupProfile")}>
                                        <View>
                                            <Image style={styles.groupImg} src={state?.data?.user?.avatar} />
                                        </View>
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
                                    </TouchableOpacity>
                                </View>
                                <View style={styles.moreFunc}>
                                    <TouchableOpacity onPress={() => onClickSearch()}>
                                        <Image style={styles.backImg} source={SearchIMG} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image style={styles.backImg} source={Phone} />
                                    </TouchableOpacity>
                                    <TouchableOpacity>
                                        <Image source={More} />
                                    </TouchableOpacity>
                                </View>
                            </>
                        )}
                    </View>
                    <TouchableWithoutFeedback style={styles.index} onPress={handleEmptyAreaPress}>
                        <SectionList
                            sections={reversedGroupedMessages}
                            style={styles.flatList}
                            ref={sectionListRef}
                            keyExtractor={(item, index) => item + index}
                            renderItem={({ item }) => (
                                <View style={item?.from?._id === authData?.user?._id ? styles.myMessage : styles.message}>
                                    <TouchableOpacity
                                        style={[
                                            item?.from?._id === authData?.user?._id
                                                ? { padding: 10, backgroundColor: '#fbceb1', borderRadius: 10, maxWidth: 300 }
                                                : { padding: 10, backgroundColor: '#fff', borderRadius: 10, maxWidth: 300 },
                                            highlightMessages && item.msg.toLowerCase().includes(searchText.toLowerCase())
                                                ? { backgroundColor: '#FFD866' }
                                                : null,
                                        ]}
                                        onLongPress={() => pressable(item)}
                                    >
                                        {state.data.isGroup === true ? (
                                            <Text
                                                style={styles.name}
                                                numberOfLines={1}
                                                ellipsizeMode="tail"
                                            >
                                                {item.from.name}{" "}{item.from.sname}
                                            </Text>

                                        ) : (
                                            null
                                        )}
                                        <View style={styles.msgWrapper}>
                                            {item?.reply && (
                                                <View style={[styles.replyWrapper, item?.reply?.from === authData?.user?._id ? { backgroundColor: '#FBCEB1' } : { backgroundColor: 'white' }]}>
                                                    <View style={styles.bar}>
                                                        <Text style={styles.replyMsg}>{item?.reply.msg}</Text>
                                                    </View>
                                                </View>
                                            )}
                                            <View style={{ flexDirection: 'column' }}>
                                                <AutoLink
                                                    text={item.msg}
                                                    linkStyle={{ color: '#007AFF' }}
                                                    onPress={(url) => {
                                                        Linking.openURL(url);
                                                    }}
                                                />
                                                {item.audio !== null && (
                                                    <TouchableOpacity onPress={() => playSound(item.audio)}>
                                                        {/* {console.log(item.audio)} */}
                                                        {/* <Image source={isActivePlay ? Pause : Play} />  */}
                                                    </TouchableOpacity>
                                                )}
                                                {item.attachments.length !== 0 && (
                                                    item.attachments.map(items => (
                                                        // console.log(items.url)
                                                        <TouchableOpacity key={items._id} onPress={() => watchImg(items)}>
                                                            <Image style={{ width: 100, height: 100 }} source={{ uri: items.url }} />
                                                        </TouchableOpacity>
                                                    ))
                                                )}
                                                <View style={{ justifyContent: 'flex-end', flexDirection: 'row', alignItems: 'center', gap: 5 }}>
                                                    <Text style={{ fontSize: 13 }}>{messageTimes[item._id]}</Text>

                                                    {item?.from?._id === authData?.user?._id && (
                                                        <Image style={{ width: 17, height: 17 }} source={item?.readed?.length > 0 ? isRead : notRead} />
                                                    )}
                                                </View>
                                            </View>
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            )}
                            renderSectionHeader={({ section: { title } }) => {
                                const currentDate = moment();
                                const sectionDate = moment(title, 'MMMM D');

                                if (currentDate.isSame(sectionDate, 'day')) {
                                    return (
                                        <BlurView intensity={20}>
                                            <View style={styles.dataSelector}>
                                                <Text style={styles.textData}>Сегодня</Text>
                                            </View>
                                        </BlurView>
                                    );
                                }

                                if (currentDate.isSame(sectionDate.clone().add(1, 'day'), 'day')) {
                                    return (
                                        <BlurView intensity={20}>
                                            <View style={styles.dataSelector}>
                                                <Text style={styles.textData}>Вчера</Text>
                                            </View>
                                        </BlurView>
                                    );
                                }

                                return (
                                    <BlurView intensity={20}>
                                        <View style={styles.dataSelector}>
                                            <Text style={styles.textData}>{title}</Text>
                                        </View>
                                    </BlurView>
                                );
                            }}
                        />
                    </TouchableWithoutFeedback>
                </View>
            </TouchableWithoutFeedback>

            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={isTap === true ? styles.mover : null}
            >
                <View style={styles.chatContainer}>
                    <>
                        <>
                            {selectedImage?._parts[0][1]?.uri && (
                                <View style={styles.setImageWrapper}>
                                    <Image style={styles.setImage} src={selectedImage?._parts[0][1]?.uri} />
                                    <TouchableOpacity style={styles.close} onPress={() => setSelectedImage(null)}>
                                        <Image source={Close} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                        <>
                            {cameraState && (
                                <View style={styles.setImageWrapper}>
                                    <Image style={styles.setImage} src={cameraState} />
                                    <TouchableOpacity style={styles.close} onPress={() => dispatch(setCameraImg(''))}>
                                        <Image source={Close} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </>
                    </>
                    <View style={styles.wrapper}>
                        <View style={[styles.chatFooter, inputValue?.input?.length > 15 && { height: 60 }]}>
                            <View style={[styles.inputWrapper, inputValue?.input?.length > 15 && { height: 60 }]}>
                                {audioPath?.length > 0 ? (
                                    null
                                ) : (
                                    <View style={styles.emojiWrapper}>
                                        <TouchableOpacity onPress={() => setClickEmoji(!clickEmoji)}>
                                            <Image style={styles.inputImg} source={Smile} />
                                        </TouchableOpacity>
                                        {clickEmoji && (
                                            <View style={styles.emojiSelector}>
                                                <EmojiSelector
                                                    onEmojiSelected={emoji => setSelectEmoji(emoji)}
                                                    showSearchBar={false}
                                                    showTabs={false}
                                                    showSectionTitles={false}
                                                />
                                            </View>
                                        )}
                                    </View>
                                )}
                                {audioPath !== undefined ? (
                                    <View style={styles.audioContainer}>
                                        <TouchableOpacity onPress={() => onClickPlay()}>
                                            <Image style={styles.play} source={isActivePlay ? Pause : Play} />
                                        </TouchableOpacity>
                                        {isActivePlay ? <Timer /> : null}
                                    </View>
                                ) : (
                                    <TextInput
                                        onPressIn={() => setIsTap(true)}
                                        onChangeText={(text) => handleInputChange('input', text)}
                                        value={inputValue.input}
                                        multiline={true}
                                        numberOfLines={4}
                                        returnKeyType="send"
                                        placeholder="Сообщение"
                                        style={[styles.input, inputValue?.input?.length > 15 && { fontSize: 14 }]}
                                    />
                                )}
                            </View>
                            {audioPath?.length > 0 ? (
                                <TouchableOpacity onPress={() => onClickDelete()}>
                                    <Image style={styles.inputImage} source={TrashCan} />
                                </TouchableOpacity>
                            ) : (
                                <View style={styles.imgWrapper}>
                                    <TouchableOpacity onPress={() => openImagePicker()} disabled={true}>
                                        <Image style={styles.inputImage} source={Kind} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate("Camera")} disabled={true}>
                                        <Image style={styles.inputImage} source={CameraImg} />
                                    </TouchableOpacity>
                                </View>
                            )}
                        </View>
                        <>
                            {inputValue?.input?.length || selectedImage || audioPath > 0 ? (
                                <TouchableOpacity style={styles.mic} onPress={() => handleSendMessage()}>
                                    <Image style={styles.inputImage} source={Send} />
                                </TouchableOpacity>
                            ) : (
                                <TouchableOpacity style={isRecording ? styles.micActive : styles.mic} onPress={isRecording ? stopAudioRecording : startAudioRecording} disabled={true}>
                                    {isRecording ? (
                                        <View style={styles.timer}>
                                            <Timer />
                                        </View>
                                    ) : (
                                        null
                                    )}
                                    <Image style={styles.inputImage} source={Mic} />
                                </TouchableOpacity>
                            )}
                        </>

                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // width: '100%',
        // height: 200,
        backgroundColor: '#DEDEDE',
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    audioContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 15,
    },
    cancelBtn: {
        backgroundColor: '#DEDEDE',
        width: 70,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5
    },
    searhBarContainer: {
        flex: 1,
        flexDirection: 'column'
    },
    searhBar: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'white',
        borderRadius: 5,
        padding: 5,
        width: '100%'
    },
    messangerWrapper: {
        flex: 1,
        flexDirection: 'column',
    },
    timeWrapper: {
        alignItems: 'flex-end'
    },
    emojiWrapper: {
        position: 'relative',
    },
    emojiSelector: {
        padding: 5,
        position: 'absolute',
        borderRadius: 10,
        borderColor: '#000',
        borderWidth: 2,
        backgroundColor: '#F0F0F0',
        top: -370,
        left: 0,
        height: 350,
        // maxHeight: 600,
        width: 250,
    },
    flatListContainer: {
        flex: 1,
    },
    dataSelector: {
        width: "100%",
        alignItems: 'center',
        padding: 5,
        marginBottom: 5,
    },
    textData: {
        fontSize: 15,
        fontWeight: '500',
    },
    wrapp: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    index: {
        zIndex: 1,
    },
    play: {
        width: 28,
        height: 28,
        padding: 15,
        backgroundColor: '#f0f0f0',
        borderRadius: 50,
    },
    mover: {
        // flex: 1,
        // marginBottom: 60,
    },
    setImage: {
        width: 100,
        height: 100,
        borderColor: 'black',
        borderWidth: 2,
        position: 'relative',
    },
    close: {
        // width: 40,
        // height: 40,
        borderRadius: 50,
        backgroundColor: '#000',
        position: 'absolute',
        top: 38,
        left: 35,
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
        flexDirection: 'row',
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    chatContainer: {
        // flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        // marginTop: 20,
        padding: 10,
    },
    setImageWrapper: {
        marginBottom: 10,
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
    timer: {
        position: 'absolute',
        top: -30,
        right: -10,
        padding: 5,
        borderRadius: 10,
        width: 60,
        backgroundColor: '#e04b5a',
        alignItems: 'center'
        // flexDirection: 'row',
    },
    micActive: {
        width: 40,
        height: 40,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: '#e04b5a',
        position: 'relative'
    },
    chatFooter: {
        // flex: 1,
        width: '85%',
        // minHeight: 50,
        backgroundColor: '#fff',
        // backgroundColor: 'red',
        height: 50,
        borderRadius: 50,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,

    },
    wrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 10,
        paddingRight: 10,
        gap: 20,
    },
    inputWrapper: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
    },
    searchInput: {
        flex: 1,
        fontSize: 14,
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
        padding: 10,
    },
    myMessage: {
        gap: 10,
        flexDirection: 'row-reverse',
        marginLeft: 'auto',
        marginBottom: 5,
    },
    message: {
        gap: 10,
        flexDirection: 'row',
        marginRight: 'auto',
        marginBottom: 5,
    },
})