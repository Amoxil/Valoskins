/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useParams } from "react-router";

const Skin = ({ skinsMap }) => {
    console.log(skinsMap);
    const params = useParams();
    const mediaRef = useRef(null);

    const skin = skinsMap.get(params["uuid"]);
    const [media, setMedia] = useState(skin["chromas"][0]["fullRender"]);
    const [isVideo, setIsVideo] = useState(false);

    const SkinLevels = () => {
        return (
            <div className="skin-levels">
                {Object.keys(skin["levels"].slice(1)).length > 1 ? (
                    skin["levels"].slice(1).map((level) => {
                        return (
                            <button
                                key={level["uuid"]}
                                onClick={() => {
                                    setIsVideo(true);
                                    setMedia(level["streamedVideo"]);
                                    mediaRef.current.reload;
                                }}
                            >
                                {level["displayName"]}
                            </button>
                        );
                    })
                ) : (
                    <h2> No levels available </h2>
                )}
            </div>
        );
    };

    const SkinChromas = () => {
        return (
            <div className="skin-chromas">
                {Object.keys(skin["chromas"]).length > 1 ? (
                    skin["chromas"].map((chroma) => {
                        return (
                            <img
                                src={chroma["swatch"]}
                                key={chroma["uuid"]}
                                onClick={() => {
                                    setMedia(chroma["fullRender"]);
                                    setIsVideo(false);
                                }}
                            />
                        );
                    })
                ) : (
                    <h2>No chromas available</h2>
                )}
            </div>
        );
    };

    return (
        <div className="skin-wrapper fade-in">
            <div className="skin-show">
                <h1> {skin.displayName} </h1>
                <SkinLevels></SkinLevels>
                <SkinChromas></SkinChromas>
            </div>
            <div className="skin-media" ref={mediaRef}>
                {isVideo ? (
                    <video
                        controls
                        autoPlay
                        loop
                        className="video-level fade-in"
                        src={media}
                        key={media}
                    ></video>
                ) : (
                    <img src={media} key={media} className="fade-in" alt="" />
                )}
            </div>
        </div>
    );
};

export default Skin;
