import React from "react";
interface IVideoJSPlayerProps {
    apiEndPoint?: string;
    vid: string;
    token: string;
    autoPlay?: boolean;
}
declare const ELearningPlayer: React.FC<IVideoJSPlayerProps>;
export default ELearningPlayer;
