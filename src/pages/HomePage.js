import React, { useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//import components
import {
  MainHeader,
  SecondaryHeader,
  PostPreview,
  Footer,
  Loading,
} from "../components";

import { getTags } from "../state/actions";
import { loadFeatureImage } from "../state/thunks";
import { getPosts, getFeatureImage } from "../state/selectors";

const HomePage = ({ posts, featuredImage, startLoadingFeaturedImage }) => {
  useEffect(() => {
    /**
     * If the featured Image has been loaded, don't load it again
     */
    if (!featuredImage.featuredImageLoaded) {
      startLoadingFeaturedImage();
    }
  }, []);

  const FeatureImage = () => {
    if (featuredImage.featuredImageLoading)
      return (
        // Default image if api is taking too long to load
        <Image
          style={{ width: "95%", padding: "10% 2% 0 0" }}
          src="https://lh3.googleusercontent.com/pw/ACtC-3eEjflJHC4Kx8jThjb-Q4a9Tr6V2bjqi8ebd6uOfY_6D6LCITYPw0emLU-3PKk-NgGCFoNP3Uwm336UREWQbSU0N-IgkqAgtaPka4WzFfuziuaDXRa-Xru3GMbahAe56gaagc14C_bo_V-OPHrbPstQvQ=w1266-h949-no"
        ></Image>
      );
    else
      return (
        <EyeEmImage>
          <figure>
            <FeaturedImage
              src={featuredImage.featuredImage}
              alt={"featured eye em"}
            />
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
    if (posts.postsLoading) return <Loading />;

    return posts.posts.slice(0, 7).map((singlePost, i) => (
      <>
        <PostPreview post={singlePost} divider={i !== 6} />
      </>
    ));
  };

  // Render the homepage

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
      <Footer />
    </Home>
  );
};
const mapStateToProps = (state) => ({
  featuredImage: getFeatureImage(state),
  posts: getPosts(state),
  tags: getTags(state),
});
const mapDispatchToProps = (dispatch) => ({
  startLoadingFeaturedImage: () => dispatch(loadFeatureImage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

/**
 * Styled components
 */

const Image = styled.img`
  width: 100%;
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
  @media only screen and (max-width: 900px) {
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
