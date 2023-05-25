import logodemo from "../../../public/logodemo.jpg";
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home fade-in">
            <img src={logodemo} alt="" />
            <button className="home-button" onClick={() => navigate("/Armory")}>
                {" "}
                Go to the Armory
            </button>
        </div>
    );
};

export default Home;
