import React, { useEffect } from "react";

export default function Playground() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "../lib/three.js/build/three.js";
    script.async = true;
    // script.onload = () => this.scriptLoaded();
    console.log("THREE");
    // document.body.appendChild(script);
  }, []);

  return <div id="play"></div>;
}
