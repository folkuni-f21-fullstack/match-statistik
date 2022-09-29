import "./Match-Card.scss";
import { Match } from "../../../../models/matchInterface";
import { useState } from "react";
interface Props {
  match: Match;
}

const MatchCard = ({ match }: Props) => {
  let isLoL = match.game === "League of Legends";
  let matchCardClass = "match-card ";
  if (isLoL) matchCardClass += "LOL";
  else if (match.game === "Counter Strike: Global Offensive")
    matchCardClass += "CSGO";
  else if (match.game === "Multiversus") matchCardClass += "MV";
  else if (match.game === "Scrabble") matchCardClass += "SC";
  let isWin = "";
  if (match.win) {
    isWin = "victory";
  } else {
    isWin = "defeat";
  }
  const [visibleClass, setVisibleClass] = useState<boolean>(false);
  let versus = (
    <p>
      {match.teamOne.teamName} VS {match.teamTwo.teamName}
    </p>
  );
  let players = (
    <div className="players">
      <p>Your team: {match.teamOne.players.join(", ")}</p>
      <p>Enemy team: {match.teamTwo.enemyPlayers.join(", ")}</p>
    </div>
  );
  const btnContent = visibleClass ? "-" : "+";
  function showContent() {
    if (visibleClass) {
      setVisibleClass(false);
    } else {
      setVisibleClass(true);
    }
  }

  return (
    <article className={matchCardClass}>
      <div className="blur">
        <div className="game-stats">
          <div className="label">
            <h1>{match.game}</h1>
            <p className={isWin}>{match.win ? "Victory!" : "Defeat"}</p>
            <button className="btn" onClick={showContent}>
              {btnContent}
            </button>
          </div>
          {visibleClass ? (
            <div className="content visible">
              {versus}
              <p>Final score: {match.finalResult}</p>
              <p>Match length: {match.matchLength}</p>
              {players}
              <p>{match.datePlayed}</p>
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
    </article>
  );
};

export default MatchCard;
