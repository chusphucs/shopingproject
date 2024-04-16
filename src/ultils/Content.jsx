import React from "react";

export default function Content({ content }) {
  return <div dangerouslySetInnerHTML={{ __html: content }} />;
}
