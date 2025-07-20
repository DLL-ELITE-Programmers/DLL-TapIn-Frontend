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
