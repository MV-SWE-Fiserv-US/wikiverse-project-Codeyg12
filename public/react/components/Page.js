import React from "react";

export const Page = ({ page, setSlug }) => {
  return (
    <>
      <h3 onClick={() => setSlug(page.slug)}>{page.title}</h3>
    </>
  );
};
