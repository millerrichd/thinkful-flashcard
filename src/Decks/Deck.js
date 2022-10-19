import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck, deleteDeck } from "../utils/api"
import Cards from "../Cards/Cards";

function Deck() {
  const [ deck, setDeck ] = useState([]);

  const {deckId} = useParams();
  const history = useHistory();

  useEffect(() => {
    setDeck([]);
    async function GetDeck() {
      const data = await readDeck(deckId);
      setDeck(data);
    }
    GetDeck();
    return () => {
    }
  }, [deckId])
  
  const handleDeleteDeck = async (id) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if(result) {
      await deleteDeck(id);
      history.push("/");
    }
  };

  if(deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">{deck.name}</li>
          </ol>
        </nav>
        <div>
          <h3>{deck.name}</h3>
          <p>{deck.description}</p>
        </div>
        <div className="d-flex justify-content-between">
          <div>
            <Link className="btn btn-secondary mr-1" to={`/decks/${deckId}/edit`}>Edit</Link>
            <Link className="btn btn-primary mx-1" to={`/decks/${deckId}/study`}>Study</Link>
            <Link className="btn btn-primary ml-1" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
          </div>
          <Link className="btn btn-danger" to="#" onClick={() => handleDeleteDeck(deck.id)}>Delete</Link>
        </div>
        <h2 className="mt-4">Cards</h2>
        <Cards cards={deck.cards}/>
      </>
    );
  }
  return <h2>Loading...</h2>
}

export default Deck;