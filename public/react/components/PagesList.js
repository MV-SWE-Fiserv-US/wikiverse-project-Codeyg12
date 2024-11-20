import React from "react";
import { Page } from "./Page";

export const PagesList = ({ pages, setSlug }) => {
  return (
    <>
      {pages.map((page, idx) => {
        return <Page page={page} key={idx} setSlug={setSlug} />;
      })}
    </>
  );
};
