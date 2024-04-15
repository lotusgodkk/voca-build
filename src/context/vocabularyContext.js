import React, { createContext, useContext, useEffect, useState } from "react";

const VocabularyContext = createContext({});

const VocabularyProvider = ({ children }) => {
  const [vocabulary, setVocabulary] = useState(() => {
    try {
      console.log("in try");
      return JSON.parse(localStorage.getItem("vocabulary")) ?? {};
    } catch {
      console.error("Cannot load cached value");
      return {};
    }
  });

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
