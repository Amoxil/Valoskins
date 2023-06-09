/* eslint-disable react/prop-types */
import { useRef, useState } from "react";
import { useParams } from "react-router";

const Skin = ({ skinsMap }) => {
    const params = useParams();

    //Gets the uuid from the param and searches it in the hashmap
    const skin = skinsMap.get(params["uuid"]);

    console.log(skin);

    //Sets the current media as the default skin
    const [media, setMedia] = useState(skin["chromas"][0]["fullRender"]);
    const [isVideo, setIsVideo] = useState(false);

    //Checks if skin has more levels but the level 1
    //If true returns a button to display it */
    const SkinLevels = () => {
        return (
            <div className="skin-levels">
                {Object.keys(skin["levels"].slice(1)).length > 0 ? (
                    skin["levels"].slice(1).map((level) => {
                        return (
                            <button
                                key={level["uuid"]}
                                onClick={() => {
                                    setIsVideo(true);
                                    setMedia(level["streamedVideo"]);
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

    //Checks if skin has more chromas but the base chroma
    //If true returns a button to display it
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
            <h1> {skin.displayName} </h1>
            <div className="skin-content">
                <div className="skin-show">
                    <SkinLevels></SkinLevels>
                    <SkinChromas></SkinChromas>
                </div>
                <div className="skin-media">
                    {/* Checks if the media is a video or img */}
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
                        <img
                            src={media}
                            key={media}
                            className="fade-in"
                            alt=""
                        />
                    )}
                </div>
            </div>
        </div>
    );
};

export default Skin;
