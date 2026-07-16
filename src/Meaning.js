import React from "react";
import Synonyms from "./Synonyms";
import "./Meaning.css";

function Meaning({ meaning, headingId }) {
  if (!meaning) {
    return null;
  }

  return (
    <article className="Meaning" aria-labelledby={headingId}>
      <h3 id={headingId}>{meaning.partOfSpeech || "Meaning"}</h3>

      {meaning.definition && <p className="definition">{meaning.definition}</p>}

      {meaning.example && (
        <blockquote className="example">
          <p>{meaning.example}</p>
        </blockquote>
      )}

      <Synonyms synonyms={meaning.synonyms} />
    </article>
  );
}

export default memo(Meaning);


