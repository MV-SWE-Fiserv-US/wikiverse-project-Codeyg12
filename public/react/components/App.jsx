import React, { useState, useEffect } from "react";
import { PagesList } from "./PagesList";
import SingleArticle from "./SingleArticle";
import NewArticle from "./NewArticle";

// import and prepend the api url to any fetch calls
import apiURL from "../api";
import UpdateArticle from "./UpdateArticle";
import SingleAuthor from "./SingleAuthor";

export const App = () => {
  const [pages, setPages] = useState([]);
  const [slug, setSlug] = useState("");
  const [articleToBeUpdated, setArticleToBeUpdated] = useState({});
  const [singleUser, setSingleUser] = useState(false);
  const [isAddingArticle, setIsAddingArticle] = useState(false);
  const [isUpdatingArticle, setIsUpdatingArticle] = useState(false);

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
    <main className="p-10 flex flex-col justify-center h-screen">
      <h1 className="text-5xl text-center mb-4">WikiVerse</h1>
      {slug ? (
        <SingleArticle
          slug={slug}
          setSlug={setSlug}
          setArticleToBeUpdated={setArticleToBeUpdated}
          setIsUpdatingArticle={setIsUpdatingArticle}
          setSingleUser={setSingleUser}
        />
      ) : isAddingArticle ? (
        <NewArticle setIsAddingArticle={setIsAddingArticle} />
      ) : isUpdatingArticle ? (
        <UpdateArticle
          articleToBeUpdated={articleToBeUpdated}
          setIsUpdatingArticle={setIsUpdatingArticle}
        />
      ) : singleUser ? (
        <SingleAuthor
          singleUser={singleUser}
          setSingleUser={setSingleUser}
          setSlug={setSlug}
        />
      ) : (
        <div className="self-center">
          <h2 className="text-2xl mb-4">An interesting 📚</h2>
          <PagesList pages={pages} setSlug={setSlug} />
          <button
            onClick={() => setIsAddingArticle(!isAddingArticle)}
            className="border-2 w-80 border-black rounded mt-4 hover:bg-black hover:text-slate-200"
          >
            Add an Article
          </button>
        </div>
      )}
    </main>
  );
};
