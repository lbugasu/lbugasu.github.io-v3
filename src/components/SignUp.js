import React, { useEffect, useState } from "react";
import CancelIcon from "@material-ui/icons/Cancel";
import styled from "styled-components";
import $ from "jquery";
import queryString from "query-string";
let prod = "https://laudebugs.tamaduni.org";
let dev = "http://localhost:4000";
let endpoint = dev;

const Form = styled.div`
  position: fixed;
  width: 30vw;
  height: 30vh;
  text-align: center;
  top: 40vh;
  left: 35vw;
  border-radius: 15px;
  color: var(--background-color);
  box-shadow: 5px 10px 10px var(--hr);
  background-color: var(--hr);
  z-index: 20;
  padding: 1%;
  @media only screen and (max-width: 900px) {
    width: 50vw;
    height: 30vh;
    text-align: center;
    top: 30vh;
    left: 25vw;
  }
  @media only screen and (max-width: 600px) {
    width: 80vw;
    height: 30vh;
    text-align: center;
    top: 20vh;
    left: 10vw;
  }
`;
const H2 = styled.h2`
  text-align: center;
`;
const Subtext = styled.p`
  text-align: center;
  font-style: italic;
  font-size: 80%;
`;
async function subscribe() {
  const sneakpeeks = $("#sneakpeeks").is(":checked");
  const newposts = $("#newposts").is(":checked");
  const name = $("#signupname").val();
  const email = $("#signupemail").val();

  const options = {
    method: "POST",
    body: JSON.stringify({
      name: name,
      email: email,
      newposts: newposts,
      sneakpeeks: sneakpeeks,
    }),
    mode: "cors",
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Content-Type": "application/json",
    },
  };
  const promise = await fetch(`${endpoint}/note`, options);
  const result = await promise.json();

  if (result.posted) {
    // setSubscribed(true)
    $("#signupform").css({ display: "none" });
  }
}
const SignUp = () => {
  /**
   * Referenced: https://stackoverflow.com/questions/4656843/get-querystring-from-url-using-jquery
   */
  function getUrlVars() {
    var vars = [],
      hash;
    var hashes = window.location.href
      .slice(window.location.href.indexOf("?") + 1)
      .split("&");
    for (var i = 0; i < hashes.length; i++) {
      hash = hashes[i].split("=");
      vars.push(hash[0]);
      vars[hash[0]] = hash[1];
    }
    return vars;
  }
  useEffect(() => {
    let params = getUrlVars();
    if (params.subscribe === "true") {
      $("#signupform").css({ display: "block" });
    }
  }, []);
  return (
    <Form id="signupform" style={{ display: "none" }}>
      <CancelIcon
        fontSize="large"
        style={{
          position: "absolute",
          top: "-5%",
          left: "95%",
          backgroundColor: "var(--background-color)",
          color: "var(--hr)",
          borderRadius: "25px",
          cursor: "pointer",
        }}
        onClick={() => {
          $("#signupform").css({ display: "none" });
        }}
      />
      <H2>Sign up for updates</H2>
      <section>
        <Label for="signupname">Name:</Label>
        <Input id="signupname"></Input>
      </section>
      <section>
        <Label for="signupemail">Email:</Label>
        <Input id="signupemail"></Input>
      </section>
      <section>
        <span style={{ paddingRight: "5%" }}>
          <input
            type="checkbox"
            id="newposts"
            name="newposts"
            value="New Posts"
          />
          <Item for="newposts">New Posts</Item>
        </span>
        <span>
          <input
            type="checkbox"
            id="sneakpeeks"
            name="sneakpeeks"
            // value="Sneak Peeks"
          />
          <Item for="newposts">Sneak Peeks</Item>
        </span>
      </section>
      <Button
        onClick={() => {
          subscribe();
        }}
      >
        Sign up!
      </Button>
      <Subtext>No spam - I promise!</Subtext>
    </Form>
  );
};
export default SignUp;

const Button = styled.span`
  text-align: center;
  color: var(--hr);
  padding: 0 1% 1% 1%;
  border-radius: 10px;
  margin: 10%;
  border-top: 1%;
  background-color: var(--background-color);
  :hover {
    cursor: pointer;
  }
`;
const Item = styled.label`
  font-size: 75%;
`;
const Input = styled.input`
  font-family: adobe-caslon-pro, serif;
  background-color: var(---bg);
  border: none;
  border-bottom: 1px solid var(--border);
  width: 60%;
  font-size: 75%;
  margin: 1% 1% 1% 5%;
  color: var(--background-color);

  :focus {
    outline: none;
  }
  @media only screen and (max-width: 600px) {
    width: 70%;
    font-size: 75%;
  }
`;
const Label = styled.label`
  font-style: italic;
  font-size: 75%;
  width: 10%;
  line-height: 1;
  display: inline-block;
  color: var(--background-color);

  @media only screen and (max-width: 600px) {
    width: 20%;
    font-size: 75%;
  }
`;
