const express = require('express');
const uuid = require('uuid');
const _ = require("lodash");
const cors = require('cors')
const emojis = require("./emoji");
const colors = require("./colors");
const crypto = require("crypto");

const app = express();
const port = 8000;

app.use(cors())
app.use(express.json());

///////////////////
// STATE
///////////////////
const state = {
    session: {
        started: false,
        users: [
            {
                "id": "19857abe-a028-4090-a11f-907de6ab7007",
                "username": "1"
            },
            {
                "id": "29857abe-a028-4090-a11f-907de6ab7007",
                "username": "2"
            },
            {
                "id": "39857abe-a028-4090-a11f-907de6ab7007",
                "username": "3"
            }
        ],
        pairs: {
            // "id": {
            //     id: "id",
            //     emoji: "🦍",
            //     color: "#ffffff",
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


///////////////////
// ROUTES
///////////////////
app.get("/state", (req, res) => {
    return res.json(state);
})

app.get("/users", (req, res) => {
    return res.json(state.session.users);
});

/**
 * Join game session
 */
app.post("/game/join", (req, res) => {
    const username = req.body?.username;
    const registeredUsers = state.session.users;
    const id = uuid.v4();
    const matchingPlayer = registeredUsers.find(user => user.username === username);

    if (!username) {
        return res.status(400).json({
            error: "Missing username!"
        });
    }

    if (matchingPlayer) {
        return res.status(400).json({
            error: "Username already registered!"
        })
    }

    const player = {
        id,
        username
    }

    state.session.users.push(player);

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

    if (state.session.started) {
        return res.status(403).json({
            error: "Game already started!"
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



        pairs[pairId] = {
            id: pairId,
            emoji: emoji.emoji,
            color,
            users: [
                {
                    userId: user1.id,
                    code: code1
                },
                {
                    userId: user2.id,
                    code: code2
                }
            ]
        }
    }

    // start the game
    state.session.pairs = pairs;
    state.session.started = true;

    return res.json(state.session.pairs);
})


/**
 * Check game status and params of the game for given player
 */
app.get("/game/status", (req, res) => {
    const userId = req.query?.userId;

    if (!userId) {
        return res.status(400).json({
            error: "Missing userId param!"
        });
    }

    if (!state.session.started) {
        return res.json({
            status: "NOT_STARTED",
            playersCount: state.session.users.length
        });
    }

    const gamePairs = Object.values(state.session.pairs);
    const pairForUser = gamePairs.find(pair =>
        pair.users.some(user => user.userId === userId)
    )

    if (!pairForUser) {
        return res.status(404).json({
            error: `Pair for "${userId}" userId not found!`
        });
    }

    return res.json({
        status: "STARTED",
        gameParams: {
            emoji: pairForUser.emoji,
            color: pairForUser.color
        }
    })
})


///////////////////
// STARTUP
///////////////////
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
})
