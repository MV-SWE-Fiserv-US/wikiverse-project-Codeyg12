import apiURL from "../api";

const DeleteModal = ({ slug, setDeleteModal }) => {
  const deleteArticle = async () => {
    await fetch(`${apiURL}/wiki/${slug}`, {
      method: "DELETE",
    });
    location.reload();
  };

  return (
    <div className="border border-black justify-self-center p-16 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-lg rounded">
      <h4 className="text-2xl">
        Are you sure you want to delete this article?
      </h4>
      <div className="grid grid-cols-2 gap-2 relative mt-4">
        <button
          className="border border-black px-2 mt-2 hover:bg-blue-400 hover:border-slate-400 hover:text-slate-200"
          onClick={() => setDeleteModal(false)}
        >
          Cancel
        </button>
        <button
          className="border border-black px-2 mt-2 hover:bg-red-500 hover:border-slate-400 hover:text-slate-200"
          onClick={deleteArticle}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default DeleteModal;
