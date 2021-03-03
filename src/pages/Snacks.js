import React, { useEffect, useState } from "react";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getSnacks } from "../api/requests";
import {
  Footer,
  MainHeader,
  MarkDownBody,
  SecondaryHeader,
} from "../components";
import markdownHeadings from "markdown-headings";
import styled from "styled-components";
// Create a client
const queryClient = new QueryClient();

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Snacks />
    </QueryClientProvider>
  );
}
const Snacks = () => {
  const { isLoading, error, data } = useQuery("snacks", () => getSnacks());
  const [post, setPost] = useState("");

  const Body = () => {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      let snacks =
        data.data.data.repository.defaultBranchRef.target.file.object.entries;
      // Get only the markdown files
      snacks = snacks.filter(
        (snack) =>
          snack.name.substring(snack.name.length - 3) === ".md" &&
          snack.name !== "README.md"
      );

      setPost(snacks[0].object.text);

      const headings = snacks.map((snack) => {
        return markdownHeadings(snack.object.text)[0];
      });
      return (
        <div style={{ display: "flex" }}>
          <SideMenu>{showMenu(headings)}</SideMenu>
          <Content>
            <MarkDownBody body={post} />
          </Content>
        </div>
      );
    }
  };

  const showMenu = (headings) => {
    console.log(headings);
    return headings.map((heading) => (
      <SideTitle
        style={{
          backgroundColor:
            heading === markdownHeadings(post)[0] ? "var(--highlight)" : "",
        }}
      >
        {heading === markdownHeadings(post)[0] ? "▸ " : "• "}
        {heading.replace(/#/g, "").trim()}
      </SideTitle>
    ));
  };

  return (
    <>
      <MainHeader></MainHeader>
      <SecondaryHeader></SecondaryHeader>
      <Body></Body>
      <Footer></Footer>
    </>
  );
};

export default App;
const SideMenu = styled.div`
  width: 20%;
  display: inline-block;
  //   display: inline-flex;
  align-items: flex-start;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.3);
  margin: 0.5%;
  padding: 0.25%;
  border-radius: 10px;
`;
const Content = styled.div`
  width: 75%;
  display: inline-block;
`;
const SideTitle = styled.h3`
  font-family: adobe-caslon-pro, serif;
  font-size: 90%;
  border-radius: 7px;
  margin: 0.1%;
  padding: 1%;
`;
