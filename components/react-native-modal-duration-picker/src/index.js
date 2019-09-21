import { Platform } from "react-native";
import CustomDurationPickerAndroid from "./CustomDurationPickerAndroid";
import CustomDurationPickerIOS from "./CustomDurationPickerIOS";

const IS_ANDROID = Platform.OS === "android";

export default (IS_ANDROID ? CustomDurationPickerAndroid : CustomDurationPickerIOS);
