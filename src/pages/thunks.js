import {
  getFeatureImageInProgress,
  getFeatureImageSuccess,
  getFeatureImageFailure,
} from "./actions";
const cheerio = require("cheerio");
const got = require("got");
const url = "https://www.eyeem.com/u/laudebugs";

export const loadFeatureImage = () => (dispatch, getState) => {
  dispatch(getFeatureImageInProgress());
  got(url)
    .then((response) => {
      const $ = cheerio.load(response.body);
      const images = $("figure a img");

      const no_images = $("figure a img").length;
      const randomNo = Math.floor(Math.random() * no_images + 1);
      // select a random number between 0 and no_images-1
      dispatch(getFeatureImageSuccess(images[randomNo].attribs.src));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getFeatureImageFailure());
    });
};
