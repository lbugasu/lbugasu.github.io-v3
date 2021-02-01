import React, { useEffect, useState, setState } from "react";
import styled from "styled-components";
import { connect } from "react-redux";
import { useFeed } from "../custom-hooks/";
import { loadFeatureImage } from "./thunks";
//import components
import { MainHeader, SecondaryHeader } from "../components";
import { Link } from "react-router-dom";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";
import { readableDate } from "../components/helpers";
import { usePosts } from "../custom-hooks/";
/**
 * Styled components
 */
const ImageFrame = styled.div`
  width: 28%;
  padding: 1%;
  display: inline-block;
  vertical-align: top;
  @media only screen and (max-width: 600px) {
    display: none;
  }
`;
const PhoneImage = styled.div`
  width: 100%;
  padding: 1%;
  display: none;
  vertical-align: top;
  @media only screen and (max-width: 600px) {
    display: block;
  }
`;
const Image = styled.img`
  width: 100%;
`;
const PostData = styled.div`
  width: 68%;
  margin-left: 1%;
  display: inline-block;
  @media only screen and (max-width: 600px) {
    width: 100%;
  }
`;
const PostPreview = styled.div`
  font-size: 14pt;
`;
const Title = styled.h2`
  @media only screen and (max-width: 600px) {
    font-size: 75%;
  }
`;
const Small = styled.small`
  font-size: 12pt;
`;
const EyeEmImage = styled.div`
  padding: 10% 2% 0 0;
  height: 100%;
`;
const FeaturedImage = styled.img`
  width: 100%;
`;
const Caption = styled.figcaption`
  font-size: 10pt;
  font-family: adobe-caslon-pro, serif;
  font-style: italic;
  text-align: center;
`;
const Tag = styled.span`
  padding: 1%;
  font-size: 14pt;
  @media only screen and (max-width: 600px) {
    font-size: 12pt;
  }
`;
const HomePage = ({ startLoadingFeaturedImage }) => {
  const [posts, isLoading] = usePosts();
  const [featureImage, setImageLink] = useState();
  const [loadingImage, setLoadingImageStatus] = useState(true);
  const [tags, setTags] = useState([]);
  useEffect(() => {
    startLoadingFeaturedImage();
  }, []);

  const FeatureImage = () => {
    if (loadingImage)
      return (
        // Default image if api is taking too long to load
        <></>
        // <Image
        //   style={{ width: "95%", padding: "10% 2% 0 0" }}
        //   src="https://lh3.googleusercontent.com/pw/ACtC-3eEjflJHC4Kx8jThjb-Q4a9Tr6V2bjqi8ebd6uOfY_6D6LCITYPw0emLU-3PKk-NgGCFoNP3Uwm336UREWQbSU0N-IgkqAgtaPka4WzFfuziuaDXRa-Xru3GMbahAe56gaagc14C_bo_V-OPHrbPstQvQ=w1266-h949-no"
        // ></Image>
      );
    else
      return (
        <EyeEmImage>
          <figure>
            <FeaturedImage src={featureImage} alt={"featured eye em"} />
            <Caption>
              <a
                href="https://www.eyeem.com/u/laudebugs"
                target="_blank"
                rel="noreferrer"
              >
                from EyeEm gallery
              </a>
            </Caption>
          </figure>
        </EyeEmImage>
      );
  };
  const renderPosts = () => {
    if (isLoading) return <p>Loading...</p>;

    const showTags = (tagList) => {
      return tagList.map(function (tag, i) {
        if (!tags.includes(tag)) {
          setTags([...tags, tag]);
        }
        return <Tag className={`tag ${tag}`}>{tag}</Tag>;
      });
    };
    return posts.slice(0, 10).map((post) => (
      <div className="postFrame">
        <ImageFrame>
          <Image
            src={post.fields.feature_image.fields.file.url}
            alt={post.fields.title}
          />
        </ImageFrame>

        <PostData>
          <Link
            key={"/writing/" + post.fields.slug}
            to={`${
              post.sys.contentType.sys.id === "project" ? "/dev/" : "/writing/"
            }${post.fields.slug}`}
            className="preview"
          >
            <Title>{post.fields.title}</Title>
            <Small>{readableDate(post.fields.date)}</Small>
            {showTags(post.fields.tags)}
            <PhoneImage>
              <Image
                src={post.fields.feature_image.fields.file.url}
                alt={post.fields.title}
              />
            </PhoneImage>
            {!!post.fields.description ? (
              <PostPreview>{post.fields.description}</PostPreview>
            ) : (
              <PostPreview
                dangerouslySetInnerHTML={{
                  __html:
                    documentToHtmlString(post.fields.body).substring(0, 200) +
                    "   ... ",
                }}
              ></PostPreview>
            )}
          </Link>
        </PostData>

        <hr className="divider" />
      </div>
    ));
  };

  const showPosts = () => {
    // Perhaps add animation to homepage when laoding
    if (isLoading) return <p>Loading</p>;
    // Render only the first three posts

    return posts.slice(0, 3).map((post) => (
      <div className="singlePost">
        <h4>{post.title}</h4>
        <h5>{post.pubDate.substring(0, 16)}</h5>
        <p>
          <a href={post.link}>Read➚</a>
        </p>
      </div>
    ));
  };
  // Render the homepage
  const Home = styled.div``;
  const Latest = styled.h2`
    font-family: adobe-caslon-pro, serif;
    font-weight: 400;
    font-style: italic;
    margin-left: 2%;
  `;
  const HalfDiv = styled.div`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    @media only screen and (max-width: 1200px) {
      width: 40%;
    }
    @media only screen and (max-width: 800px) {
      display: none;
    }
  `;
  const PostsDiv = styled.div`
    width: 50%;
    display: inline-block;
    vertical-align: top;
    @media only screen and (max-width: 1200px) {
      width: 60%;
    }
    @media only screen and (max-width: 900px) {
      width: 100%;
    }
  `;

  return (
    <Home>
      <MainHeader />
      <SecondaryHeader />
      <HalfDiv>
        <FeatureImage />
      </HalfDiv>
      <PostsDiv>
        <Latest>Latest</Latest>
        <div className="postlist">{renderPosts()}</div>
      </PostsDiv>
      {/* <Footer /> */}
    </Home>
  );
};
const mapStateToProps = (state) => ({
  featuredImage: state.featuredImage,
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingFeaturedImage: () => dispatch(loadFeatureImage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
