import { Match } from "../models/matchInterface";
import { useState, useEffect, ReactElement, useRef } from "react";
import "./MatchForm.scss";
interface Props {
  matches: Match[];
  setMatches: (matches: Match[]) => void;
}

const MatchForm = ({ matches, setMatches }: Props) => {
  let overlay = (
    <div className="overlay">
      <h1>Game Added!</h1>
    </div>
  );

  const [chosenGame, setChosenGame] = useState<string>("League of Legends");
  const [teamOneWin, setTeamOneWin] = useState<boolean>(true);
  const [teamTwoWin, setTeamTwoWin] = useState<boolean>(true);
  const [gameLength, setGameLength] = useState<string>("");
  const [playerAmount, setPlayerAmount] = useState<number>(1);
  const [teamsAmount, setTeamsAmount] = useState<number>(2);
  const [datePlayed, setDatePlayed] = useState<string>("");
  const [teamName, setTeamName] = useState<string>("");
  const [enemyTeamName, setEnemyTeamName] = useState<string>("");
  const [finalResult, setFinalResult] = useState<string>("");
  const [player1, setPlayer1] = useState<string>("");
  const [player2, setPlayer2] = useState<string>("");
  const [player3, setPlayer3] = useState<string>("");
  const [player4, setPlayer4] = useState<string>("");
  const [player5, setPlayer5] = useState<string>("");
  const [enemyPlayer1, setEnemyPlayer1] = useState<string>("");
  const [enemyPlayer2, setEnemyPlayer2] = useState<string>("");
  const [enemyPlayer3, setEnemyPlayer3] = useState<string>("");
  const [enemyPlayer4, setEnemyPlayer4] = useState<string>("");
  const [enemyPlayer5, setEnemyPlayer5] = useState<string>("");
  const [overlayActive, setOverlayActive] = useState<boolean>(false);
  const [overlayContent, setOverlayContent] = useState<string>(`${overlay}
 `);

  const resetStates = () => {
    setChosenGame("League of Legends");
    setTeamOneWin(false);
    setTeamTwoWin(false);
    setGameLength("");
    setPlayerAmount(1);
    setTeamsAmount(2);
    setDatePlayed("");
    setTeamName("");
    setEnemyTeamName("");
    setFinalResult("");
    setPlayer1("");
    setPlayer2("");
    setPlayer3("");
    setPlayer4("");
    setPlayer5("");
    setEnemyPlayer1("");
    setEnemyPlayer2("");
    setEnemyPlayer3("");
    setEnemyPlayer4("");
    setEnemyPlayer5("");
  };

  const validate = () => {
    let requirements =
      (chosenGame.length > 0,
      gameLength.length > 0,
      datePlayed.length > 0,
      teamName.length > 0,
      enemyTeamName.length > 0,
      finalResult.length > 0,
      player1.length > 0,
      enemyPlayer1.length > 0);
    if (requirements) {
      return true;
    } else {
      overlay = (
        <div className="overlay">
          <h1>You need to fill out the required fields!</h1>
        </div>
      );
      console.log("requirements not met! :(");
      activateOverlay();
      return false;
    }
  };

  function onSubmit(e: any) {
    e.preventDefault();
    validate();
    console.log("checking requirements...");

    if (validate()) {
      console.log("required is true, adds match to array.");
      const matchesCopy = [...matches];

      let newMatch = {
        game: chosenGame,
        datePlayed: datePlayed,
        matchLength: gameLength,
        teamSize: playerAmount,
        teamAmount: teamsAmount,
        teamOneWin: teamOneWin,
        teamTwoWin: teamTwoWin,
        teamOne: {
          players: [player1, player2, player3, player4, player5],
          teamName: teamName,
        },
        teamTwo: {
          enemyPlayers: [
            enemyPlayer1,
            enemyPlayer2,
            enemyPlayer3,
            enemyPlayer4,
            enemyPlayer5,
          ],
          teamName: enemyTeamName,
        },
        matchKey: matches.length++,
        finalResult: finalResult,
      };
      matchesCopy.push(newMatch);
      setMatches(matchesCopy);
      resetStates();
      console.log("resetStates went smooth.");
      activateOverlay();
      console.log("overlay activated");
    }
  }

  function activateOverlay() {
    setOverlayActive(true);
    setTimeout(() => {
      setOverlayActive(false);
      console.log("overlay deactivated");
    }, 2000);
  }

  return (
    <main className="add-game-container">
      {overlayActive ? overlay : ""}
      <section className="formSection">
        <form onSubmit={(e) => onSubmit(e)}>
          <div className="general-form">
            <label htmlFor="choose-game">Choose Game:</label>
            <select
              name="game"
              value={chosenGame}
              onChange={(e: any) => setChosenGame(e.target.value)}
            >
              <option value="League of Legends">League of Legends</option>
              <option value="Multiversus">Multiversus</option>
              <option value="Counter Strike: Global Offensive">CS:GO</option>
              <option value="Scrabble">Scrabble</option>
            </select>

            <label htmlFor="teamOneResult">Team one result</label>
            <select
              name="teamOneResult"
              onChange={(e: any) => {
                if (e.target.value == "Win") {
                  setTeamOneWin(true);
                } else {
                  setTeamOneWin(false);
                }
              }}
            >
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
            </select>
            <label htmlFor="teamTwoResult">Team Two result</label>
            <select
              name="teamTwoResult"
              onChange={(e: any) => {
                if (e.target.value == "Win") {
                  setTeamTwoWin(true);
                } else {
                  setTeamTwoWin(false);
                }
              }}
            >
              <option value="Win">Win</option>
              <option value="Loss">Loss</option>
            </select>
            <label htmlFor="finalScore">Final score</label>
            <input
              className="halfWidth"
              placeholder="score-score"
              type="text"
              name="finalScore"
              onChange={(e: any) => {
                setFinalResult(e.target.value);
              }}
              required
            />
            <label htmlFor="teamSize">How long was the game?</label>
            <input
              className="halfWidth"
              placeholder="minutes:seconds"
              type="text"
              name="teamSize"
              onChange={(e: any) => {
                setGameLength(e.target.value);
              }}
              required
            />
            <label htmlFor="datePlayed">When was the game played?</label>
            <input
              className="halfWidth"
              placeholder="year-month-day eg. 2022-09-28"
              type="date"
              name="teamSize"
              onChange={(e: any) => {
                setDatePlayed(e.target.value);
              }}
              required
            />
            <label htmlFor="teamSize">
              How many players were in each team?
            </label>
            <select
              className="halfWidth"
              name="teamSize"
              onChange={(e: any) => {
                setPlayerAmount(e.target.value);
              }}
              required
            >
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
          </div>
          <div className="general-form">
            <label htmlFor="team">Team 1 name/Character name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayers"
              type="text"
              name="team"
              onChange={(e: any) => {
                setTeamName(e.target.value);
              }}
            />
            <label htmlFor="player1"> Player 1 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="player1"
              onChange={(e: any) => {
                setPlayer1(e.target.value);
              }}
            />
            <label htmlFor="player2"> Player 2 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="player2"
              onChange={(e: any) => {
                setPlayer2(e.target.value);
              }}
            />
            <label htmlFor="player3"> Player 3 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="player3"
              onChange={(e: any) => {
                setPlayer3(e.target.value);
              }}
            />
            <label htmlFor="player4"> Player 4 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="player4"
              onChange={(e: any) => {
                setPlayer4(e.target.value);
              }}
            />
            <label htmlFor="player5"> Player 5 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="player5"
              onChange={(e: any) => {
                setPlayer5(e.target.value);
              }}
            />
          </div>
          <div className="general-form">
            <label htmlFor="enemyTeam">Team 2 name/Character name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayers"
              type="text"
              name="enemyTeam"
              onChange={(e: any) => {
                setEnemyTeamName(e.target.value);
              }}
            />
            <label htmlFor="enemyPlayer1">Enemy Player 1 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="enemyPlayer1"
              onChange={(e: any) => {
                setEnemyPlayer1(e.target.value);
              }}
            />
            <label htmlFor="enemyplayer2">Enemy Player 2 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="enemyplayer2"
              onChange={(e: any) => {
                setEnemyPlayer2(e.target.value);
              }}
            />
            <label htmlFor="enemyplayer3">Enemy Player 3 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="enemyplayer3"
              onChange={(e: any) => {
                setEnemyPlayer3(e.target.value);
              }}
            />
            <label htmlFor="enemyplayer4">Enemy Player 4 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="enemyplayer4"
              onChange={(e: any) => {
                setEnemyPlayer4(e.target.value);
              }}
            />
            <label htmlFor="enemyplayer5">Enemy Player 5 name</label>
            <input
              className="halfWidth"
              placeholder="eg. noobslayer44"
              type="text"
              name="enemyplayer5"
              onChange={(e: any) => {
                setEnemyPlayer5(e.target.value);
              }}
            />
          </div>
          <div className="general-form">
            <button type="submit" className="buttonAdd">
              Submit your match
            </button>
          </div>
        </form>
        <button
          onClick={() => {
            resetStates();
          }}
        >
          Reset form
        </button>
      </section>
    </main>
  );
};

export default MatchForm;
