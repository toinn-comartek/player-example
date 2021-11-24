import React from "react";
import ELearningPlayer from "./player";

interface IPlayerELearning {
  vid: string;
  token: string;
  apiEndPoint?: string;
  autoPlay?: boolean;
}
export const PlayerELearning = (props: IPlayerELearning) => {
  return <ELearningPlayer {...props} />;
};
