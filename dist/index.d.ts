/// <reference types="react" />
interface IPlayerELearning {
    vid: string;
    token: string;
    apiEndPoint?: string;
    autoPlay?: boolean;
}
export declare const PlayerELearning: (props: IPlayerELearning) => JSX.Element;
export {};
