import React from "react";
import { Switch, Route } from "react-router-dom";

import Header from "./Header";
import NotFound from "./NotFound";
import Decks from "../Decks/Decks";
import Deck from "../Decks/Deck";
import ModifyDeck from "../Decks/ModifyDeck";

function Layout() {
  return (
    <>
      <Header />
      <div className="container">
        <Switch>
          <Route exact path="/">
            <Decks/>
          </Route>
          <Route path="/decks/new">
            <ModifyDeck />
          </Route>
          <Route path="/decks/:deckId/edit">
            <ModifyDeck />
          </Route>
          <Route path="/decks/:deckId/study">
            <p>Study??</p>
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
