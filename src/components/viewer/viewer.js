import React, { useCallback, useEffect, useState } from "react";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Offcanvas,
  OffcanvasBody,
  OffcanvasHeader,
} from "reactstrap";
import { useVocabulary } from "../../context/vocabularyContext";

function Viewer() {
  const [open, setOpen] = useState(false);
  const [guessed, setGuessed] = useState(
    JSON.parse(localStorage.getItem("guessed")) || []
  );
  const [activeWord, setActiveWord] = useState("");
  const { vocabulary } = useVocabulary();
  const [streak, setStreak] = useState(
    parseInt(localStorage.getItem("streak")) || 0
  );
  const [flatData, setFlatData] = useState({});

  const getFlattenedData = useCallback(
    (word) => {
      return vocabulary[word || activeWord]?.meanings
        .map((i) => i.synonyms)
        .flat();
    },
    [activeWord, vocabulary]
  );

  const getRandomWord = () => {
    const filteredList = Object.keys(vocabulary).filter((j) => {
      return (
        !guessed.includes(j.toLowerCase()) &&
        getFlattenedData(j.toLowerCase()).length
      );
    });
    let randomNumber =
      Math.floor(Math.random() * (filteredList.length - 0 + 1)) + 0;
    setActiveWord(filteredList[randomNumber]);
    return activeWord;
  };

  const checkAnswer = (e) => {
    const answer = e.target[0].value;
    if (!answer) return;
    const result = flatData.includes(answer.toLowerCase());
    updateStreak(result, answer);
  };

  const updateStreak = (result) => {
    if (result) {
      let updatedGuessed = [...guessed, activeWord];
      let updatedStreak = streak + 1;
      setGuessed(updatedGuessed);
      setStreak(updatedStreak);
      console.log(vocabulary);
    } else {
      setStreak(0);
    }
  };
  useEffect(() => {
    getRandomWord();
    localStorage.setItem("streak", streak);
    localStorage.setItem("guessed", JSON.stringify(streak ? guessed : []));
  }, [streak, guessed, vocabulary, open]);

  useEffect(() => {
    setFlatData(getFlattenedData());
    console.log(vocabulary[activeWord]?.meanings.flat());
  }, [activeWord, vocabulary, open]);

  return (
    <div>
      <Button
        color="success"
        data-testid="guess-button"
        onClick={() => {
          console.log("clicked", vocabulary, activeWord, flatData);
          setOpen(true);
        }}
      >
        <span role="img" aria-label="Winning Streak">
          &#127942; Winning Streak {streak}
        </span>
      </Button>
      <Offcanvas
        isOpen={open}
        direction="end"
        scrollable
        toggle={() => {
          setOpen(false);
        }}
      >
        <OffcanvasHeader
          toggle={() => {
            setOpen(false);
          }}
        >
          Guess Game
        </OffcanvasHeader>
        {activeWord ? (
          <OffcanvasBody>
            <Form
              className="text-center"
              onSubmit={(e) => {
                e.preventDefault();
                checkAnswer(e);
              }}
            >
              <p className="display-1 text-center" data-testid="current-word">
                {activeWord}
              </p>

              <small> Streak: {streak}</small>
              <FormGroup>
                <label htmlFor="search">Enter any synonym of the word</label>
                <Input
                  type="search"
                  data-testid="guess-input"
                  name="search"
                  results={10}
                />
              </FormGroup>
              <Button type="primary">Submit</Button>
            </Form>
            <Button
              type="tertiary"
              onClick={() => {
                getRandomWord();
              }}
            >
              Regenerate
            </Button>
          </OffcanvasBody>
        ) : (
          <OffcanvasBody data-testid="no-results">
            <Alert color="info" isOpen={true}>
              That's all for now.
            </Alert>
          </OffcanvasBody>
        )}
      </Offcanvas>
    </div>
  );
}

export default Viewer;
