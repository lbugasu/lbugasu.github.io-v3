import * as React from "react";
import $ from "jquery";

function SvgSendIcon({ typedSth }) {
  const commentArea = $("#content");

  return (
    <svg
      id="send-button"
      xmlns="http://www.w3.org/2000/svg"
      width={80}
      viewBox="0 0 375 225"
    >
      <defs>
        <clipPath id="SendIcon_svg__a">
          <path d="M33.008 24.164H342v178.5H33.008zm0 0" />
        </clipPath>
        <clipPath id="SendIcon_svg__b">
          <path d="M140 147h41v55.664h-41zm0 0" />
        </clipPath>
      </defs>
      <g clipPath="url(#SendIcon_svg__a)">
        <path
          d="M33.016 109.758L341.988 24.16l-96.304 178.477-88.782-59.492 184.63-118.688-194.915 116.68-12.039 59.992-23.574-66.27L341.5 24.441 106.746 130.344zm0 0"
          fillRule="evenodd"
          fill="#934713"
          fill-opacity={typedSth ? 1 : 0.5}
        />
      </g>
      <g clipPath="url(#SendIcon_svg__b)">
        <path
          d="M140.582 202.477l39.723-36.211-25.54-18.813zm0 0"
          fillRule="evenodd"
          fill="#934713"
          fill-opacity={typedSth ? 1 : 0.5}
        />
      </g>
    </svg>
  );
}

export default SvgSendIcon;
