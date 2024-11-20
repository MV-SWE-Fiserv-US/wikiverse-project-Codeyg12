import { useState } from "react";
import apiURL from "../api";

const NewArticle = ({ setIsAddingArticle }) => {
  const [article, setArticle] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/wiki`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(article),
      });
      if (res.ok) {
        location.reload();
      }
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <label htmlFor="content">Content</label>
        <textarea
          id="content"
          name="content"
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={(e) => setArticle({ ...article, name: e.target.value })}
        />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={(e) => setArticle({ ...article, email: e.target.value })}
        />
        <label htmlFor="tags">Tags</label>
        <input
          type="text"
          id="tags"
          name="tags"
          onChange={(e) => setArticle({ ...article, tags: e.target.value })}
        />
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => setIsAddingArticle(false)}>
        Back to Wiki List
      </button>
    </>
  );
};
export default NewArticle;
