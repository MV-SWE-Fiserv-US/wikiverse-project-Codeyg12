import React from "react";

export const Page = ({ page, setSlug }) => {
  return (
    <>
      <h3
        onClick={() => setSlug(page.slug)}
        className="hover:text-2xl cursor-pointer"
      >
        {page.title}
      </h3>
    </>
  );
};
