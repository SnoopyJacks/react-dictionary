import React from "react";
import './Dictionary.css';

export default function Dictionary() {
  return <div className="Dictionary">
    <section>
      <h2>What word do you want to look up?</h2>
      <form>
        <input type="search" placeholder="Type a word..." />
      </form>
    </section>
  </div>;
}