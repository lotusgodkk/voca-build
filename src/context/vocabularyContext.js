import React, { createContext, useContext, useEffect, useState } from "react";

const VocabularyContext = createContext({});

const VocabularyProvider = ({ children }) => {
  let cachedData = JSON.parse(localStorage.getItem("vocabulary")) || {};
  const [vocabulary, setVocabulary] = useState(cachedData);

  const updateVocabulary = (word, data) => {
    let updatedVocabulary = { ...vocabulary };
    updatedVocabulary[word] = data;
    return setVocabulary(updatedVocabulary);
  };
  useEffect(() => {
    localStorage.setItem("vocabulary", JSON.stringify(vocabulary));
  }, [vocabulary]);
  return (
    <VocabularyContext.Provider value={{ vocabulary, updateVocabulary }}>
      {children}
    </VocabularyContext.Provider>
  );
};

const useVocabulary = () => {
  return useContext(VocabularyContext);
};

export { VocabularyProvider, useVocabulary };
