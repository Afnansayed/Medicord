import { loadStripe } from "@stripe/stripe-js";
import DynamicTittle from "../../../Sheared/DynamicTittle/DynamicTittle";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { useLoaderData } from "react-router-dom";

const stripePromise = loadStripe(import.meta.env.VITE_PAYMENT_KEY);
const Payment = () => {
    const forPrice = useLoaderData();
    console.log(forPrice.data)
    return (
        <div>
              <DynamicTittle heading='Payment' subHeading={'Make clare your payment and join with us our novel journey'}></DynamicTittle>
            <div>
                <Elements stripe={stripePromise}>
                     <CheckoutForm campPrice={forPrice?.data}></CheckoutForm>
                </Elements>
            </div>
        </div>
    );
};

export default Payment;