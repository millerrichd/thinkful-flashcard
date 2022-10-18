import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";

import { listDecks } from "../utils/api";

function Decks() {
  const [decks, setDecks] = useState([])

  useEffect(() => {
    setDecks([]);

    async function getDecks() {
      const data = await listDecks()
      setDecks(data);
    }
    getDecks();
    return () => {
      console.log("cleanup called, but nothing to do yet...");
    }
  }, [])

  const handleDeleteDeck = async (id) => {
    const result = window.confirm("Delete this deck?\n\nYou will not be able to recover it.");
    if(result) {
      console.log(`!!! TODO !!! Delete Deck: ${id}`);
    }
  };

  if(decks) {
    return (
      <>
        <Link className="btn btn-secondary my-3" to="/decks/new">Create Deck</Link>
        {decks.map((deck) => (
          <div className="card" key={deck.id}>
            <div className="card-body">
              <h5 className="card-title">{deck.name}</h5>
              <p className="card-text">{deck.description}</p>
              <div className="d-flex justify-content-between">
                <div>
                  <Link className="btn btn-secondary mr-1" to={`/decks/${deck.id}`}>View</Link>
                  <Link className="btn btn-primary ml-1" to={`/decks/${deck.id}/study`}>Study</Link>
                </div>
                <Link className="btn btn-danger" to="#" onClick={() => handleDeleteDeck(deck.id)}>Delete</Link>
              </div>
            </div>
          </div>
        ))}
      </>
    )
  }
  return <h2>Loading...</h2>
}

export default Decks