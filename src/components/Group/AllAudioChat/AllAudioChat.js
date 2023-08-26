import {
    View,
    Text,
    FlatList,
    Image,
    TouchableOpacity,
    SafeAreaView,
    StyleSheet,
} from "react-native";
import RedArrow from '../../../../assets/images/redArrow.png'
import Phone from '../../../../assets/images/phone.png'
import data from '../../Extra/Catalog.json'

export const AllAudioChat = () => {
    return (
        <SafeAreaView style={styles.container}>
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
        shadowOffset: { width: 1, height: 1 },
        shadowOpacity: 0.4,
        shadowRadius: 3,
        elevation: 5,
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
    }
})