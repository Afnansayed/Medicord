import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useContext, useEffect, useState } from "react";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import { AuthContext } from "../../../Providers/AuthProvider";
import  PropTypes from 'prop-types'
import Swal from "sweetalert2";

const CheckoutForm = ({campPrice}) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const [secret, setSecret] = useState('');
    const axiosSecure = UseAxiosSecure();
    const {user} = useContext(AuthContext);
    
    const totalPrice = campPrice?.campFees;
    //console.log(totalPrice)
    useEffect(() => {
        axiosSecure.post('/create-payment-intent', {price: totalPrice})
        .then(res => {
           // console.log(res.data.clientSecret)
            setSecret(res.data.clientSecret);
        })
    },[totalPrice,axiosSecure])

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }


        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card',
            card,
        })

        if(error){
             console.log('Error payment ' , error);
             setError(error.message);
        }else{
            console.log('Payment method', paymentMethod);
            setError('')
        }

        //confirm payment
        const {paymentIntent , error: confirmError} = await stripe.confirmCardPayment(secret , {
            payment_method: {
                card: card,
                billing_details: {
                    email: user?.email || 'anonymous',
                    name: user?.displayName || 'anonymous'
                }
            }
        })
        if(confirmError){
            console.log('Error from confirm intent',confirmError);
        }else{
            //console.log('From payment intent',paymentIntent);
            if(paymentIntent.status === 'succeeded'){
                //console.log( 'Go for send data in data base')
                axiosSecure.patch(`/participantCamps/${campPrice?._id}`,{paymentStatus: 'Paid'})
                .then(res => {
                    if(res.data.modifiedCount > 0){
                        const paymentInfo = {
                            name: user?.displayName,
                            email: user?.email,
                            campName: campPrice?.campName,
                            campFees: totalPrice,
                            trancejectionId: paymentIntent?.id
                        }
                        //post payment information in database
                        axiosSecure.post('/histories',paymentInfo)
                        .then(res => {
                            //console.log(res.data)
                            if(res.data.insertedId){
                                Swal.fire(`Payment successful with id: ${paymentIntent?.id}`); 
                            }
                        })
                    }
                })
                
            }
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button type="submit" className="btn btn-sm bg-[#181ca3] mt-6 text-[#ffff]" disabled={!stripe || !secret}>
                Pay
            </button>
            <p className="text-red-600">{error}</p>
        </form>
    );
};
CheckoutForm.propTypes={
    campPrice:PropTypes.object
}
export default CheckoutForm;