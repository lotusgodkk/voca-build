import React, { useState } from "react";
import { Button, Modal, ModalBody, ModalFooter, ModalHeader } from "reactstrap";
function SearchModal(props) {
  const { data, onClose } = props;
  const [modal, setModal] = useState(props.show);

  const hideModal = () => {
    setModal(false);
    onClose();
  };
  return data ? (
    <Modal isOpen={modal} toggle={hideModal} data-testid="results-modal">
      <ModalHeader toggle={hideModal}>Word Dictionary</ModalHeader>
      <ModalBody>
        <h2>{data.word}</h2>
        {data.phonetics.map((phonetic, index) => {
          return phonetic.audio ? (
            <p
              className="d-flex align-items-center justify-content-between"
              key={index + phonetic.phonetic}
            >
              <span>{phonetic.text}</span>

              <audio controls>
                <source src={phonetic.audio} type="audio/mpeg" />
                Your browser does not support the audio element.
              </audio>
            </p>
          ) : null;
        })}
        {data?.meanings.length &&
          data.meanings.map((j, index) => (
            <div key={index + j.partOfSpeech}>
              <h4>{j.partOfSpeech}</h4>
              <ol key={index}>
                {j.definitions.length &&
                  j.definitions.map((i) => (
                    <li key={i.definition}>
                      <i>{i.definition}</i>
                      {!!i.antonyms.length && (
                        <p>
                          <small>
                            <strong>Antonyms</strong>: {i.antonyms.join(", ")}
                          </small>
                        </p>
                      )}
                      {!!i.synonyms.length && (
                        <p>
                          <small>
                            <strong>Synonyms</strong>: {i.synonyms.join(", ")}
                          </small>
                        </p>
                      )}
                      {!!i.example && (
                        <p>
                          <small>
                            <strong>Example</strong>: <i>{i.example}</i>
                          </small>
                        </p>
                      )}
                    </li>
                  ))}
              </ol>
              <hr />
              {!!j.antonyms.length && (
                <>
                  <h5>Antonyms</h5>
                  <p>{j.antonyms.join(", ")}</p>
                </>
              )}
              {!!j.synonyms.length && (
                <>
                  {" "}
                  <h5>Synonyms</h5>
                  <p className="break-word">{j.synonyms.join(", ")}</p>
                </>
              )}
            </div>
          ))}
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={hideModal}>
          Close
        </Button>
      </ModalFooter>
    </Modal>
  ) : (
    ""
  );
}

export default SearchModal;
