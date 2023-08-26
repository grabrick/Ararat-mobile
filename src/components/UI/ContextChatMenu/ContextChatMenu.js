import { View, StyleSheet, TouchableOpacity, Text, TouchableWithoutFeedback } from "react-native"

export const ContextChatMenu = ({ contextMenuVisible, touchMessage, setTouchMessage, setContextMenuVisible }) => {
    // console.log(touchMessage);

    const handleOverlayPress = () => {
        console.log('222');
        setContextMenuVisible(false);
        // if (contextMenuVisible) {
        //   // Скрыть контекстное меню, если оно видимо

        // }
    };

    const handleMenuItemPress = (trigger) => {
        // console.log(trigger);
        switch (trigger) {
            case "Ответить":
                return (
                    console.log("1")
                )
            case "Отреагировать":
                return (
                    console.log("2")
                )
            case "Переслать сообщение":
                return (
                    console.log("3")
                )
            default:
                null               
        }
    }
    return (
        <TouchableWithoutFeedback onPress={() => handleOverlayPress()}>
            <View style={styles.container}>
                <View style={styles.touchWrapper}>
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                    <View style={styles.touchMsg}>
                        <Text style={styles.title}>{touchMessage?.from.name}{" "}{touchMessage?.from.sname}</Text>
                        <Text>{touchMessage?.msg}</Text>
                    </View>
                    </TouchableWithoutFeedback>
                </View>
                {contextMenuVisible && (
                    <TouchableWithoutFeedback onPress={(e) => e.stopPropagation()}>
                        <View style={styles.contextMenu}>
                            <TouchableOpacity onPress={() => handleMenuItemPress('Ответить')}>
                                <Text>Ответить</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleMenuItemPress('Отреагировать')}>
                                <Text>Отреагировать</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={() => handleMenuItemPress('Переслать сообщение')}>
                                <Text>Переслать сообщение</Text>
                            </TouchableOpacity>
                        </View>
                    </TouchableWithoutFeedback>
                )}
            </View>
        </TouchableWithoutFeedback>
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
        maxWidth: 200,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        elevation: 5,
    },
    title: {
        fontSize: 17,
        marginBottom: 10,
    },
    touchMsg: {
        padding: 10,
        borderRadius: 10,
        // width: 100,
        // height: 100,
        backgroundColor: '#fff'
    },
});