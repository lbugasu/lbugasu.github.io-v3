import React, { useState, useEffect } from "react";
import styled from "styled-components";
import $ from "jquery";
import { MainHeader, SendIcon } from "../components";
import { useSendNote } from "../custom-hooks";
import { validateEmail } from "../components/helpers";

let prod = "https://laudebugs.tamaduni.org";
let dev = "http://localhost:4000";
let endpoint = prod;

const Contact = () => {
  const [sent, setSent] = useState(0);
  const [nameEntered, setNameEntered] = useState(false);
  const [emailEntered, setEmailEntered] = useState(false);
  const [subjectEntered, setSubjectEntered] = useState(false);
  const [noteEntered, setNoteEntered] = useState(false);

  const messageArea = $("#message");
  const nameArea = $("#name");
  const emailArea = $("#email");
  const subjectArea = $("#subject");
  $(messageArea).on("input", () => {
    if (!noteEntered) {
      if (messageArea.val().length > 0) {
        setNoteEntered(true);
        console.log(noteEntered);
      }
    } else {
      if (messageArea.val().length === 0) {
        setNoteEntered(false);
        console.log(noteEntered);
      }
    }
  });
  $(nameArea).on("input", () => {
    if (!nameEntered) {
      if (nameArea.val().length > 0) {
        setNameEntered(true);
        console.log("name entered");
      }
    } else {
      if (nameArea.val().length === 0) {
        setNameEntered(false);
      }
    }
  });
  $(emailArea).on("input", () => {
    if (!emailEntered) {
      if (emailArea.val().length > 0 && validateEmail(emailArea.val())) {
        setEmailEntered(true);
      }
    } else {
      if (!(emailArea.val().length === 0 || validateEmail(emailArea.val()))) {
        setEmailEntered(false);
      }
    }
  });
  $(subjectArea).on("input", () => {
    if (!subjectEntered) {
      if (subjectArea.val().length > 0) {
        setSubjectEntered(true);
      }
    } else {
      if (subjectArea.val().length === 0) {
        setSubjectEntered(false);
      }
    }
  });
  async function sendNote() {
    console.log("yeus");

    const options = {
      method: "POST",
      body: JSON.stringify({
        name: nameArea.val(),
        email: emailArea.val(),
        subject: subjectArea.val(),
        note: messageArea.val(),
      }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };
    const promise = await fetch(`${endpoint}/note`, options);
    const result = await promise.json();
    setSent(result.posted);
  }
  const pageBody = () => {
    if (sent) {
      return (
        <ThankYou>
          Thank you for your message ✨
          <br />
          Look forward to reading it and getting back to you soon!
        </ThankYou>
      );
    } else {
      return (
        <WriteSth>
          <section>
            <Label for="subject">Subject:</Label>
            <Input id="subject"></Input>
          </section>

          <section>
            <Label for="name">Name:</Label>
            <Input id="name"></Input>
          </section>
          <section>
            <Label for="email">Email:</Label>
            <Input id="email"></Input>
          </section>

          <Textarea id="message" cols={50} rows={4}></Textarea>
          <span onClick={() => sendNote()}>
            <SendIcon
              typedSth={
                subjectEntered && emailEntered && nameEntered && noteEntered
              }
            />
          </span>
        </WriteSth>
      );
    }
  };

  return (
    <>
      <MainHeader />
      {pageBody()}
    </>
  );
};

export default Contact;

const ThankYou = styled.div`
  padding: 10% 10% 2% 10%;
  text-align: center;
`;
const Input = styled.input`
  font-family: adobe-caslon-pro, serif;
  background-color: var(---bg);
  color: var(--text);
  border: none;
  border-bottom: 1px solid var(--border);
  width: 60%;
  font-size: 100%;
  margin: 1%;
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
  font-size: 100%;
  width: 10%;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    width: 20%;
    font-size: 75%;
  }
`;
const Textarea = styled.textarea`
  width: 100%;
  border: 0;
  background-color: var(--textarea-bg);
  border: none;
  color: var(--text);
  :focus {
    outline: none;
  }
  border-radius: 10px;
  font-family: adobe-caslon-pro, serif;
  font-size: 100%;
  margin: 2%;
  padding: 2.5%;
`;
const WriteSth = styled.div`
  padding: 2% 10% 2% 10%;
  text-align: center;
  @media only screen and (max-width: 600px) {
    padding: 2.5%;
  }
`;
