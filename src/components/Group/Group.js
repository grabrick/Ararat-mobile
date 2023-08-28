import { View, StyleSheet, SafeAreaView, Keyboard } from "react-native"
import { AllChat } from "./AllChat/AllChat"
import { Search } from "../UI/Search/Search";
import * as SecureStore from 'expo-secure-store';
import { useEffect, useState } from "react";
import { CurrentChat } from "./CurrentChat/CurrentChat";
import { AllAudioChat } from "./AllAudioChat/AllAudioChat";
import { Archive } from "./Archive/Archive";
import { useSelector } from "react-redux";


export const Group = ({ 
        authData, 
        setContextMenuVisible, 
        setTouchMessage, 
        setContextConfig,
    }) => {
    const [isActiveChat, setIsActiveChat] = useState()
    const [chatID, setChatID] = useState(null)
    const [isActiveArchive, setIsActiveArchive] = useState(false)
    const [isActiveKeyboard, setIsActiveKeyoard] = useState()
    const [categoryActive, setCategoryActive] = useState("Чат")
    const state = useSelector(state => state.contextMenuSlice)

    useEffect(() => {
        if(state.openedChat === true) {
            setIsActiveChat(true)
        } 
    }, [])

    // useEffect(() => {
    //     console.log(Keyboard.isVisible());
    // }, [Keyboard.isVisible()])
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.wrapper}>
                {isActiveKeyboard ? null : <Search categoryActive={categoryActive} setCategoryActive={setCategoryActive} />}
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
                                        setContextConfig={setContextConfig}
                                        setIsActiveKeyoard={setIsActiveKeyoard}
                                    />
                                ) : (
                                    <AllChat
                                        setIsActiveArchive={setIsActiveArchive}
                                        setIsActiveChat={setIsActiveChat}
                                        setContextMenuVisible={setContextMenuVisible}
                                        setTouchMessage={setTouchMessage}
                                        setChatID={setChatID}
                                        authData={authData}
                                        setContextConfig={setContextConfig}
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