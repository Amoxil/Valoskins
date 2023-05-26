/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import SE from "../images/SE.png";
import PE from "../images/PE.png";
import DE from "../images/DE.png";
import UE from "../images/UE.png";
import XE from "../images/XE.png";

const List = ({ skins }) => {
    const [searchText, setSearchText] = useState("");
    const [hasMore, setHasMore] = useState(false);

    const tiersUuid = [
        [SE, "12683d76-48d7-84a3-4e09-6985794f0445"],
        [DE, "0cebb8be-46d7-c12a-d306-e9907bfc5a25"],
        [PE, "60bca009-4182-7998-dee7-b8a2558dc369"],
        [UE, "e046854e-406c-37f4-6607-19a9ba8426fc"],
        [XE, "411e4a55-4e59-7757-41f0-86a53f101bb5"],
    ];

    const [tiers, setTiers] = useState([
        "12683d76-48d7-84a3-4e09-6985794f0445",
        "0cebb8be-46d7-c12a-d306-e9907bfc5a25",
        "60bca009-4182-7998-dee7-b8a2558dc369",
        "e046854e-406c-37f4-6607-19a9ba8426fc",
        "411e4a55-4e59-7757-41f0-86a53f101bb5",
    ]);

    const handleTiers = (tier) => {
        if (tiers.includes(tier)) {
            const updatedArray = tiers.filter((item) => item !== tier);
            setTiers(updatedArray);
        } else {
            const updatedArray = [...tiers, tier];
            setTiers(updatedArray);
        }
    };

    console.log(useParams());
    let params = useParams();

    skins = skins.filter((skin) => {
        if (
            !skin["displayName"]
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            !tiers.includes(skin["contentTierUuid"])
        )
            return false;

        if (params["type"] === "All")
            return !skin["assetPath"].includes("Random");
        else if (params["type"] === "Melee") {
            return (
                skin["assetPath"].includes("Melee") &&
                !skin["assetPath"].includes("Random")
            );
        } else {
            return skin["displayName"].includes(params["type"]);
        }
    });

    let count = 0;

    return (
        <>
            <div className="tier-filter">
                <p> Search: </p>
                <input
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                />
                <p> Tier filter: </p>
                {tiersUuid.map((tier) => {
                    return (
                        <img
                            key={tier[0]}
                            src={tier[0]}
                            className={tiers.includes(tier[1]) ? "" : "faded"}
                            onClick={() => handleTiers(tier[1])}
                        ></img>
                    );
                })}
            </div>
            <div className="skin-list fade-in">
                {skins.map((skin) => {
                    return (
                        <Card
                            key={count++}
                            img={
                                skin["displayIcon"] ||
                                skin["levels"][0]["displayIcon"]
                            }
                            name={skin["displayName"]}
                            link={skin["uuid"]}
                        ></Card>
                    );
                })}
            </div>
        </>
    );
};

export default List;
