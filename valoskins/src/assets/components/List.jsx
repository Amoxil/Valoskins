/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import LazyList from "./LazyList";
import SE from "../images/tiers/SE.png";
import PE from "../images/tiers/PE.png";
import DE from "../images/tiers/DE.png";
import UE from "../images/tiers/UE.png";
import XE from "../images/tiers/XE.png";

const List = ({ skins }) => {
    const [searchText, setSearchText] = useState("");

    //Current page count
    const [page, setPage] = useState(1);

    //Cards to show per page
    const itemsPerPage = 20;

    //Binding tier image -> tier uuid
    const tiersUuid = [
        [SE, "12683d76-48d7-84a3-4e09-6985794f0445"],
        [DE, "0cebb8be-46d7-c12a-d306-e9907bfc5a25"],
        [PE, "60bca009-4182-7998-dee7-b8a2558dc369"],
        [UE, "e046854e-406c-37f4-6607-19a9ba8426fc"],
        [XE, "411e4a55-4e59-7757-41f0-86a53f101bb5"],
    ];

    //Array that contains the tiers to filter out
    const [tiers, setTiers] = useState([]);

    //Tier toggle from the filter array
    const handleTiers = (tier) => {
        if (tiers.includes(tier)) {
            const updatedArray = tiers.filter((item) => item !== tier);
            setTiers(updatedArray);
        } else {
            const updatedArray = [...tiers, tier];
            setTiers(updatedArray);
        }
    };

    let params = useParams();

    //Filters skins based on display name, if param === "All" display all
    skins = skins.filter((skin) => {
        if (
            !skin["displayName"]
                .toLowerCase()
                .includes(searchText.toLowerCase()) ||
            tiers.includes(skin["contentTierUuid"]) ||
            skin["contentTierUuid"] === null
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
                <div className="tiers">
                    {tiersUuid.map((tier) => {
                        return (
                            <img
                                key={tier[0]}
                                src={tier[0]}
                                className={
                                    tiers.includes(tier[1]) ? "faded" : ""
                                }
                                onClick={() => handleTiers(tier[1])}
                            ></img>
                        );
                    })}
                </div>
            </div>

            {/* Only page x itemsPerPage cards are displayed*/}
            {/* Infinite scroll fires "next" function each time bottom is reached */}

            <InfiniteScroll
                dataLength={
                    Object.keys(skins.slice(0, page * itemsPerPage)).length
                }
                next={() => setPage(page + 1)}
                hasMore={true}
                className="skin-list fade-in"
            >
                <LazyList
                    skins={skins.slice(0, page * itemsPerPage)}
                ></LazyList>
            </InfiniteScroll>
        </>
    );
};

export default List;
