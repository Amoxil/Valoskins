/* eslint-disable react/prop-types */
const Card = ({ img, name, price }) => {
  return (
    <div className="card">
      <img src={img} alt="" />
      <p>
        {name}
        {price}
      </p>
    </div>
  );
};

export default Card;
