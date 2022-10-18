import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function Cards({cards = []}) {
  const handleDeleteDeck = async (id) => {
    const result = window.confirm("Delete this card?\n\nYou will not be able to recover it.");
    if(result) {
      console.log(`!!! TODO !!! Delete Card: ${id}`);
    }
  };


  console.log(cards);
  if(cards) {
    return (
      <>
        {cards.map((card) => (
          <div className="card" key={card.id}>
          <div className="card-body">
            <div className="d-flex justify-content-between">
              <p className="card-text">{card.front}</p>
              <p className="card-text">{card.back}</p>
            </div>
            <div className="d-flex justify-content-end">
              <Link className="btn btn-secondary mr-1" to={`/decks/${card.deckId}/cards/${card.id}/edit`}>Edit</Link>
              <Link className="btn btn-danger ml-1" to="#" onClick={() => handleDeleteDeck(card.id)}>Delete</Link>
            </div>
          </div>
        </div>
        ))}
      </>
    )
  }
  return <h2>Loading...</h2>
}

export default Cards;