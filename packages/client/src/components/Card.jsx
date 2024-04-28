/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import * as React from "react";
import { CreditCard, PaymentForm } from "react-square-web-payments-sdk";
import platformTheme from "../configs/theme";
import { useParams } from "react-router-dom";
import { applicationId, locationId } from "../env";

const CardForm = ({ callback }) => {
    const params = useParams();

    const user = JSON.parse(localStorage.getItem("user"));

    return (
        <PaymentForm
            applicationId={applicationId}
            cardTokenizeResponseReceived={callback}
            locationId={locationId}
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
            <CreditCard
                buttonProps={{
                    css: {
                        "[data-theme='dark'] &": {
                            backgroundColor: platformTheme[params.type],
                            color: "var(--ifm-color-emphasis-100)",
                            "&:hover": {
                                backgroundColor: platformTheme[params.type],
                            },
                        },
                        backgroundColor: platformTheme[params.type],
                        fontSize: "14px",
                        color: "#fff",
                        "&:hover": {
                            backgroundColor: platformTheme[params.type],
                        },
                    },
                }}
            >
                Add Card
            </CreditCard>
        </PaymentForm>
    );
};

export default CardForm;
