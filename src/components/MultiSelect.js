import { selectMultiplayerMode } from "../client";

const MultiSelect = () => {
  return (
    <>
      <p>Choose single player or multiplayer.</p>
      <button onClick={selectMultiplayerMode}>Multiplayer</button>
      <button>Single Player</button>
    </>
  );
};

export default MultiSelect;
