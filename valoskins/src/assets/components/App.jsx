import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import List from "./List";
import Armory from "./Armory";
import Skin from "./Skin";
import Loader from "./Loader";
import Home from "./Home";

function App() {
    const [skins, setSkins] = useState([]);
    const [skinsMap, setSkinsMap] = useState(new Map());
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

    useEffect(() => {
        let sMap = new Map();

        skins.map((skin) => {
            sMap.set(skin["uuid"], skin);
        });
        setSkinsMap(sMap);
        console.log(skinsMap);
    }, [skins]);

    return (
        <>
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
            </Routes>
        </>
    );
}

export default App;
