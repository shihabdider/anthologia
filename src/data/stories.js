import queenOfSpades from "../stories/the-queen-of-spades";
import darkness from "../poems/darkness";
import theAlchemist from "../poems/the-alchemist";

const stories = [
  {
    title: "The Queen of Spades",
    author: 'Alexander Pushkin',
    path: "the-queen-of-spades",
    content: queenOfSpades,
    tags: ['short story']
  },
  {
    title: "Darkness",
    author: 'Lord Byron',
    path: "darkness",
    content: darkness,
    tags: ['poem']
  },
  {
    title: "The Alchemist",
    author: 'Ezra Pound',
    path: "the-alchemist",
    content: theAlchemist,
    tags: ['poem']
  },
];

export default stories;
