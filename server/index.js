const express = require('express');
const uuid = require('uuid');
const _ = require("lodash");
const app = express();
const port = 8000;

app.use(express.json());

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
        ],
        pairs: [
            // {
            //     emoji: 
            // }
        ]
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

app.post("/game/start", (req, res) => {
    const users = [...state.session.users];
    const pairs = [];

    // draw pairs of users
    while (users.length > 1) {
        const first = users.splice(_.random(users.length - 1), 1)[0];
        const second = users.splice(_.random(users.length - 1), 1)[0];
        pairs.push([
            first,
            second
        ])
    }

    // start the game

    return res.json(pairs);
})


///////////////////
// STARTUP
///////////////////
app.listen(port, () => {
    console.log(`Server listening on port ${port}!`)
})