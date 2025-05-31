import { View, Text, TextInput } from "react-native";
import React from "react";
import { Control, Controller, FieldErrors } from "react-hook-form";

type CheckoutFormType = {
  control: Control<
    {
      fullName: string;
      phoneNumber: string;
      country: string;
      stateCity: string;
      address: string;
    },
    any
  >;
  errors: FieldErrors<{
    fullName: string;
    phoneNumber: string;
    country: string;
    stateCity: string;
    address: string;
  }>;
};
const CheckoutForm = ({ control, errors }: CheckoutFormType) => {
  const textInputClassName =
    "dark:text-white text-black text-lg px-4 border-2 border-neutral-300 dark:border-neutral-700 rounded-2xl w-full ";
  return (
    <View className="items-center gap-3 p-6 bg-white dark:bg-black rounded-2xl ">
      <View className=" gap-2 w-full">
        <Text className="dark:text-white font-semibold">Full Name</Text>
        <Controller
          control={control}
          name="fullName"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="enter your full name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className={`${textInputClassName}`}
            />
          )}
        />
        {errors.fullName && (
          <View className="flex-row">
            <Text className="bg-red-400 px-2 rounded-2xl text-white">
              Full name is required
            </Text>
          </View>
        )}
      </View>
      <View className=" gap-2 w-full">
        <Text className="dark:text-white font-semibold">Phone Number</Text>
        <Controller
          control={control}
          name="phoneNumber"
          rules={{
            required: true,
            minLength: 8,
            maxLength: 10,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              keyboardType="phone-pad"
              placeholder="enter your phone number"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className={`${textInputClassName}`}
            />
          )}
        />
        {errors.phoneNumber && (
          <View className="flex-row">
            <Text className="bg-red-400 px-2 rounded-2xl text-white">
              Valid phone number is required
            </Text>
          </View>
        )}
      </View>
      <View className=" gap-2 w-full">
        <Text className="dark:text-white font-semibold">Country</Text>
        <Controller
          control={control}
          name="country"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="enter your country"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className={`${textInputClassName}`}
            />
          )}
        />
        {errors.country && (
          <View className="flex-row">
            <Text className="bg-red-400 px-2 rounded-2xl text-white">
              Country required
            </Text>
          </View>
        )}
      </View>
      <View className=" gap-2 w-full">
        <Text className="dark:text-white font-semibold">State/City</Text>
        <Controller
          control={control}
          name="stateCity"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="enter state/city"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className={`${textInputClassName}`}
            />
          )}
        />
        {errors.stateCity && (
          <View className="flex-row">
            <Text className="bg-red-400 px-2 rounded-2xl text-white">
              State/City is required
            </Text>
          </View>
        )}
      </View>
      <View className=" gap-2 w-full">
        <Text className="dark:text-white font-semibold">Address</Text>
        <Controller
          control={control}
          name="address"
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              placeholder="enter your address"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              className={`${textInputClassName}`}
            />
          )}
        />
        {errors.address && (
          <View className="flex-row">
            <Text className="bg-red-400 px-2 rounded-2xl text-white">
              Address is required
            </Text>
          </View>
        )}
      </View>
    </View>
  );
};

export default CheckoutForm;
