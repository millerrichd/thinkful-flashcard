import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
import Deck from "../Decks/Deck";
import ModifyDeck from "../Decks/ModifyDeck";
import ModifyCard from "../Cards/ModifyCard";
import Study from "../Decks/Study";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks/>
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <ModifyCard />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <ModifyCard />
          </Route>
          <Route path="/decks/new">
            <ModifyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <ModifyDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId">
            <Deck />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </>
  );
}

export default Layout;
