import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft, faLightbulb } from "@fortawesome/free-solid-svg-icons";

import List from "./List";
import Armory from "./Armory";
import Skin from "./Skin";
import Loader from "./Loader";
import Home from "./Home";

function App() {
    //State of skins data and skin hashmap
    const [skins, setSkins] = useState([]);
    const [skinsMap, setSkinsMap] = useState(new Map());

    const [lightMode, setLightMode] = useState(false);

    //Location for the back button
    const location = useLocation();

    const navigate = useNavigate();

    const fetchData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();
        setSkins(data["data"]);
    };

    useEffect(() => {
        fetchData("https://valorant-api.com/v1/weapons/skins");
    }, []);

    //Create new hashmap when skins change (in this case as soon as skins is available)
    useEffect(() => {
        let sMap = new Map();

        skins.map((skin) => {
            sMap.set(skin["uuid"], skin);
        });
        setSkinsMap(sMap);
        console.log(skinsMap);
    }, [skins]);

    return (
        <div className={lightMode ? "light-mode" : ""} id="main">
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

            <FontAwesomeIcon
                icon={faLightbulb}
                id="light-mode"
                onClick={() => {
                    setLightMode(!lightMode);
                }}
            ></FontAwesomeIcon>

            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route
                    path="/Armory"
                    element={<Armory skins={skins} />}
                ></Route>
                <Route
                    exact
                    path="Armory/:type"
                    element={<List skins={skins} />}
                ></Route>
                <Route
                    path="Armory/:type/:uuid"
                    element={
                        skinsMap.size > 0 ? (
                            <Skin skinsMap={skinsMap} />
                        ) : (
                            <h1> Loading ... </h1>
                        )
                    }
                ></Route>
                <Route
                    path="*"
                    element={
                        <>
                            <h1>{"404"}</h1>
                            <h1>{"There's nothing here"}</h1>
                        </>
                    }
                />
            </Routes>
        </div>
    );
}

export default App;
