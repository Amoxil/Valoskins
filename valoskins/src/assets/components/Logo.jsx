import LogoText from "../images/logo/logo_text.png";
import LogoKnife from "../images/logo/logo_knife.gif";

const Logo = () => {
    return (
        <div className="logo">
            <img src={LogoText} className="logo-text" alt="" />
            <img src={LogoKnife} className="logo-image" alt="" />
            <div className="logo-shape"></div>
        </div>
    );
};

export default Logo;
