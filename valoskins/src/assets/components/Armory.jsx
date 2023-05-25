/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "./Card";
import List from "./List";

const Armory = ({ skins }) => {
    let map = new Map();
    skins.map((skin) => {
        if (
            skin["displayName"].includes("Standard") ||
            skin["displayName"] === "Melee"
        )
            map.set(skin["displayName"], skin["chromas"][0]["fullRender"]);
    });

    let weaponsOrder = {
        1: ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"],
        2: ["Stinger", "Spectre", "Bucky", "Judge"],
        3: ["Bulldog", "Guardian", "Phantom", "Vandal"],
        4: ["Marshal", "Operator", "Ares", "Odin"],
    };

    let count = 0;

    return (
        <div className="armory fade-in">
            {Object.keys(weaponsOrder).map((column) => {
                return (
                    <div className="armory-col" key={count++}>
                        {weaponsOrder[column].map((weapon) => {
                            return (
                                <Card
                                    key={weapon}
                                    img={map.get("Standard " + weapon)}
                                    link={weapon}
                                ></Card>
                            );
                        })}
                    </div>
                );
            })}

            <div className="armory-knife">
                <Card
                    key={"Melee"}
                    img={map.get("Melee")}
                    link={"Melee"}
                ></Card>
            </div>
        </div>
    );
};

export default Armory;
