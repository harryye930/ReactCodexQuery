import React from "react";
import { Link } from "react-router-dom";

export function PageNotFound() {
  return (
    <div className="pageNotFound">
      <h2>Oops! 404 Page not found</h2>
      <p>We can't seem to find the page you're looking for.</p>
      <Link to="/" className="goHomeBtn">
        Go Home
      </Link>
      <img
        className="pageNotFoundImg"
        src="https://img.freepik.com/free-vector/error-404-concept-landing-page_52683-12188.jpg?w=1380&t=st=1672677752~exp=1672678352~hmac=505145aafa8f70dcd1749bcbab59454625e601da767c4f50412f7213579347da"
        alt="404 Error"
      />
    </div>
  );
}
