import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import SingleArticle from "./SingleArticle";
import NewArticle from "./NewArticle";

// import and prepend the api url to any fetch calls
import apiURL from "../api";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [slug, setSlug] = useState("");
  const [isAddingArticle, setIsAddingArticle] = useState(false);

  async function fetchPages() {
    try {
      const response = await fetch(`${apiURL}/wiki`);
      const pagesData = await response.json();
      setPages(pagesData);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  }

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <main>
      <h1>WikiVerse</h1>
      {slug ? (
        <SingleArticle slug={slug} setSlug={setSlug} />
      ) : isAddingArticle ? (
        <NewArticle setIsAddingArticle={setIsAddingArticle} />
      ) : (
        <>
          <h2>An interesting 📚</h2>
          <PagesList pages={pages} setSlug={setSlug} />
          <button onClick={() => setIsAddingArticle(!isAddingArticle)}>
            Add an Article
          </button>
        </>
      )}
    </main>
  );
};
