import { Audio } from 'expo-av';

let audioRecording = null;

export const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== 'granted') {
        throw new Error('Нет разрешения на использование микрофона');
      }
      
      if (audioRecording) {
        await audioRecording.stopAndUnloadAsync();
        audioRecording = null;
      }
      
      audioRecording = new Audio.Recording();
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });


      await audioRecording.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await audioRecording.startAsync();
      return audioRecording.getURI();
    } catch (error) {
      throw error;
    }
};
  
  export const stopRecording = async () => {
    try {
      if (!audioRecording) {
        throw new Error('Запись не инициализирована');
      }
  
      await audioRecording.stopAndUnloadAsync();
      const audioPath = audioRecording.getURI();
      audioRecording = null;
      return audioPath;
    } catch (error) {
      throw error;
    }
};