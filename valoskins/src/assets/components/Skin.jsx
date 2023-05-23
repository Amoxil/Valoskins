/* eslint-disable react/prop-types */
import { useState } from "react";
import { useParams } from "react-router";

const Skin = ({ skinsMap }) => {
    const params = useParams();

    const skin = skinsMap.get(params["uuid"]);
    const [media, setMedia] = useState(skin["chromas"][0]["fullRender"]);
    const [isVideo, setIsVideo] = useState(false);

    console.log(skinsMap.get(params["uuid"]));
    return (
        <>
            <h1> {skin.displayName} </h1>
            <div className="skin-show">
                <div className="skin-chromas">
                    <div className="skin-levels">
                        {skin["levels"].slice(1).map((level) => {
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
                        })}
                    </div>
                    {skin["chromas"].map((chroma) => {
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
                    })}
                </div>
                {isVideo ? (
                    <video
                        controls
                        autoPlay
                        loop
                        className="video-level"
                        src={media}
                    ></video>
                ) : (
                    <img src={media} alt="" />
                )}
            </div>
        </>
    );
};

export default Skin;
