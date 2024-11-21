import { useEffect, useState } from "react";
import apiURL from "../api";
import DeleteModal from "./DeleteModal";

const SingleArticle = ({
  slug,
  setSlug,
  setArticleToBeUpdated,
  setIsUpdatingArticle,
}) => {
  const [article, setArticle] = useState({
    title: "",
    author: { name: "" },
    createdAt: "",
    content: "",
    tags: [],
  });
  const [deleteModal, setDeleteModal] = useState(false);

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

  const startUpdate = () => {
    setIsUpdatingArticle(true);
    setArticleToBeUpdated(article);
    setSlug("");
  };

  return (
    <>
      <div className={"self-center " + (deleteModal && "blur-sm")}>
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
              <li key={tag.id} className="italic">
                #{tag.name}
              </li>
            ))}
          </ul>
        </div>
        <div className="grid grid-cols-2 grid-rows-2 gap-2 my-2">
          <button
            className="border border-black px-2 py-1 mt-2 hover:bg-red-500 hover:border-slate-400 hover:text-slate-200"
            onClick={() => setDeleteModal(true)}
          >
            Delete
          </button>
          <button
            className="border border-black px-2 mt-2 hover:bg-blue-400 hover:border-slate-400 hover:text-slate-200"
            onClick={startUpdate}
          >
            Edit
          </button>
          <button
            className="border border-black px-2 hover:bg-black hover:text-slate-200 col-span-full"
            onClick={() => setSlug("")}
          >
            Back to Wiki List
          </button>
        </div>
      </div>
      {deleteModal && (
        <DeleteModal slug={slug} setDeleteModal={setDeleteModal} />
      )}
    </>
  );
};

export default SingleArticle;
