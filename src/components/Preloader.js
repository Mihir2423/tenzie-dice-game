import React from "react"
export default function Preloader() {
    var loader = document.getElementById("preloader");
  window.addEventListener("load", function () {
    loader.style.display = "none";
  });
    return (
        <>
            <div id="preloader"></div>
        </>
    )
}