import React from "react";
import { View, Text, TouchableOpacity, TextInput } from "react-native";

export default function InputField({
  label,
  icon,
  inputType,
  fieldButtonLabel,
  fieldButtonFunction,
  value,
  setValue, 
}) {
  return (
    <View
      style={{
        flexDirection: "row",
        paddingBottom: 8,
        marginBottom: 25,
      }}
    >
      {icon}
      {inputType == "password" ? (
        <TextInput
          value={value}
          onChangeText={(e)=> setValue(e)}
          placeholder={label}
          style={{ flex: 1, paddingVertical: 0 }}
          secureTextEntry={true}
        />
      ) : (
        <TextInput
          value={value}
          onChangeText={(e)=>setValue(e)}
          placeholder={label}
          style={{ flex: 0, paddingVertical: 0 }}
        />
      )}
      <TouchableOpacity onPress={fieldButtonFunction}>
        <Text style={{ color: "#EBBAD2", fontWeight: "700" }}>
          {fieldButtonLabel}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
