import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { MainHeader } from "../components";
let endpoint = "http://localhost:4000";

const ApprovalPage = () => {
  const [comments, setComments] = useState([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    const request = fetch(`${endpoint}/unapprovedcomments`, {
      method: "GET",
      mode: "cors",
      cache: "no-cache",
      credentials: "same-origin",
    });
    request.then((data) => {
      data.json().then((object) => {
        console.log(object);
        setComments(object.comments);
        setLoaded(true);
      });
    });
    // let data = request.json();
    // setComments(data.comments);
    // console.log(data.comments);
    return comments;
  }, []);
  async function approve(e, comment) {
    let parent = e.target.parentNode;
    parent.parentNode.style.display = "none";
    parent.classList.add("approved");
    const options = {
      method: "POST",
      body: JSON.stringify({
        id: comment._id,
      }),
      mode: "cors",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json",
      },
    };

    let request = await fetch(`${endpoint}/approvecomment`, options);
    request = await request.json();
    console.log(request);
  }
  function unapprove(comment) {}
  function deleteComment() {}
  const ApproveButton = styled.button`
    border: none;
    background-color: #9dcd5a;
    padding: 1%;
    border-radius: 5px;
    margin: 1%;
    :hover {
      cursor: pointer;
    }
  `;
  const UnapproveButton = styled.button`
    border: none;
    background-color: #ef3a5d;
    padding: 1%;
    border-radius: 5px;
    margin: 1%;
    :hover {
      cursor: pointer;
    }
  `;
  const Comment = styled.div`
    border: var(--hr-bg) 1px solid;
    margin-top: 4%;
    border-radius: 10px;
  `;
  const getComments = () => {
    if (loaded) {
      console.log(comments);
      return comments.map((comment) => (
        <Comment>
          <p style={{ padding: "1%" }} contentEditable="true">
            {comment.content}
          </p>
          <div style={{ textAlign: "center" }}>
            <ApproveButton type="button" onClick={(e) => approve(e, comment)}>
              ✓
            </ApproveButton>
            <UnapproveButton
              type="button"
              onClick={() => this.unapprove(comment)}
            >
              ✗
            </UnapproveButton>
          </div>
        </Comment>
      ));
    } else {
      return <div>nothing yet</div>;
    }
  };
  return (
    <div>
      <MainHeader />
      {getComments()}
    </div>
  );
};

export default ApprovalPage;
