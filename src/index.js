const Express = require("express");
const BodyParser = require("body-parser");
const Crypto = require("crypto");

const app = Express();

app.use(Express.static("public"));
app.use(BodyParser.json());

/**
 * Given that ROCK = 0, PAPER = 1 and SCISSOR = 2
 * Returns the winning hand (0, 1 or 2) or -1 if tie
 *
 * @param a opponent
 * @param b opponent
 * @returns {number} winning hand (a or b) or -1 if tied
 */

const CHOICES = {
  ROCK: 0,
  PAPER: 1,
  SCISSOR: 2,
};

const COMPARE_RESULT = {
  DRAW: Symbol("draw"),
  ...CHOICES,
};
const compareHands = (a, b) =>
  a === b ? COMPARE_RESULT.DRAW : 2 - ((a + b) % 3);

const prb = (bytes) => Crypto.pseudoRandomBytes(bytes).toString("hex");

class Round {
  #hands = new Map();

  constructor(hands) {
    if (hands.length !== 2) {
      throw new Error("Expected exactly 2 hands");
    }

    this.#hands = new Map(hands.map((id) => [id, null]));
  }

  static handId(hand) {
    return hand[0];
  }

  static handValue(hand) {
    return hand[1];
  }

  static handPlayed(hand) {
    return Round.handValue(hand) != null;
  }

  static everyHandPlayed(...hands) {
    return hands.every((hand) => Round.handPlayed(hand));
  }

  setHand(id, choice) {
    if (!this.#hands.has(id)) {
      throw new Error("No such hand");
    }
    this.#hands.set(id, Number(choice));
  }

  #getHands() {
    return Array.from(this.#hands.entries());
  }

  canResolve() {
    const [a, b] = this.#getHands();
    return Round.everyHandPlayed(a, b);
  }

  getWinner() {
    const [a, b] = this.#getHands();
    if (!Round.everyHandPlayed(a, b)) {
      return null;
    }

    const winner = compareHands(Round.handValue(a), Round.handValue(b));
    if (winner === COMPARE_RESULT.DRAW) {
      return COMPARE_RESULT.DRAW;
    }

    return winner === Round.handValue(a) ? Round.handId(a) : Round.handId(b);
  }

  toJSON() {
    const winner = this.canResolve() ? this.getWinner() : undefined;
    return {
      played: this.#getHands().filter((hand) => Round.handPlayed(hand)).length,
      result: winner === COMPARE_RESULT.DRAW ? "draw" : winner,
    };
  }
}

class Game {
  #scores;
  #history = [];
  #rounds = [];
  #currentRound;
  #players;

  constructor(players) {
    this.#players = players;
    this.#resetGame();
  }

  #resetGame() {
    this.#scores = this.#players.reduce(
      (acc, player) => ({ ...acc, [player]: 0 }),
      {}
    );
    this.#newRound();
  }

  #newRound() {
    if (this.#currentRound) {
      this.#rounds.push(this.#currentRound);
    }
    this.#currentRound = new Round(this.#players);
    this.#history.push({ at: Date.now(), action: "newRound" });
  }

  #tryResolveRound() {
    if (this.#currentRound.canResolve()) {
      const winner = this.#currentRound.getWinner();
      this.#history.push({
        at: Date.now(),
        action: "resolve",
        winner: winner === COMPARE_RESULT.DRAW ? "draw" : winner,
      });
      if (winner !== COMPARE_RESULT.DRAW) {
        this.#scorePoint(winner);
      }
      this.#newRound();
      return { winner };
    }
    return {};
  }

  #scorePoint(player, amount = 1) {
    if (!this.#scores.hasOwnProperty(player)) {
      throw new Error("Can not score for player not in this game");
    }
    this.#history.push({
      at: Date.now(),
      action: "score",
      player,
      amount,
      score: this.#scores[player],
    });
    this.#scores[player] += amount;
  }

  getState() {
    return {
      scores: this.#scores,
      round: {
        current: this.#currentRound,
        previous: this.#rounds.reverse(),
      },
      history: this.#history.reverse(),
    };
  }

  playHand(player, hand) {
    this.#history.push({ at: Date.now(), action: "play", player });
    this.#currentRound.setHand(player, hand);
    return this.#tryResolveRound();
  }
}

class GameManager {
  #tokens = new Map();
  #games = [];

  create() {
    const players = [prb(8), prb(8)];
    const game = new Game(players);
    const index = this.#games.push(game) - 1;

    players.forEach((token) => {
      this.#tokens.set(token, index);
    });

    return players;
  }

  find(player) {
    if (!this.#tokens.has(player)) {
      throw new Error("Player token invalid");
    }

    return this.#games[this.#tokens.get(player)];
  }
}

const gm = new GameManager();

app.get("/game/create", (req, res) => {
  const players = gm.create();

  res.status(200).json(players);
});

app.get("/player/:token/state", (req, res) => {
  const { token } = req.params;
  const game = gm.find(token);

  res.status(200).json(game.getState());
});

app.get("/player/:token/play/:choice", (req, res) => {
  const { token, choice } = req.params;
  const game = gm.find(token);

  const result = game.playHand(token, Number(choice));
  res.status(200).json(result);
});

const srv = app.listen(8080, () => {
  console.log("Listening @ %j", srv.address());
});
