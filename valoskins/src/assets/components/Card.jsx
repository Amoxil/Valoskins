import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Card = ({ img, name, link, price }) => {
    return (
        <article className="card">
            <Link to={"./" + link}>
                <img src={img} alt="" />
                <p>
                    {name}
                    {price}
                </p>
            </Link>
        </article>
    );
};

export default Card;
