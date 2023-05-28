import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLightbulb } from "@fortawesome/free-solid-svg-icons";

import List from "./List";
import Armory from "./Armory";
import Skin from "./Skin";
import Loader from "./Loader";
import Home from "./Home";
import ArmoryMobile from "./ArmoryMobile";
import Navbar from "./Navbar";

function App() {
    //State of skins data and skin hashmap
    const [skins, setSkins] = useState([]);
    const [skinsMap, setSkinsMap] = useState(new Map());

    const [lightMode, setLightMode] = useState(false);

    //Check if is mobile
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

    const fetchData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();
        setSkins(data["data"]);
    };

    useEffect(() => {
        fetchData("https://valorant-api.com/v1/weapons/skins");
    }, []);

    //Handles the resize and refreshes isMobile value
    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 767);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
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
            <div className="bg" />
            <Navbar
                isMobile={isMobile}
                setLightMode={() => {
                    setLightMode(!lightMode);
                }}
            ></Navbar>

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
                    element={
                        isMobile ? (
                            <ArmoryMobile skins={skins} />
                        ) : (
                            <Armory skins={skins} />
                        )
                    }
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
