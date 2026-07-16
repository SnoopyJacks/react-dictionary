import { memo } from "react";
import "./Phonetic.css";

function Phonetic({ phonetic }) {
  if (!phonetic) {
    return null;
  }

  return (
    <p className="Phonetic">
      <span className="visually-hidden">Phonetic spelling: </span>
      <span>{phonetic}</span>{" "}
    </p>
  );
}

export default memo(Phonetic);