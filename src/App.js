import React from "react";

import { VocabularyProvider } from "./context/vocabularyContext.js";

import "bootstrap/dist/css/bootstrap.min.css";
import ErrorBoundary from "./components/error/errorBoundary.js";
import Header from "./components/header/header";
import Search from "./components/search/search";

function App() {
  return (
    <ErrorBoundary>
      <VocabularyProvider>
        <div className="App">
          <Header />
          <main>
            <Search />
          </main>
          <footer></footer>
        </div>
      </VocabularyProvider>
    </ErrorBoundary>
  );
}

export default App;
