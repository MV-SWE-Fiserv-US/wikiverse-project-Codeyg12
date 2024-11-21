import { useEffect, useState } from "react";
import apiURL from "../api";

const SingleAuthor = ({ singleUser, setSingleUser, setSlug }) => {
  const [author, setAuthor] = useState({
    title: "",
    name: "",
    slug: "",
    pages: [],
  });
  const fetchUser = async () => {
    try {
      const res = await fetch(`${apiURL}/users/${singleUser}`);
      const data = await res.json();
      setAuthor(data);
    } catch (err) {
      console.log("Oh no an error! ", err);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  const returnToHome = () => {
    setSingleUser(false);
    setSlug("");
  };

  return (
    <div className="self-center">
      <h2 className="text-2xl mb-4">{author.name}'s Pages 📚</h2>
      {author.pages.length > 0 ? (
        author.pages.map((page) => (
          <div key={page.id}>
            <h3
              onClick={() => setSlug(page.slug)}
              className="hover:text-2xl cursor-pointer"
            >
              {page.title}
            </h3>
          </div>
        ))
      ) : (
        <p>No pages available for this author.</p>
      )}
      <button
        className="border-2 w-80 border-black rounded mt-4 hover:bg-black hover:text-slate-200"
        onClick={returnToHome}
      >
        Back to Wiki List
      </button>
    </div>
  );
};

export default SingleAuthor;
