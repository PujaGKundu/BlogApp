import { Link } from "react-router-dom";

function FeedNav(props) {
  return (
    <div className="article-heading">
      <ul className="flex">
        <li onClick={props.emptyTag}>
          <Link className={props.activeTag === "" && "active"} to="/">
            Global Feed
          </Link>
        </li>
        {props.activeTag && (
          <li>
            <Link className={props.activeTag === "active"} to="/">
              # {props.activeTag}
            </Link>
          </li>
        )}
      </ul>
      <hr />
    </div>
  );
}

export default FeedNav;
