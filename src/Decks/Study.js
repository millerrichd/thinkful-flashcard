import React, { useState, useEffect } from "react";
import { useParams, Link, useHistory } from "react-router-dom";

import { readDeck } from "../utils/api"

function Study() {
  const [ deck, setDeck ] = useState([]);
  const [ currentCard, setCurrentCard ] = useState({});
  const [ frontSide, setFrontSide] = useState(true);
  const [ cardsLength, setCardsLength ] = useState(0);
  const [ currentIndex, setCurrentIndex ] = useState(0);

  const {deckId} = useParams();
  const history = useHistory();

  useEffect(() => {
    setDeck([]);
    async function GetDeck() {
      const data = await readDeck(deckId);
      setDeck(data);
      setCurrentCard(data.cards[currentIndex]);
      setCardsLength(data.cards.length);
    }
    GetDeck();
    return () => {
    }
  }, [deckId, currentIndex])

  const handleFlip = () => {
    setFrontSide(!frontSide);
  }

  const handleNext = () => {
    if(currentIndex === (cardsLength - 1)) {
      const result = window.confirm("Restart?\n\nClick 'cancel' to return to the home page.");
      if(result) {
        setCurrentCard(deck.cards[0]);
        setCurrentIndex(0)
        setFrontSide(!frontSide);
      } else {
        history.push("/")
      }
    } else {
      setCurrentCard(deck.cards[currentIndex + 1]);
      setCurrentIndex(currentIndex + 1)
      setFrontSide(!frontSide);
    }
  }

  if(deck) {
    return (
      <>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item">{deck.name}</li>
            <li className="breadcrumb-item active" aria-current="page">Study</li>
          </ol>
        </nav>
        <div>
          <h2>Study: {deck.name}</h2>
        </div>
        { cardsLength < 3 ? (
          <>
            <h3>Not enough cards.</h3>
            <p>You need at least 3 cards to study. There are {cardsLength} in this deck.</p>
            <Link className="btn btn-primary ml-1" to={`/decks/${deckId}/cards/new`}>Add Cards</Link>
          </>
        ) : (
          <div className="card">
            <div className="card-body">
              <h3>Card {currentIndex + 1} of {cardsLength}</h3>
              { frontSide ? (
                <p className="card-text">{currentCard.front}</p>
              ) : (
                <p className="card-text">{currentCard.back}</p>
              )}            
              <div className="d-flex justify-content-start">
                <Link className="btn btn-secondary mr-1" to="#" onClick={handleFlip}>Flip</Link>
                { !frontSide ? (
                  <Link className="btn btn-primary ml-1" to="#" onClick={handleNext}>Next</Link>
                ) : (
                  <div></div>
                )}
              </div>
            </div>
          </div>
        )}
      </>
    );
  }
  return <h2>Loading...</h2>
}

export default Study;