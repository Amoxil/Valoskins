/* eslint-disable react/prop-types */
import Card from "./Card";
import { useParams } from "react-router-dom";

const List = ({ skins }) => {
    console.log(useParams());
    let params = useParams();

    skins = skins.filter((skin) => {
        return (
            skin["displayName"].includes(params["type"]) &&
            !skin["displayName"].includes("Standard")
        );
    });

    let count = 0;

    return (
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
    );
};

export default List;
