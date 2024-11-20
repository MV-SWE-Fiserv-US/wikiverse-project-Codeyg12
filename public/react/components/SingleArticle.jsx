import { useEffect, useState } from "react";
import apiURL from "../api";

const SingleArticle = ({ slug, setSlug }) => {
  const [article, setArticle] = useState({
    title: "",
    author: { name: "" },
    createdAt: "",
    content: "",
    tags: [],
  });

  const fetchArticle = async () => {
    const res = await fetch(`${apiURL}/wiki/${slug}`);
    const data = await res.json();
    setArticle(data);
  };

  useEffect(() => {
    fetchArticle();
  }, []);

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US");
  };

  const deleteArticle = async () => {
    await fetch(`${apiURL}/wiki/${slug}`, {
      method: "DELETE",
    });
    location.reload();
  };

  return (
    <div className="self-center">
      <h3 className="font-bold text-2xl">{article.title}</h3>
      <p>
        <span className="font-bold mr-2">Author: </span>
        {article.author.name}
      </p>
      <p>
        <span className="font-bold mr-2">Published: </span>
        {formatDate(article.createdAt)}
      </p>
      <p>{article.content}</p>
      <div>
        <span className="font-bold">Tags: </span>
        <ul>
          {article.tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <button
          className="border border-black mr-2 px-2 mt-2 hover:bg-red-500 hover:border-slate-400 hover:text-slate-200"
          onClick={deleteArticle}
        >
          Delete
        </button>
        <button
          className="border border-black px-2 hover:bg-black hover:text-slate-200"
          onClick={() => setSlug("")}
        >
          Back to Wiki List
        </button>
      </div>
    </div>
  );
};

export default SingleArticle;
