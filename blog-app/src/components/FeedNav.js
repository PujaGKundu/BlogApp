import { Link } from "react-router-dom";

function FeedNav(props) {
  return (
    <div className="article-heading">
      <ul className="flex">
        <li onClick={props.emptyTag}>
          <Link className={props.activeTag === "" && "active"} to="/">
            <h3>Global Feed</h3>
          </Link>
        </li>
        {props.activeTag && (
          <li>
            <Link className={props.activeTag === "active"} to="/">
              <h3># {props.activeTag}</h3>
            </Link>
          </li>
        )}
      </ul>
      <hr />
    </div>
  );
}

export default FeedNav;
