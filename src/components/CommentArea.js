import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import $ from "jquery";

import SendIcon from "./SendIcon";
import { sendComment, getComments } from "../state/thunks";
import { getPosts } from "../state/selectors";
import { readableDate, validateEmail } from "./helpers";
import Loading from "./Loading";
const Frame = styled.div`
  width: 75%;
  margin-top: 2.5%;
  margin: 3% 12.5% 0 12.5%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 850px) {
    width: 95%;
    margin-top: 2.5%;
    margin: 3% 2.5% 0 2.5%;
  }
`;

const InputArea = styled.div`
  margin: 1%;
  width: 48%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 850px) {
    width: 98%;
  }
`;
const PostedComments = styled.div`
  margin: 1%;
  width: 48%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 850px) {
    padding-top: 2.5%;
    width: 98%;
  }
`;

const H3 = styled.h3`
  font-size: 60%;
`;
const TextArea = styled.textarea`
  width: 100%;
  border: 0;
  background-color: var(--textarea-bg);
  border: none;
  :focus {
    outline: none;
  }
  border-radius: 25px;
  font-family: adobe-caslon-pro, serif;
  font-size: 75%;
  padding: 2.5%;
`;
const Input = styled.input`
  font-family: adobe-caslon-pro, serif;
  background-color: var(--textarea-bg);
  border: none;
  width: 80%;
  :focus {
    outline: none;
  }
`;
const Section = styled.section`
  margin: 1%;
`;
const Contact = styled.div`
  width: 73%;
  display: inline-block;
  vertical-align: top;
`;
const Send = styled.div`
  width: 23%;
  display: inline-block;
  vertical-align: middle;
  padding-top: 2%;
  text-align: center;
  :hover {
    cursor: pointer;
  }
`;
const Label = styled.label`
  font-style: italic;
  font-size: 80%;
  width: 20%;
  display: inline-block;
`;

const CommentArea = ({ posts, getPostComments, postComment, slug }) => {
  const [typedSth, setTypedSth] = useState(false);
  const [thisPost, setThisPost] = useState([]);
  useEffect(() => {
    if (posts.postsLoaded) {
      getPostComments(slug);
      let thisPost = posts.posts.find((post) => post.fields.slug === slug);
      setThisPost(thisPost);
      console.log(thisPost);
    }
  }, [posts.commentsLoaded]);
  const CommentText = styled.div`
    border-top: 0.5px solid var(--hr);
    padding: 1% 1% 0 1%;
    font-size: 90%;
  `;
  const MetaData = styled.div`
    font-size: 60%;
    text-align: right;
  `;
  const Date = styled.div`
    width: 30%;
    display: inline-block;
    font-style: italic;
  `;
  const User = styled.div`
    width: 40%;
    margin: 0 5% 0 2.5%;
    display: inline-block;
  `;
  const Stats = styled.div`
    width: 20%;
    display: inline-block;
  `;
  const ListOfComments = () => {
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
      setLoaded(thisPost.commentsLoaded);
    }, []);
    console.log("ppp: ");
    console.log(thisPost);

    if (loaded) {
      console.log(thisPost);
      console.log("zzz");
      return thisPost.comments.map((comment) => (
        <CommentText>
          {comment.content}
          <MetaData>
            <User style={{ textAlign: "left" }}>
              <span style={{ fontStyle: "italic" }}>by</span> {comment.user}
            </User>
            <Stats style={{ color: comment.approved ? "green" : "orange" }}>
              ●
            </Stats>
            <Date>-{readableDate(comment.createdAt)}</Date>
          </MetaData>
        </CommentText>
      ));
    } else {
      return <Loading size={0.3} />;
    }
  };
  /**
   * Listen to typing
   */
  const commentArea = $("#content");

  $(commentArea).on("input", function (e) {
    if (commentArea.val().length > 0) {
      setTypedSth(true);
    } else {
      setTypedSth(false);
    }
  });
  function sendAway() {
    console.log("send sth");
    if (typedSth) {
      const content = $("#content");
      const email = $("#email");
      const name = $("#name");

      if (validateEmail(email.val())) {
        postComment({
          slug: slug,
          email: email.val(),
          name: name.val(),
          comment: content.val(),
        });

        let btn = $("#send-button");
        // $(btn).addClass("send-comment");
        // Erase the text area
        content.val("");
        email.val("");
        name.val("");

        // reset typedSth state
        setTypedSth(false);
      }
    }
  }
  return (
    <Frame>
      <InputArea>
        <H3>Post a comment </H3>
        <TextArea id="content" cols={50} rows={4}></TextArea>
        <Contact>
          <Section>
            <Label for="name">Name: </Label>
            <Input id="name"></Input>
          </Section>
          <Section>
            <Label for="email" required>
              Email:{" "}
            </Label>
            <Input id="email"></Input>
          </Section>
        </Contact>
        <Send>
          <span onClick={() => sendAway()}>
            <SendIcon typedSth={typedSth}></SendIcon>
          </span>
        </Send>
      </InputArea>
      <PostedComments>
        <H3 style={{ textAlign: "right" }}>The people's thoughts</H3>
        <ListOfComments />
      </PostedComments>
    </Frame>
  );
};
const mapStateToProps = (state) => ({
  posts: getPosts(state),
});

const mapDispatchToProps = (dispatch) => ({
  getPostComments: (slug) => dispatch(getComments(slug)),
  postComment: (comment) => dispatch(sendComment(comment)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CommentArea);
