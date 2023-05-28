/* eslint-disable react/prop-types */
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faArrowLeft,
    faLightbulb,
    faHouse,
    faGun,
    faPersonRifle,
} from "@fortawesome/free-solid-svg-icons";
import { useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ isMobile, setLightMode }) => {
    //Location for the back button
    const location = useLocation();

    const navigate = useNavigate();

    return isMobile ? (
        <nav>
            <ul>
                <li
                    onClick={() =>
                        location.pathname === "/" ? null : navigate(-1)
                    }
                >
                    <FontAwesomeIcon icon={faArrowLeft} />{" "}
                </li>

                <li onClick={() => navigate("/")}>
                    <FontAwesomeIcon icon={faHouse} />
                </li>
                <li onClick={() => navigate("/Armory")}>
                    <FontAwesomeIcon icon={faGun} />
                </li>
                <li onClick={() => navigate("/Armory/All")}>
                    <FontAwesomeIcon icon={faPersonRifle} />
                </li>
                <li>
                    <FontAwesomeIcon
                        icon={faLightbulb}
                        onClick={setLightMode}
                    ></FontAwesomeIcon>
                </li>
            </ul>
        </nav>
    ) : (
        <nav>
            <ul>
                {location.pathname === "/" ? (
                    " "
                ) : (
                    <li onClick={() => navigate(-1)}>
                        <a>
                            {" "}
                            <FontAwesomeIcon icon={faArrowLeft} />{" "}
                        </a>
                    </li>
                )}

                <li onClick={() => navigate("/")}>
                    <a> Home </a>
                </li>
                <li onClick={() => navigate("/Armory")}>
                    <a> Armory </a>
                </li>
                <li onClick={() => navigate("/Armory/All")}>
                    <a> All skins </a>
                </li>
                <li>
                    <a href="https://github.com/Amoxil">
                        <i className="fa-brands fa-github"></i>
                    </a>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
