# Leaderboard Server

[![Build Status](https://travis-ci.org/onebytegone/leaderboard-server.svg?branch=master)](https://travis-ci.org/onebytegone/leaderboard-server)
[![Coverage Status](https://coveralls.io/repos/github/onebytegone/leaderboard-server/badge.svg?branch=master)](https://coveralls.io/github/onebytegone/leaderboard-server?branch=master)
[![Dependency Status](https://david-dm.org/onebytegone/leaderboard-server.svg)](https://david-dm.org/onebytegone/leaderboard-server)
[![Dev Dependency Status](https://david-dm.org/onebytegone/leaderboard-server/dev-status.svg)](https://david-dm.org/onebytegone/leaderboard-server?type=dev)

This is a simple server that stores top scores for a game. This can be used
with a simple JS app to create a web-based leaderboard.

## Installation

```
git clone
npm install
```

## Running the server

The server can be started on port 3000 by running:

```
npm start
```

## API

### `/ping` (`GET`)

Returns a "pong".

```json
{
   "pong": "2018-09-04T23:59:53.199Z"
}
```

### `/games` (`GET`)

Returns an array containing the most recent game.

```json
[
   {
      "id":"b1201649-db2e-4b31-9f86-628ef0bc0c54",
      "timestamp":1536104977581,
      "players": [
         {"score":10,"name":"Incognito Porpoise"},
         {"score":20,"name":"Unnamed Mule"},
         {"score":30,"name":"UnsignedHippopotamus"}
      ]
   }
]
```

### `/games` (`POST`)

Saves the given game data. At minimum the following should be sent in the
request body:

```json
{
   "players": [
      {
         "score": 1,
      }
   ]
}
```

If the data contains an `id` that already exists, that data will overwrite the
previous data for that game. If no `id` is present, one will be generated. The
`timestamp` field will also be autofilled if it is missing. The same is true
for player names.

#### Example

```
curl -s 'http://localhost:3000/games' -H 'Content-Type: application/json' --data-binary '{ "players": [ { "score": 10 }, { "score": 20 }, { "score": 30 } ] }'
```

### `/top-scores` (`GET`)

Returns the top scores that have been recorded.

```json
[
   {"score":36,"name":"Incognito Cod"},
   {"score":20,"name":"Unnamed Rabbit"},
   {"score":10,"name":"Incognito Louse"}
]
```

## License

This is released under the MIT license. See [LICENSE.md](LICENSE.md) for more
information.
