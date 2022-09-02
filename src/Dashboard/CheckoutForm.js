import React, { useState, useEffect } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

// source of this code is :  https://github.com/stripe/react-stripe-js/blob/master/examples/hooks/0-Card-Minimal.js

const CheckoutForm = ({ booking }) => {
  const stripe = useStripe();
  const elements = useElements();

  const [cardError, setCardError] = useState("");
  const [success, setSuccess] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const [processing, setProcessing] = useState(false);

  //Link source of bellow code: https://stripe.com/docs/payments/quickstart?platform=web&client=react&lang=node

  const [clientSecret, setClientSecret] = useState("");
  const { _id, price, patientName, patientEmail } = booking;
  useEffect(() => {
    fetch("https://floating-earth-43239.herokuapp.com/create-payment-intent", {
      method: "POST",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
      body: JSON.stringify({ price }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) {
          //console.log(data)
          setClientSecret(data.clientSecret);
        }
      });
  }, [price]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error.message);
      setSuccess("");
      setProcessing(true);
    }

    // Link source of code confirm card payment: https://stripe.com/docs/js/payment_intents/confirm_card_payment

    const { paymentIntent, error: intentError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: patientName,
            email: patientEmail,
          },
        },
      });
    if (intentError) {
      setCardError(intentError?.message);
    } else {
      setCardError(" ");
      setTransactionId(paymentIntent.id);
      setSuccess("congrats Your Payment completed");

      //store payment on database
      const payment = {
        appointment: _id,
        transactionId: paymentIntent.id,
      };
      fetch(`https://floating-earth-43239.herokuapp.com/paymentDone/${_id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        body: JSON.stringify(payment),
      })
        .then((res) => res.json())
        .then((data) => {
          setProcessing(false);
          console.log(data);
        });
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
        />
        <button
          className="btn btn-info btn-sm mt-4"
          type="submit"
          disabled={!stripe || !clientSecret}
        >
          Pay
        </button>
      </form>
      {cardError && <p className="text-red-500">{cardError}</p>}
      {success && (
        <div className="text-info">
          <p>{success}</p>
          <p>
            TransactionId:::
            <span className="text-info font-bold">{transactionId}</span>{" "}
          </p>
        </div>
      )}
    </>
  );
};

export default CheckoutForm;
