import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { useEffect, useState } from "react";
import axios from "axios";

// Example data



const Banner = () => {
    const [success, setSuccess] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:5000/successStory')
            .then(res => {
                console.log(res.data)
                setSuccess(res.data);
            })
    }, [])
    return (
        <Carousel>

            {
                success.map(story => <div key={story._id} className="md:min-h-screen">
                    <img className="relative rounded-xl" src={story.imageUrl} />
                    <div className="absolute top-0 left-0 right-0 bg-gradient-to-r from-[#e5eef7] to-[rgba(21,21,21,0)] w-full h-full flex items-center  justify-start it rounded-xl md:gap-5">
                       <div className="sm:w-full lg:w-1/2 md:ml-24 md:space-y-5">
                       <h2 className="text-2xl md:text-5xl  text-[#2d2d2b] font-bold">{story.title}</h2>
                        <p className="text-[#2d2d2b] ">{story.description}</p>
                        <p className="btn md:p-2 px-8 bg-[#181ca3] outline-none border-none md:w-48 text-[#ffff]">Get Start</p>
                       </div>
                    </div>
                   
                </div>)
            }
        </Carousel>
    );
};

export default Banner;
