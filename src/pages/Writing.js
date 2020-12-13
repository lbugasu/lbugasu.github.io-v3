import React from "react";

import MainHeader from "../components/MainHeader";

export default function Writing() {
  const renderPost = () => {
    return (
      <>
        <MainHeader />
      </>
    );
  };

  return <div className="post">{renderPost()}</div>;
}
