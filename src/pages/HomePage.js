import React, { lazy, Suspense, useEffect } from "react";
import styled from "styled-components";
import { connect } from "react-redux";

//import components
import {
  MainHeader,
  SecondaryHeader,
  Footer,
  Loading,
  ScrollToTopOnMount,
} from "../components";
import { getTags } from "../state/actions";
import { loadFeatureImage } from "../state/thunks";
import { getPosts, getFeatureImage } from "../state/selectors";

const PostPreview = lazy(() => import("../components/PostPreview"));

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
        <Suspense fallback={Loading}>
          <PostPreview post={singlePost} divider={i !== 6} />
        </Suspense>
      </>
    ));
  };

  // Render the homepage

  return (
    <Home>
      <ScrollToTopOnMount />
      <MainHeader />
      <SecondaryHeader />
      <HalfDiv>
        <FeatureImage />
        <Things>
          <p style={{ textAlign: "center", width: "100%" }}>
            Playlist of the week
          </p>
          <iframe
            src="https://open.spotify.com/embed/playlist/3VrLVBsCC66rmirKko0g0p"
            title={"African Passort"}
            width="100%"
            height="500"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
          ></iframe>

          <div style={{ padding: "56.25% 0 0 0", position: "relative" }}>
            <iframe
              src="https://player.vimeo.com/video/458472240?color=ffffff&title=0&byline=0&portrait=0"
              style={{
                position: "absolute",
                top: "0",
                left: "0",
                width: "100%",
                height: "100%",
              }}
              title="video of the week"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <script src="https://player.vimeo.com/api/player.js"></script>
          <p style={{ textAlign: "center" }}>
            <a href="https://vimeo.com/458472240">kai - A little too much</a>{" "}
            <span style={{ fontStyle: "italic" }}>from </span>
            <a href="https://vimeo.com/martinascarpelli">martina</a> on{" "}
            <a href="https://vimeo.com">Vimeo</a>.
          </p>
        </Things>
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
`;
const FeaturedImage = styled.img`
  width: 100%;
  height: auto;
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
  @media only screen and (max-width: 900px) {
    text-align: center;
  }
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
const Things = styled.div`
  margin: 0 2% 0 0;
`;
