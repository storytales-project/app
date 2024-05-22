import React, { useCallback, useState } from "react";
import { Alert } from "react-native";
import WebView from "react-native-webview";
import { payment } from "./event";
import { useFocusEffect } from "@react-navigation/native";

const Payment = ({ navigation, route }) => {
  const [paymentUrl, setPaymentUrl] = useState("");
  const [token, setToken] = useState("");
  const {url} = route.params
  const handlePayment = useCallback(async () => {
    try {
      const response = await payment();
      setPaymentUrl(response.redirect_url);
      setToken(response.token);
    } catch (error) {
      Alert.alert("Error", error.message);
    }
  }, []);

  const handlingPayment = (navState) => {
    if (navState.url.includes("settlement")) {
      Alert.alert("Payment Success", "Your payment was successful.");
      navigation.navigate("Home");
    }
  };

  useFocusEffect(
    useCallback(() => {
      handlePayment();
    }, [handlePayment])
  );

  return (
    <>
      {url && (
        <WebView
          javaScriptEnabled={true}
          javaScriptCanOpenWindowsAutomatically={true}
          domStorageEnabled={true}
          cacheEnabled={true}
          allowFileAccessFromFileURLs={true}
          allowFileAccess={true}
          source={{ uri: url }}
          cacheMode="LOAD_NO_CACHE"
          onNavigationStateChange={handlingPayment}
        />
      )}
    </>
  );
};

export default Payment;
