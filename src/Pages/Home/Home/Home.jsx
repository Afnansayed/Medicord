import Footer from "../../../components/Footer/Footer";
import Banner from "../Banner/Banner";
import Feedback from "../Feedback/Feedback";
import Fetured from "../Fetured/Fetured";
import PopularCamps from "../PopularCamps/PopularCamps";


const Home = () => {
    return (
        <div>
            <Banner/>
            <PopularCamps/>
            <Fetured></Fetured>
            <Feedback/>
            <Footer/>
        </div>
    );
};

export default Home;