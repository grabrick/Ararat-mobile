import * as SecureStore from 'expo-secure-store';


export const fetchAuthData = async () => {
    try {
      const serializedData = await SecureStore.getItemAsync('Auth');
      if (serializedData) {
        const data = JSON.parse(serializedData);
        return data
        // Теперь вы можете работать с данными
      } else {
        console.log('Данные не найдены в SecureStore');
      }
    } catch (error) {
      console.error('Произошла ошибка при получении данных из SecureStore:', error);
    }
}