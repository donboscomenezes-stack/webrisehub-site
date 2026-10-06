export default function GameVisual({ game }: { game: { title: string; accent: string } }) {
  const title = game.title.toUpperCase();
  return (
    <div className={`game-art game-art-${game.accent}`} aria-hidden="true">
      <div className="art-grid" />
      {title === "TANK ARENA" ? (
        <div className="tank-art" aria-hidden="true">
          <span className="tank-shell" />
          <span className="tank-blast" />
          <span className="tank-unit tank-unit-red"><i /></span>
          <span className="tank-unit tank-unit-blue"><i /></span>
          <div>
            <b>TANK ARENA</b>
            <small>1V1 TO 5V5 · BOTS · 6 WEAPONS</small>
          </div>
        </div>
      ) : title === "LET IT GROW" ? (
        <div className="farm-art" aria-hidden="true">
          <span className="farm-sun" />
          <span className="farm-hill farm-hill-back" />
          <span className="farm-hill farm-hill-front" />
          <span className="farm-road" />
          <span className="farm-house" />
          <span className="farm-tree farm-tree-one" />
          <span className="farm-tree farm-tree-two" />
          <div>
            <b>LET IT GROW</b>
            <small>DRIVE · EARN · BUILD</small>
          </div>
        </div>
      ) : title === "LITTLE EXPLORER" ? (
        <div className="explorer-art" aria-hidden="true">
          <span className="explorer-sun" />
          <span className="explorer-hill explorer-hill-back" />
          <span className="explorer-hill explorer-hill-front" />
          <span className="explorer-castle" />
          <i className="explorer-spark explorer-spark-one" />
          <i className="explorer-spark explorer-spark-two" />
          <i className="explorer-spark explorer-spark-three" />
          <div>
            <b>LITTLE EXPLORER</b>
            <small>EXPLORE · PLAY · DISCOVER</small>
          </div>
        </div>
      ) : title === "WHERE AM I?" ? (
        <div className="where-am-i-art" aria-hidden="true">
          <span className="geo-reticle"><i /></span>
          <span className="geo-pin geo-pin-one" />
          <span className="geo-pin geo-pin-two" />
          <div>
            <b>WHERE AM I?</b>
            <small>LOOK · PIN · DISCOVER</small>
          </div>
        </div>
      ) : title === "WILD ARENA" ? (
        <div className="wild-arena-art" aria-hidden="true">
          <span className="wild-storm" />
          <span className="wild-fighter wild-fighter-one" />
          <span className="wild-fighter wild-fighter-two" />
          <i className="wild-blade" />
          <b>LAST ONE STANDING</b>
        </div>
      ) : title === "LOCK IN" ? (
        <div className="lock-in-art" aria-hidden="true">
          <span className="lock-in-ring" />
          <span className="lock-in-target" />
          <span className="lock-in-marker" />
          <b>LOCK IN</b>
        </div>
      ) : title === "CELL RUSH" ? (
        <div className="cell-rush-art" aria-hidden="true">
          <span className="cell-rush-player">CELL</span>
          <span className="cell-rush-rival" />
          <i className="cell-food cell-food-one" />
          <i className="cell-food cell-food-two" />
          <i className="cell-food cell-food-three" />
          <b>RUSH</b>
        </div>
      ) : title === "WORD LOCK" ? (
        <div className="word-lock-art" aria-hidden="true">
          {["W", "O", "R", "D", "S"].map((letter, index) => (
            <span className={`word-lock-tile word-lock-tile-${index + 1}`} key={letter}>{letter}</span>
          ))}
        </div>
      ) : title === "CIRCLE GAME" ? (
        <div className="circle-art" aria-hidden="true">
          <span />
          <b />
        </div>
      ) : title === "CHESS" ? (
        <div className="chess-art" aria-hidden="true">
          {["♜", "♞", "♝", "♛", "♚", "♟"].map((piece, index) => (
            <span key={`${piece}-${index}`}>{piece}</span>
          ))}
        </div>
      ) : title === "X0 ARENA" ? (
        <div className="x0-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <b>X</b>
          <b>0</b>
        </div>
      ) : title === "GETAWAY" ? (
        <div className="getaway-art" aria-hidden="true">
          <span className="getaway-road" />
          <span className="getaway-car getaway-car-player" />
          <span className="getaway-car getaway-car-police" />
          <i />
          <i />
        </div>
      ) : title === "DON'T TOUCH RED" ? (
        <div className="red-art" aria-hidden="true">
          <span className="red-hazard red-hazard-left" />
          <span className="red-hazard red-hazard-right" />
          <b className="red-player" />
          <i className="red-trail" />
        </div>
      ) : title === "STACK" ? (
        <div className="stack-art" aria-hidden="true">
          <span />
          <span />
          <span />
          <span />
          <span />
        </div>
      ) : (
        <div className="build-art" aria-hidden="true">
          <span />
          <span />
          <span />
        </div>
      )}
    </div>
  );
}

