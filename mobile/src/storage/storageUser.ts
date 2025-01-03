import { UserDTO } from "@dtos/UserDTO";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { USER_STORAGE } from "./storageConfig";

export const storageUserSave = async (user: UserDTO) => {
  try {
    await AsyncStorage.setItem(USER_STORAGE, JSON.stringify(user));
  } catch (error) {
    throw error;
  }
};

export const storageUserGet = async (): Promise<UserDTO | undefined> => {
  try {
    const storageData = await AsyncStorage.getItem(USER_STORAGE);
    const user = storageData ? JSON.parse(storageData) : undefined;

    return user;
  } catch (error) {
    throw error;
  }
};

export const storageUserRemove = async () => {
  try {
    await AsyncStorage.removeItem(USER_STORAGE);
  } catch (error) {
    throw error;
  }
};
