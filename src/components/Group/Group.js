import { View, StyleSheet, SafeAreaView } from "react-native"
import { AllChat } from "./AllChat/AllChat"
import { Search } from "../UI/Search/Search";
import * as SecureStore from 'expo-secure-store';
import { useState } from "react";
import { CurrentChat } from "./CurrentChat/CurrentChat";
import { AllAudioChat } from "./AllAudioChat/AllAudioChat";
import { Archive } from "./Archive/Archive";


export const Group = ({ authData, setContextMenuVisible, setTouchMessage}) => {
    const [isActiveChat, setIsActiveChat] = useState(false)
    const [chatID, setChatID] = useState(null)
    const [isActiveArchive, setIsActiveArchive] = useState(false)
    const [categoryActive, setCategoryActive] = useState("Чат")
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                <Search categoryActive={categoryActive} setCategoryActive={setCategoryActive} />
                {isActiveArchive ? (
                    <Archive setIsActiveArchive={setIsActiveArchive} />
                ) : (
                    <>
                        {categoryActive === "Чат" ? (
                            <>
                                {isActiveChat ? (
                                    <CurrentChat
                                        authData={authData}
                                        chatID={chatID}
                                        setIsActiveChat={setIsActiveChat}
                                        setContextMenuVisible={setContextMenuVisible}
                                        setTouchMessage={setTouchMessage}
                                    />
                                ) : (
                                    <AllChat
                                        setIsActiveArchive={setIsActiveArchive}
                                        setIsActiveChat={setIsActiveChat}
                                        setChatID={setChatID}
                                        authData={authData}
                                    />
                                )}
                            </>
                        ) : (
                            <>
                                <AllAudioChat />
                            </>
                        )}
                    </>
                )}
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff'
    },

    wrapper: {
        flex: 1,
        paddingTop: 10,
        paddingLeft: 10,
        paddingRight: 10,
    },
});