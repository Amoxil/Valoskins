/* eslint-disable react/prop-types */
import { useParams } from "react-router";

const Skin = ({ skinsMap }) => {
    const params = useParams();
    const img = skinsMap.get(params["uuid"])["chromas"][0]["fullRender"];
    return (
        <>
            <img src={img} alt="" />
        </>
    );
};

export default Skin;
