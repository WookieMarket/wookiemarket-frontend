import { Link } from "react-router-dom";
import "./Page404.css";

const Page404 = () => {
  return (
    <div className="body-style">
      <section className="notFound">
        <div className="img">
          <img
            src="https://assets.codepen.io/5647096/backToTheHomepage.png"
            alt="Back to the Homepage"
          />
          <img
            src="https://assets.codepen.io/5647096/Delorean.png"
            alt="El Delorean, El Doc y Marti McFly"
          />
        </div>
        <div className="text">
          <h1>404</h1>
          <h2>PAGE</h2>
          <h2>NOT</h2>
          <h2>FOUND</h2>
          <h3>BACK TO </h3>
          <h3>HOME?</h3>
          <Link className="yes" to="/">
            Yes
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Page404;
