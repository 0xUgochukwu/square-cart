/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import CardForm from "../components/Card";
import { Spinner, SpinnerSmall } from "../components/Spinner";
import { Button } from "../components/Button";
import Cards from "react-credit-cards-2";
import "react-credit-cards-2/dist/es/styles-compiled.css";
import AddCardIcon from "@mui/icons-material/AddCard";
import useFetch from "../hooks/useFetch";
import get from "../utils/Get";
import appContext from "../contexts/context";
import Transaction from "../components/Transaction";

const Card = () => {
    const { toast } = useContext(appContext);

    const [card, setCard] = useState(null);
    const [cardForm, setCardForm] = useState(null);
    const [cardInfo, setCardInfo] = useFetch();

    const getCard = () => {
        setCardInfo(get.get("/customer/card"));
    };

    const padWithZero = (num) => {
        return num < 10 ? "0" + num : num;
    };

    useEffect(() => {
        getCard();
    }, []);

    useEffect(() => {
        console.log(cardInfo);

        if (cardInfo.success) {
            if (!cardInfo.success.data) {
                return setCard(false);
            }
            if (Object.keys(cardInfo.success.data).length === 0) {
                setCard(false);
            } else {
                setCard(cardInfo.success.data);
            }
        }
    }, [cardInfo]);

    return (
        <div>
            <div className="w-full h-[200px] #bg-[#fe2c55] rounded-br rounded-bl">
                {card == null ? (
                    <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite]">
                        <Spinner />
                        <h1 className="text-center text-[10px] text-[grey]">
                            Loading card...
                        </h1>
                    </div>
                ) : !card ? (
                    <div className="h-full w-full flex justify-center items-center flex-col bg-[ghostwhite] p-2">
                        {!cardForm ? (
                            <h1 className="text-center text-[10px] text-[grey]">
                                <Button
                                    className={
                                        "!bg-[#fe2c55] text-white !w-[150px]"
                                    }
                                    onClick={() => {
                                        const user = JSON.parse(
                                            localStorage.getItem("user")
                                        );
                                        if (!user.billingAddress) {
                                            return toast.error(
                                                "Add your billing address to continue!"
                                            );
                                        }
                                        setCardForm(true);
                                    }}
                                >
                                    <AddCardIcon /> Add Card
                                </Button>
                                <p className="text-[10px] m-5 text-[grey]">
                                    We will save your card for future payments!
                                </p>
                            </h1>
                        ) : (
                            <CardForm
                                callback={(data, buyer) => {
                                    // console.log({ data, buyer });

                                    const token = data.token;
                                    const card = data.details.card;
                                    const verify = buyer?.token;

                                    console.log({ token, card, buyer });

                                    get.post("/customer/card", {
                                        card,
                                        token,
                                        verify,
                                    })
                                        .then((res) => {
                                            getCard();
                                        })
                                        .catch((err) => {
                                            console.error(err);
                                            if (err.response) {
                                                toast.error(
                                                    err.response.data.message
                                                );
                                            }
                                        });
                                }}
                            />
                        )}
                    </div>
                ) : (
                    <div className="h-full w-full flex justify-center items-center flex-col bg-[grey] p-1">
                        <div className="w-[290px]" onClick={() => {
                            setCard(false);
                        }}>
                            <Cards
                                number={card.bin + "******" + card.last4}
                                expiry={
                                    padWithZero(card.expMonth) +
                                    "" +
                                    card.expYear
                                }
                                cvc={"***"}
                                name={card.cardholder_name}
                                preview={true}
                                // issuer={card.brand.toLowerCase()}
                            />
                        </div>
                    </div>
                )}
            </div>
            <div className="w-full h-[200px] bg-white">
                <div className="p-2 pb-0 [font-family:'montserrat'] h-[200px]">
                    <p className="text-[grey]">History</p>
                    <Transaction />
                </div>
            </div>
        </div>
    );
};

export default Card;
