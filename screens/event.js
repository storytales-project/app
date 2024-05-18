import { Alert } from "react-native";
import MidtransClient from "midtrans-client"





const payment = async() =>{
  let snap = new MidtransClient.Snap({
    isProduction: false,
    serverKey: "SB-Mid-server-WBSSQfYYyFMSlm8HPMnaJv0D", //clear
  });
  // Alert.alert("AAAAAAAAAAAAAAAAAAAAAAAAA")
    
      let OrderId = Math.random().toString();
      let amount = 200_000;
    
      let parameter = {
        transaction_details: {
          order_id: OrderId,
          gross_amount: amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: "tes",
          email: "tes@mail.com"
        },
      };
    
      const transaction = await snap.createTransaction(parameter);
      let transactionToken = transaction.token;
      return transaction
}


export {payment}

