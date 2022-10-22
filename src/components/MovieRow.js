import React, { useEffect, useRef, useState } from "react";
import "./MovieRow.css";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ title, items }) => {
  const [scrollX, setScrollX] = useState(0);

  const containerListRef = useRef(null);
  const handleLeftArrow = () => {
    setScrollX((state) => (state > 0 ? state - 350 : 0));
  };

  const handleRightArrow = () => {
    setScrollX((state) =>
      state < items.results.length * 350 ? state + 350 : state
    );
  };

  useEffect(() => {
    if (containerListRef && containerListRef.current) {
      containerListRef.current.scrollTo(scrollX, 0);
    }
  }, [scrollX, containerListRef]);

  return (
    <div className="movieRow">
      <h2>{title}</h2>

      <div className="movieRow--listarea">
        <div
          className="movieRow--list"
          style={
            {
              // marginLeft: scrollX,
            }
          }
          ref={containerListRef}
        >
          <div className="movieRow--left" onClick={handleLeftArrow}>
            <NavigateBeforeIcon style={{ fontSize: 50 }} />
          </div>

          <div className="movieRow--right" onClick={handleRightArrow}>
            <NavigateNextIcon style={{ fontSize: 50 }} />
          </div>
          {items.results.length > 0 &&
            items.results.map((item, key) => (
              <div key={key} className="movieRow--item">
                <img
                  src={`https://image.tmdb.org/t/p/w300/${item.poster_path}`}
                  alt="poster"
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};
