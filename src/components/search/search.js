import React, { useMemo, useRef, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  Container,
  Input,
  InputGroup,
  ListGroup,
  ListGroupItem,
  ListGroupItemHeading,
  ListGroupItemText,
  Row,
} from "reactstrap";
import { useVocabulary } from "../../context/vocabularyContext";
import SearchModal from "./searchModal";

import { API } from "../../lookup";
import "./search.scss";

function Search() {
  let timer = 0;
  const { vocabulary, updateVocabulary } = useVocabulary();
  const [loading, setLoading] = useState(false);
  const [haFocus, setHasFocus] = useState(false);
  const [activeData, setActiveData] = useState("");
  const [keyword, setKeyword] = useState("");
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef();
  const searches = Object.keys(vocabulary);

  const searchHandler = (e) => {
    let keyword = inputRef.current.value?.trim();
    console.log("query:", keyword);
    if (!keyword) {
      //alert("Please enter a valid word to search");
      console.log("keyword empty. exit");
      return false;
    }
    setLoading(true);
    console.log("loading set to", loading);
    if (vocabulary[keyword]) {
      displayModal(vocabulary[keyword]);
      return;
    }
    fetch(API.search + keyword)
      .then((r) => r.json())
      .then((d) => {
        if (d.message) {
          //Error handling
          alert(d.message);
        } else {
          d[0]["date"] = new Date().toDateString();
          updateVocabulary(keyword, d[0]);
          displayModal(d[0]);
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const displayModal = (data) => {
    setActiveData(data);
    setShowModal(true);
  };

  const filteredSearches = useMemo(
    () =>
      searches
        .filter((i) => i.toLowerCase().includes(keyword.toLowerCase()))
        .sort((a, b) => a.localeCompare(b)),
    [keyword, searches]
  );

  return (
    <Container>
      <Row>
        <Col
          className="mt-5"
          sm={12}
          md={{ size: 6, offset: 3 }}
          xl={{ size: 4, offset: 4 }}
        >
          <section style={{ position: "relative" }}>
            <InputGroup size="lg">
              <Input
                type="search"
                id="search-input"
                data-testid="search-input"
                results={10}
                disabled={loading}
                placeholder="Enter a word"
                ref={inputRef}
                onChange={(e) => {
                  if (timer) {
                    clearTimeout(timer);
                  }
                  timer = setTimeout(() => {
                    inputRef.current.value = e.target.value;
                    setKeyword(inputRef.current.value);
                  }, 500);
                }}
                onFocus={() => {
                  setHasFocus(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    searchHandler();
                  }
                }}
              />
              <Button
                data-testid="search-button"
                color="primary"
                onClick={(e) => {
                  searchHandler();
                }}
                disabled={loading}
              >
                <span role="img" aria-label="search">
                  &#128269;
                </span>{" "}
                Search
              </Button>
            </InputGroup>
            {haFocus && keyword && searches.length ? (
              <Card data-testid="search-results" id="search-results">
                <CardHeader>Previous Searches</CardHeader>
                <CardBody>
                  {filteredSearches.length ? (
                    <ListGroup flush>
                      {filteredSearches.map((key) => {
                        return (
                          <ListGroupItem
                            key={key}
                            role="button"
                            onClick={() => {
                              displayModal(vocabulary[key]);
                              setHasFocus(false);
                            }}
                          >
                            <ListGroupItemHeading>
                              <i>{vocabulary[key].word}</i>
                            </ListGroupItemHeading>
                            <ListGroupItemText>
                              {vocabulary[key].date}
                            </ListGroupItemText>
                          </ListGroupItem>
                        );
                      })}
                    </ListGroup>
                  ) : (
                    <div className="text-center">
                      <p className="">No previous match found.</p>
                    </div>
                  )}
                </CardBody>
              </Card>
            ) : (
              ""
            )}
          </section>

          {showModal && (
            <SearchModal
              show={showModal}
              data={activeData}
              onClose={() => {
                setShowModal(false);
              }}
            />
          )}
        </Col>
      </Row>
      <Row className="mt-5">
        {Object.keys(vocabulary).map((word, index) => {
          return (
            <Col key={word} sm={10} md={6} lg={4}>
              <Card
                className="m-2"
                color="light"
                style={{
                  width: "100%",
                  cursor: "pointer",
                }}
                onClick={() => {
                  displayModal(vocabulary[word]);
                }}
              >
                <CardBody>
                  <div className="p-5 display-5">{word}</div>
                </CardBody>
              </Card>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default Search;
