import {
    View,
    Text,
    StyleSheet,
    Image,
    SafeAreaView,
    FlatList,
    TouchableOpacity
} from "react-native";
import Archive from '../../../../assets/images/archive_folder.png'
import { useEffect, useState } from "react";
import AxiosInstance from '../../Extra/Axios/AxiosInstance'
import { Labels } from "../../UI/Labels/Labels";
// import Data from '../../Extra/Catalog.json'
// import NotFound from '../../../../assets/images/Profile.png'

export const AllChat = ({ authData, setIsActiveChat, setChatID, setIsActiveArchive }) => {
    const [data, setData] = useState(null)

    useEffect(() => {
        const params = { id: authData?.user._id }
        const config = {
            headers: {
                Authorization: authData?.refreshToken
            }
        };
        AxiosInstance.get(`/dialog/getDialogs`, { params }, config)
            .then(res => {
                setData(res.data.chats);
            }).catch(e => {
                console.log(e);
            })
    }, [])

    const moveToChat = (chatId) => {
        setIsActiveChat(true)
        setChatID(chatId)
    }
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity onPress={() => setIsActiveArchive(true)} style={styles.TouchableOpacity} >
                <View style={styles.archive}>
                    <Image style={styles.archiveImg} source={Archive} />
                    <Text style={styles.text}>Архив</Text>
                </View>
            </TouchableOpacity>
            {data?.length > 0 ? (
                <FlatList 
                data={data}
                style={styles.flatList}
                keyExtractor={(item) => item._id}
                renderItem={({ item }) => (
                    <TouchableOpacity onPress={() => moveToChat(item._id)} style={styles.chat}>
                        <Image
                            style={styles.chatImage}
                            src={item.avatar}
                        />
                        <View>
                            <Text>{item.name}</Text>
                            <Text style={styles.lastmsg} numberOfLines={1} ellipsizeMode="tail" >{item.lastmsg.msg}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />
            ) : (
                <View style={styles.warningWrapper}>
                    <Text style={styles.warningMsg}>У вас нет активных чатов.</Text>
                </View>
            )

            }
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
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
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
    chat: {
        width: '100%',
        paddingLeft: 20,
        borderTopColor: '#fff',
        borderBottomColor: '#fff',
        borderBottomWidth: 1,
        borderTopWidth: 1,
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
        paddingTop: 10,
        paddingBottom: 10,
        flexDirection: 'row',
        gap: 30,
    },
    text: {
        color: '#000',
        fontSize: 17,
        fontWeight: 600,

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