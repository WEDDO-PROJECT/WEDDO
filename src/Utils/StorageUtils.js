
import { AsyncStorage } from 'react-native';
export default class StorageUtils {
  constructor() {}
  static async storeData(key: string, value: any) {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log("storing" + key + " with value " + value, error);
    }
  }

  static async retrieveData(key: string): Promise<any> {
    try {
      const value =0//= await AsyncStorage.getItem(key);
      if (value !== null) {
        return value;
      }
    } catch (error) {
      console.log(error);
    }
  }
  static async removeData(key: string): Promise<any> {
    try {
      await AsyncStorage.removeItem(key);
    } catch (error) {
      console.log(error);
    }
  }
}
