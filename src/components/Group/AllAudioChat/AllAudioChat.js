import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
    TextInput,
    Button,
} from "react-native";
import RedArrow from '../../../../assets/images/redArrow.png'
import Phone from '../../../../assets/images/phone.png'
import data from '../../Extra/Catalog.json'
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { findGroups } from "../../../redux/slices/groupSlice";
import { useState } from "react";

export const AllAudioChat = ({categoryActive, setCategoryActive}) => {
    const dispatch = useDispatch()
    const [searchText, setSearchText] = useState('');
    const handleSearchTextChange = (text) => {
        setSearchText(text);
        dispatch(findGroups(text));
    };
    return (
        <SafeAreaView style={styles.container}>
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
                            onChangeText={(Text) => handleSearchTextChange(Text)}
                            value={searchText}
                        />
                    </View>
                    <View style={styles.buttonWrapper}>
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
                        <LinearGradient
                            colors={categoryActive === "Звонки"
                                ? ['rgba(183, 151, 90, 0.85)', '#8A6E3E', '#E7C173', '#E7C173', '#8A6E3E']
                                : ['rgba(51, 51, 51, 0.85)', '#000', '#333', '#333', '#000']
                            }
                            locations={categoryActive === "Звонки" ? [0, 0.0771, 0.4937, 0.749, 1] : null}
                            start={[0, 1]}
                            end={[0, 0]}
                            style={styles.gradientButton}
                        >
                            <Button color={categoryActive === "Звонки" ? '#353535' : '#FFFFFF'} onPress={() => { setCategoryActive("Звонки"); dump() }} title="Звонки" style={styles.button}></Button>
                        </LinearGradient>
                    </View>
                </LinearGradient>
            </View>
            <View style={styles.wrapper}>
                <Text style={styles.title}>Недавние</Text>
                {data.length > 0 ? (
                    <FlatList
                    data={data}
                    style={styles.flatList}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <TouchableOpacity style={styles.chat}>
                            <View style={styles.chatWrapper}>
                                <Image style={styles.chatAvatar} />
                                <View style={styles.chatInfoWrapper}>
                                    <Text style={styles.chatTitle}>{item.title}</Text>
                                    <View style={styles.lastTimeWrapper}>
                                        <Image style={styles.chatArrow} source={RedArrow} />
                                        <Text style={styles.chatLastTime}>{item.lastTime}</Text>
                                    </View>
                                </View>
                            </View>
                            <Image style={styles.phone} source={Phone} />
                        </TouchableOpacity>
                    )}
                />
                ) : (
                    <View style={styles.warningWrapper}>
                        <Text style={styles.warningMsg}>У вас нет активных звонков.</Text>
                    </View>
                )

                }
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F0F0F0'
    },
    searchContainer: {
        width: '100%',
    },
    buttonWrapper: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    wrapper: {
        flex: 1,
    },
    chatWrapper: {
        flexDirection: 'row',
        gap: 20,
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
    chatInfoWrapper: {
        flexDirection: 'column',
        gap: 5,
        alignItems: 'flex-start',
    },
    chat: {
        padding: 10,
        paddingBottom: 20,
        marginBottom: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderBottomColor: '#fff',
        backgroundColor: 'transparent',
        borderBottomWidth: 2,
    },
    title: {
        fontSize: 17,
        paddingLeft: 15,
        paddingTop: 30,
        paddingBottom: 20,
    },
    chatAvatar: {
        borderColor: 'black',
        borderRadius: 50,
        borderWidth: 2,
        width: 40,
        height: 40,
    },
    lastTimeWrapper: {
        flexDirection: 'row'
    },
    chatArrow: {
        width: 15,
        height: 15,
    },
    phone: {
        width: 25,
        height: 25,
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
    }
})