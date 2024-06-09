import { useContext, useState } from "react";
import { AuthContext } from "../../../Providers/AuthProvider";
import UseAxiosSecure from "../../../Hooks/UseAxiosSecure/UseAxiosSecure";
import Swal from "sweetalert2";


const Review = () => {
    const [rating, setRating] = useState(0);
    const {user} = useContext(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const userEmail = user?.email;
    const userName = user?.displayName;
    const userImage = user?.photoURL;
    const handleRatingClick = (value) => {
        setRating(value);
    };
   const handleReview = e => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const feedback = form.get('feedback');
    const feedbackData={feedback,rating,userEmail,userName,userImage};
     //console.log(feedbackData);
  //  send to server
     axiosSecure.post('/reviews',feedbackData)
     .then(res => {
       // console.log(res.data)
        if(res.data){
            Swal.fire("Thank for your valuable opinion");
        }
     })
   }
    return (
        <div className=' rounded-lg p-5'>
            <div className="flex flex-col mx-auto max-w-xl p-8 shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800 mt-5">
                <div className="flex flex-col items-center w-full">
                    <h2 className="text-3xl font-semibold text-center">Your opinion matters!</h2>
                    <div className="flex flex-col items-center py-6 space-y-3">
                        <span className="text-center">How was your experience?</span>
                        {/*  */}
                        <div className="flex space-x-3">
                            {[1, 2, 3, 4, 5].map((value) => (
                                <button
                                    key={value}
                                    type="button"
                                    // title={`Rate ${value} stars`}
                                    // aria-label={`Rate ${value} stars`}
                                    onClick={() => handleRatingClick(value)}
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill={value <= rating ? '#ffdd32' : 'currentColor'} className="w-10 h-10 dark:text-gray-400"> <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                                    </svg>
                                </button>
                            ))}
                        </div>
                    </div>
                   
                    <form onSubmit={handleReview } className="flex flex-col w-full">
                        <textarea name='feedback' rows="3" placeholder="Message..." className="p-4 rounded-md resize-none dark:text-gray-800 dark:bg-gray-50 border-2"></textarea>
                        <button type="submit" className="py-4 my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-[#181ca3]">Leave feedback</button>
                    </form>
                </div>
                <div className="flex items-center justify-center">
                    <a rel="noopener noreferrer" href="#" className="text-sm dark:text-gray-600">Maybe later</a>
                </div>
            </div>
        </div>
    );
};

export default Review;