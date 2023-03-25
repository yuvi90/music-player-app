import { DeathBedImg, BadLiarImg, FadedImg, HateMeImg, SoloImg, WithoutMeImg, OnTopImg } from "./cover";
import { DeathBed, BadLiar, Faded, HateMe, Solo, WithoutMe, OnTop } from "./audio";

const data = [
    {
        id: "1",
        title: "Death Bed",
        artist: "Powfu",
        coverSrc: DeathBedImg,
        audioSrc: DeathBed,
        active: true,
        color: ["", ""],
    },
    {
        id: "2",
        title: "Bad Liar",
        artist: "Imagine Dragons",
        coverSrc: BadLiarImg,
        audioSrc: BadLiar,
        active: false,
        color: ["", ""],
    },
    {
        id: "3",
        title: "Faded",
        artist: "Alan Walker",
        coverSrc: FadedImg,
        audioSrc: Faded,
        active: false,
        color: ["", ""],
    },
    {
        id: "4",
        title: "Hate Me",
        artist: "Ellie Goulding",
        coverSrc: HateMeImg,
        audioSrc: HateMe,
        active: false,
        color: ["", ""],
    },
    {
        id: "5",
        title: "Solo",
        artist: "Clean Bandit",
        coverSrc: SoloImg,
        audioSrc: Solo,
        active: false,
        color: ["", ""],
    },
    {
        id: "6",
        title: "Without Me",
        artist: "Halsey",
        coverSrc: WithoutMeImg,
        audioSrc: WithoutMe,
        active: false,
        color: ["", ""],
    },
    {
        id: "7",
        title: "On Top",
        artist: "Karan Aujla",
        coverSrc: OnTopImg,
        audioSrc: OnTop,
        active: false,
        color: ["", ""],
    }
];

export { data };