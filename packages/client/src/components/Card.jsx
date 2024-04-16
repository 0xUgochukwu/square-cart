/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";

const CardForm = ({ callback }) => {
    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <PaymentForm
            applicationId="sandbox-sq0idb-V840f89hCXiXpg7CId4_sQ"
            cardTokenizeResponseReceived={callback}
            locationId="LS9219ZYC46XG"
            createVerificationDetails={() => ({
                billingContact: {
                    addressLines: [user.billingAddress || ""],
                    familyName: user.name,
                    // givenName: "",
                    // countryCode: "",
                    // city: "",
                },
                intent: "STORE",
            })}
        >
            <CreditCard>Add Card</CreditCard>
        </PaymentForm>
    );
};

export default CardForm;
