import Logo from "./Logo";
import { useNavigate } from "react-router-dom";
import Jett from "../images/home/home_jett.gif";

const Home = () => {
    const navigate = useNavigate();
    return (
        <div className="home fade-in">
            <div className="home-left">
                <Logo />
                <button
                    className="home-button"
                    onClick={() => navigate("/Armory")}
                >
                    {" "}
                    Go to the Armory
                </button>
            </div>

            <div className="home-right">
                <h3>
                    {" "}
                    Welcome to <span>ValoSkins</span>, your ultimate destination
                    to explore the wide range of <span>skins</span> available
                    in-game, including, <span>levels</span> and{" "}
                    <span>chromas</span>.
                </h3>
                <h3 className="hidden">
                    <span>
                        Psst! Valostore is currently running on the free plan of
                        render so it might take a few minutes to load.{" "}
                    </span>
                    Want to know your current in-game shop rotation? Check out
                    <a href="https://valostore.onrender.com/"> Valostore!</a>
                </h3>
                <img src={Jett} style={{ transform: "scale(1.5)" }}></img>
            </div>
        </div>
    );
};

export default Home;
