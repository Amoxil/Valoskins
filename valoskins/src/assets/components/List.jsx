import { useEffect, useState } from "react";
import Card from "./Card";

const List = () => {
    const [skins, setSkins] = useState([]);

    const fetchData = async (url) => {
        const response = await fetch(url);
        let data = await response.json();
        setSkins(
            data["data"].filter((skin) => {
                return (
                    skin["displayName"].includes("Phantom") &&
                    !skin["displayName"].includes("Standard")
                );
            })
        );
    };

    useEffect(() => {
        fetchData("https://valorant-api.com/v1/weapons/skins");
    }, []);

    let count = 0;

    return (
        <>
            {skins.map((skin) => {
                return (
                    <Card
                        key={count++}
                        img={skin["displayIcon"]}
                        name={skin["displayName"]}
                    ></Card>
                );
            })}
        </>
    );
};

export default List;
