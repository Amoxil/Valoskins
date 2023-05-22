import { useEffect, useState } from "react";
import { Link, Route, Routes } from "react-router-dom";
import "./App.css";
import List from "./List";
import Armory from "./Armory";
import Skin from "./Skin";

function App() {
    const [skins, setSkins] = useState([]);

    const fetchData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();
        setSkins(data["data"]);
    };

    useEffect(() => {
        fetchData("https://valorant-api.com/v1/weapons/skins");
    }, []);

    let skinsMap = new Map();

    skins.map((skin) => {
        skinsMap.set(skin["uuid"], skin);
    });

    return (
        <Routes>
            <Route path="/" element={<Armory skins={skins} />}></Route>
            <Route
                exact
                path="/:type"
                element={<List weapType="Vandal" skins={skins} />}
            ></Route>
            <Route
                path="/:type/:uuid"
                element={<Skin skinsMap={skinsMap} />}
            ></Route>
        </Routes>
    );
}

export default App;
