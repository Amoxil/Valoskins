import Card from "./Card";

const LazyList = ({ skins }) => {
    return skins.map((skin) => {
        return (
            <Card
                key={skin["uuid"]}
                img={skin["displayIcon"] || skin["levels"][0]["displayIcon"]}
                name={skin["displayName"]}
                link={skin["uuid"]}
            ></Card>
        );
    });
};

export default LazyList;
