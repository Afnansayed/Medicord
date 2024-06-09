
import Review from "../../ParticipantDashboard/Review/Review";
import Banner from "../Banner/Banner";
import PopularCamps from "../PopularCamps/PopularCamps";


const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamps/>
            <Review></Review>
        </div>
    );
};

export default Home;