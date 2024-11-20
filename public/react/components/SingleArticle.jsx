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
    <div>
      <h3>{article.title}</h3>
      <p>Author: {article.author.name}</p>
      <p>Published: {formatDate(article.createdAt)}</p>
      <p>{article.content}</p>
      <div>
        Tags:{" "}
        <ul>
          {article.tags.map((tag) => (
            <li key={tag.id}>{tag.name}</li>
          ))}
        </ul>
      </div>
      <div>
        <button onClick={deleteArticle}>Delete</button>
        <button onClick={() => setSlug("")}>Back to Wiki List</button>
      </div>
    </div>
  );
};

export default SingleArticle;
