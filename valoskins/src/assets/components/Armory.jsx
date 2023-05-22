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
        sidearms: ["Classic", "Shorty", "Frenzy", "Ghost", "Sheriff"],
        smg: ["Stinger", "Spectre"],
        shotguns: ["Bucky", "Judge"],
        rifles: ["Bulldog", "Guardian", "Phantom", "Vandal"],
        snipers: ["Marshal", "Operator"],
        machineguns: ["Ares", "Odin"],
    };

    let count = 0;

    return (
        <div className="armory">
            {Object.keys(weaponsOrder).map((category) => {
                return (
                    <div className={category} key={count++}>
                        {weaponsOrder[category].map((weapon) => {
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
        </div>
    );

    /*
    return (
        <div className="armory">
            <div className="sideArms">
                {weaponsOrder.sidearms.map((weapon) => {
                    return (
                        <Card
                            key={weapon}
                            img={map.get("Standard " + weapon)}
                        ></Card>
                    );
                })}
            </div>
        </div>
    );*/
};

export default Armory;
