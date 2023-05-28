/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";
import Card from "./Card";
import List from "./List";

const ArmoryMobile = ({ skins }) => {
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
    let weaponsOrder = [
        "Classic",
        "Shorty",
        "Frenzy",
        "Ghost",
        "Sheriff",
        "Stinger",
        "Spectre",
        "Bucky",
        "Judge",
        "Bulldog",
        "Guardian",
        "Phantom",
        "Vandal",
        "Marshal",
        "Operator",
        "Ares",
        "Odin",
    ];

    //For each column and for each weapon return a Card
    return (
        <div className="armory fade-in">
            {weaponsOrder.map((weapon) => {
                return (
                    <Card
                        key={weapon}
                        img={map.get(`Standard ${weapon}`)}
                        link={weapon}
                    ></Card>
                );
            })}

            <Card key={"Melee"} img={map.get("Melee")} link={"Melee"}></Card>
        </div>
    );
};

export default ArmoryMobile;
