/* eslint-disable react/prop-types */
import { useState } from "react";
import Card from "./Card";
import { useParams } from "react-router-dom";

const List = ({ skins }) => {
    const [searchText, setSearchText] = useState("");

    console.log(useParams());
    let params = useParams();

    skins = skins.filter((skin) => {
        if (params["type"] === "Melee") {
            return (
                skin["assetPath"].includes("Melee") &&
                !skin["assetPath"].includes("Random")
            );
        } else {
            return (
                skin["displayName"].includes(params["type"]) &&
                skin["displayName"]
                    .toLowerCase()
                    .includes(searchText.toLowerCase())
            );
        }
    });

    let count = 0;

    return (
        <>
            <input
                type="text"
                value={searchText}
                onChange={(e) => setSearchText(e.target.value)}
            />
            <div className="skin-list">
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
