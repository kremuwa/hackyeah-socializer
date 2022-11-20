import giraffe1 from "../public/sounds/giraffe1.mp3";
import giraffe2 from "../public/sounds/giraffe2.mp3";
import lion from "../public/sounds/lion.mp3";
import tiger from "../public/sounds/tiger.mp3";
import cat from "../public/sounds/cat.mp3";
import gorilla from "../public/sounds/gorilla.mp3";
import chicken from "../public/sounds/chicken.mp3";
import parot from "../public/sounds/parot.mp3";
import pig from "../public/sounds/pig.mp3";
import wolf from "../public/sounds/wolf.mp3";
import elephant from "../public/sounds/elephant.mp3";

const soundMap = {
    "🦍": gorilla,
    "🦧": gorilla,
    "🐺": wolf,
    "🐈": cat,
    "🐈‍⬛": cat,
    "🐯": tiger,
    "🐅": tiger,
    "🦁": lion,
    "🐘": elephant,
    "🐔": chicken,
    "🐤": chicken,
    "🐷": pig,
    "🐖": pig,
    "🦜": parot,
}
export const getAnimalSound = (emoji) => {
    return soundMap[emoji] || (Math.random() > 0.5 ? giraffe1 : giraffe2)
}
