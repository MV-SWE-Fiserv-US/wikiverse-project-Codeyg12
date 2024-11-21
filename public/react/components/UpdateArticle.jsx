import { useState } from "react";
import apiURL from "../api";

const UpdateArticle = ({ articleToBeUpdated, setIsUpdatingArticle }) => {
  const [article, setArticle] = useState({
    ...articleToBeUpdated,
    tags: articleToBeUpdated.tags.map((el) => el.name).join(" "),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${apiURL}/wiki/${article.slug}`, {
        method: "PUT",
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
      <form
        onSubmit={handleSubmit}
        className="flex flex-col w-1/2 justify-center self-center h-1/2 text-center px-24 gap-3"
      >
        <input
          type="text"
          id="title"
          name="title"
          placeholder="Title"
          value={article.title}
          onChange={(e) => setArticle({ ...article, title: e.target.value })}
        />
        <textarea
          id="content"
          name="content"
          placeholder="Content"
          value={article.content}
          onChange={(e) => setArticle({ ...article, content: e.target.value })}
        />
        <input
          type="text"
          id="tags"
          name="tags"
          placeholder="Tags"
          value={article.tags}
          onChange={(e) => setArticle({ ...article, tags: e.target.value })}
        />
        <button
          type="submit"
          className="border border-black rounded hover:bg-black hover:text-slate-200 py-2"
        >
          Submit
        </button>
      </form>
      <button
        onClick={() => setIsUpdatingArticle(false)}
        className="border border-black w-80 self-center mt-4 rounded hover:bg-black hover:text-slate-200 py-2"
      >
        Back to Wiki List
      </button>
    </>
  );
};
export default UpdateArticle;
