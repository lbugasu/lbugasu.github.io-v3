import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";

import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { getSnacks } from "../api/requests";
import {
  Footer,
  MainHeader,
  MarkDownBody,
  SecondaryHeader,
  SnacksBanner,
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

  let slug = "";
  if (window.location.href.split("?").length > 1) {
    slug = window.location.href.split("?")[1].split("=")[1];
  }
  const Body = () => {
    if (isLoading) {
      return <div>Loading</div>;
    } else {
      if (error) {
        console.log(error.message);
      }
      let snacks = data;
      console.log(snacks);

      const headings = snacks.map((snack) => {
        return markdownHeadings(snack.body)[0];
      });
      setPost(() => {
        let particular =
          headings.indexOf(decodeURIComponent(slug).trim()) !== -1;

        let snack = snacks.find((snack) => {
          let heading = markdownHeadings(snack.body)[0];
          return heading === decodeURIComponent(slug).trim();
        });
        return particular ? snack.body : snacks[0].body;
      });

      return (
        <Page>
          <SideMenu>{showMenu(headings)}</SideMenu>
          <Content>
            <MarkDownBody body={post} />
          </Content>
        </Page>
      );
    }
  };
  const readSnack = (snack) => {
    console.log(snack);
    setPost(snack);
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
        <Link to={`/snacks?article=${heading}`}>
          {heading === markdownHeadings(post)[0] ? "▸ " : "• "}
          {heading.replace(/#/g, "").trim()}
        </Link>
      </SideTitle>
    ));
  };

  return (
    <div>
      <MainHeader></MainHeader>
      <SecondaryHeader></SecondaryHeader>
      <SnacksBanner />
      <Body></Body>
      <Footer></Footer>
    </div>
  );
};

export default App;
const SideMenu = styled.div`
  width: 20%;
  display: inline-block;
  align-items: flex-start;
  justify-content: space-around;
  background-color: rgba(255, 255, 255, 0.2);
  margin: 0.5%;
  padding: 0.25%;
  border-radius: 10px;
  height: 100%;
`;
const Content = styled.div`
  width: 75%;
  padding: 0 5% 0 5%;
  display: inline-block;
`;
const SideTitle = styled.h3`
  font-family: var(--body-font);
  font-size: 90%;
  border-radius: 7px;
  margin: 0.1%;
  padding: 1%;
  :hover {
    cursor: pointer;
  }
`;
const Page = styled.div`
  display: flex;
  flex-direction: row;
`;
