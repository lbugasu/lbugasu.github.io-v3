import React from "react";
import WritingHeader from "../components/WritingHeader";
import WritingFooter from "../components/WritingFooter";
import { documentToHtmlString } from "@contentful/rich-text-html-renderer";

import { Link } from "react-router-dom";

import { useTaggedPost } from "../custom-hooks";
import { readableDate } from "../components/helpers";
import FeaturedContent from "../components/FeaturedContent";
export default function Writing() {
  const [post, isLoading] = useTaggedPost("featured");

  const feature = post;
  const renderPost = () => {
    if (isLoading) return <p>Loading...</p>;
    return (
      <>
        <WritingHeader />
        <hr className="menuLines" />

        <div className="content">
          <h3 className="featureTitle">Feature</h3>

          <div className="posts">
            <div className="feature">
              <div className="featureTitle">
                <Link
                  key={"/writing/" + feature.slug}
                  to={"/writing/" + feature.slug}
                  className="preview"
                >
                  <h1 className="featureTitle">{feature.title}</h1>
                  <small>{readableDate(feature.date)}</small>
                  <div className="featuredimage">
                    <img
                      src={feature.feature_image.fields.file.url}
                      alt={feature.title}
                    />
                  </div>
                  <div
                    className="featureContent"
                    dangerouslySetInnerHTML={{
                      __html:
                        documentToHtmlString(feature.body).substring(0, 500) +
                        " ... ",
                    }}
                  ></div>
                </Link>
              </div>
            </div>
            <hr className="feat"></hr>
            <FeaturedContent />
          </div>
        </div>
        <div className="playlist">
          <h2 className="playlist">playlist</h2>
          <iframe
            src="https://player.vimeo.com/video/465205943?color=ffffff&badge=0"
            frameBorder="0"
            allow="autoplay; fullscreen"
            allowFullScreen
            title="Echoes"
            width="100%"
          ></iframe>
          <p>
            <a href="https://vimeo.com/425396315">Echoes</a> from{" "}
            <a href="https://vimeo.com/julianmarshall">Tucker Morrison</a> on{" "}
            <a href="https://vimeo.com">Vimeo</a>.
          </p>
          <iframe 
            src="https://open.spotify.com/embed-podcast/episode/1iDzfqn3ydQSxgfai96sYR" 
            width="100%" 
            height="160" 
            frameborder="0" a
            llowtransparency="true" 
            allow="encrypted-media"
            title="Rev. Otis Moss IIIThe Sound of the Genuine: Traversing 2020 with ‘the Mystic of the Movement’ Howard Thurman"
            ></iframe>
          <iframe
            src="https://open.spotify.com/embed-podcast/episode/0RE4gudofJJOSt8mmldOkT"
            width="100%"
            height="160"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="The Long Hot Summer"
          ></iframe>
          <iframe
            src="https://open.spotify.com/embed-podcast/episode/4Nu3MqXpYurA5y7s6aL0vq"
            width="100%"
            height="160"
            frameborder="0"
            allowtransparency="true"
            allow="encrypted-media"
            title="Making Amends"
          ></iframe>
        </div>
        <WritingFooter />
      </>
    );
  };

  return <div className="post">{renderPost()}</div>;
}
