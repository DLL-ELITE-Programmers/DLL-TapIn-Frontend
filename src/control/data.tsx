/*
 * INFO: This file handles the local data of each user,
 * meaning to say, it can be access even the device is offline.
 * This is the one way to gather information if ever that the user
 * offline and taking attendance.
 *
 * Author: Ryann Kim Sesgundo [08-08-25]
 */
import AsyncStorage from "@react-native-async-storage/async-storage";

export async function GetItem(key: string) {
  const data = await AsyncStorage.getItem(key);
  return JSON.parse(data ?? "{'error': 'No Data here'}");
}

export async function SetItem(key: string, data: Object) {
  await AsyncStorage.setItem(key, JSON.stringify(data, null, 2));
}

export async function Remove(key: string) {
  await AsyncStorage.removeItem(key);
}
