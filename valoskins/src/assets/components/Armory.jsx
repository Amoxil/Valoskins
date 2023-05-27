/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "./Card";
import List from "./List";

const Armory = ({ skins }) => {
    //Sets weapon's name as key
    let map = new Map();
    skins.map((skin) => {
        if (
            skin["displayName"].includes("Standard") ||
            skin["displayName"] === "Melee"
        )
            map.set(skin["displayName"], skin["chromas"][0]["fullRender"]);
    });

    //Weapon column order (1:1 from the game)
    let weaponsOrder = {
        1: ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"],
        2: ["Stinger", "Spectre", "Bucky", "Judge"],
        3: ["Bulldog", "Guardian", "Phantom", "Vandal"],
        4: ["Marshal", "Operator", "Ares", "Odin"],
    };

    //For each column and for each weapon return a Card
    return (
        <div className="armory fade-in">
            {Object.keys(weaponsOrder).map((column) => {
                return (
                    <div className="armory-col" key={`Col  ${column}`}>
                        {weaponsOrder[column].map((weapon) => {
                            return (
                                <Card
                                    key={weapon}
                                    img={map.get(`Standard ${weapon}`)}
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
