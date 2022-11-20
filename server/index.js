const express = require("express");
const uuid = require("uuid");
const _ = require("lodash");
const cors = require("cors");
const os = require("os");
const emojis = require("./emoji");
const colors = require("./colors");
const { GAME_STATE } = require("./game-state");
const crypto = require("crypto");
const ifaces = os.networkInterfaces();

const app = express();
const port = 8000;

app.use(cors());
app.use(express.json());
app.use(express.static(__dirname + '/../out', { extensions: ['html'] }))


///////////////////
// STATE
///////////////////
const state = {
  session: {
    started: false,
    users: [
      // {
      //     "id": "19857abe-a028-4090-a11f-907de6ab7007",
      //     "username": "1"
      // },
      // {
      //     "id": "29857abe-a028-4090-a11f-907de6ab7007",
      //     "username": "2"
      // },
      // {
      //     "id": "39857abe-a028-4090-a11f-907de6ab7007",
      //     "username": "3"
      // }
    ],
    pairs: {
      // "id": {
      //     id: "id",
      //     emoji: "🦍",
      //     color: "#ffffff",
      //     state: "PAIRING",
      //     users: [
      //         {
      //             code: "ABCD",
      //             userId: "fsfsaf-fs-afs-afs"
      //         },
      //         {
      //             code: "DEFG",
      //             userId: "aafsaf-fs-afs-afs"
      //         }
      //     ]
      // }
    }
  }
};

//////////////////
// STATE SELECTORS
//////////////////
const selectors = {
  getGameIsStarted: (state) => {
    return state.session.started;
  },
  getUser: (state, userId) => {
    const users = state.session.users;
    return users.find((user) => user.id === userId);
  },
  getPairForUser: (state, userId) => {
    const gamePairs = Object.values(state.session.pairs);
    return gamePairs.find((pair) =>
      pair.users.some((user) => user.userId === userId)
    );
  },
};

///////////////////
// ROUTES
///////////////////
app.get("/state", (req, res) => {
  return res.json(state);
});

app.get("/users", (req, res) => {
  return res.json(state.session.users);
});

/**
 * Join game session.
 * Username must be unique across all players.
 * Game must be NOT started already.
 */
app.post("/game/join", (req, res) => {
  const username = req.body?.username;
  const registeredUsers = state.session.users;
  const id = uuid.v4();
  const matchingPlayer = registeredUsers.find(
    (user) => user.username === username
  );
  const isGameStarted = selectors.getGameIsStarted(state);

  if (isGameStarted) {
    return res.status(403).json({
      error: "Game already started :(",
    });
  }

  if (!username) {
    return res.status(400).json({
      error: "Missing 'username'!",
    });
  }

  if (matchingPlayer) {
    return res.status(400).json({
      error: "Username already registered!",
    });
  }

  const player = {
    id,
    username,
  };

  state.session.users.push(player);

  console.log(`> Player "${username}" joined!`);

  return res.json(player);
});

/**
 * Starts the game by:
 * * drawing player pairs
 * * changing "started" game state
 */
app.post("/game/start", (req, res) => {
  const users = [...state.session.users];
  const pairs = {};
  const isGameStarted = selectors.getGameIsStarted(state);

  if (isGameStarted) {
    return res.status(403).json({
      error: "Game already started :(",
    });
  }

  // draw pairs of users
  while (users.length > 1) {
    const pairId = uuid.v4();
    const user1 = users.splice(_.random(users.length - 1), 1)[0];
    const user2 = users.splice(_.random(users.length - 1), 1)[0];
    const emoji = _.sample(emojis);
    const color = _.sample(colors);
    const code1 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const code2 = crypto.randomBytes(2).toString("hex").toUpperCase();
    const status = "PAIRING";

    pairs[pairId] = {
      id: pairId,
      emoji: emoji.emoji,
      color,
      status,
      users: [
        {
          userId: user1.id,
          code: code1,
        },
        {
          userId: user2.id,
          code: code2,
        },
      ],
    };
  }

  // start the game
  state.session.pairs = pairs;
  state.session.started = true;

  console.log(
    `> Game started! Total of "${state.session.users.length}" players participates!`
  );

  return res.json(state.session.pairs);
});


app.post("/game/stop", (req, res) => {
  const isGameStarted = selectors.getGameIsStarted(state);

  if (!isGameStarted) {
    return res.status(403).json({
      error: "Game not started :(",
    });
  }

  // reset the game
  state.session.pairs = {};
  state.session.started = false;

  return res.status(200).send();
});




/**
 * Check game status and params of the game for given player
 */
app.get("/game/status", (req, res) => {
  const userId = req.query?.userId;
  const user = selectors.getUser(state, userId);

  if (!userId) {
    return res.status(400).json({
      error: "Missing 'userId' param!",
    });
  }

  if (!user) {
    return res.status(403).json({
      error: `User for "${userId}" userId not found!`,
    });
  }

  if (!state.session.started) {
    return res.json({
      status: GAME_STATE.NOT_STARTED,
      playersCount: state.session.users.length,
    });
  }

  const pairForUser = selectors.getPairForUser(state, userId);

  if (!pairForUser) {
    return res.status(404).json({
      error: `Pair for "${userId}" userId not found!`,
    });
  }

  if (pairForUser.status === "PAIRED") {
    return res.json({
      status: GAME_STATE.FULFILLED,
      gameParams: {
        pairId: pairForUser.id,
        emoji: pairForUser.emoji,
        color: pairForUser.color,
        userCode: pairForUser.users.find((user) => user.userId === userId).code,
      },
    });
  }

  return res.json({
    status: GAME_STATE.STARTED,
    gameParams: {
      pairId: pairForUser.id,
      emoji: pairForUser.emoji,
      color: pairForUser.color,
      userCode: pairForUser.users.find((user) => user.userId === userId).code,
    },
  });
});

/**
 * Verifies if one player from the pair typed code of the other one
 */
app.post("/game/verify", (req, res) => {
  const code = req.body?.code;
  const userId = req.body?.userId;

  if (!code) {
    return res.status(400).json({
      error: "Missing 'code' param!",
    });
  }

  if (!userId) {
    return res.status(400).json({
      error: "Missing 'userId' param!",
    });
  }

  const pairForUser = selectors.getPairForUser(state, userId);

  if (!pairForUser) {
    return res.status(404).json({
      error: `Pair for "${userId}" userId not found!`,
    });
  }

  const matchingPlayer = pairForUser.users.find(
    (user) => user.userId !== userId
  );

  const isCodeValid = matchingPlayer.code === code;
  if (isCodeValid) {
    // change pair status
    pairForUser.status = "PAIRED";
  }

  return res.json({
    success: isCodeValid
  });
});

///////////////////
// STARTUP
///////////////////
app.listen(port, () => {
  console.log(`> Game server listening on:`);
  Object.keys(ifaces).forEach(function (dev) {
    ifaces[dev].forEach(function (details) {
      if (details.family === 'IPv4') {
        console.info(('  http://' + details.address + ':' + port.toString()));
      }
    });
  });
});
