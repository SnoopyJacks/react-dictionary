import React from "react";
import "./Phonetic.css";

export default function Phonetic(props) {
  if (props.phonetic) {
    return (
      <div className="Phonetic">
        <span className="text">{props.phonetic}</span>
      </div>
    );
  } else {
    return null;
  }
}