import React, { memo, useEffect, useState } from "react";
import tmdb from "./tmdb";
import "./App.css";
import MovieRow from "./components/MovieRow";
import FeatueMovie from "./components/FeatueMovie";

const App = () => {
  const [movieList, setMovieList] = useState([]);
  const [FeaturedData, setFeaturedData] = useState(null);

  const loadAll = async () => {
    let list = await tmdb.getHomeList();

    let originals = list.filter((i) => i.slug === "originals");
    let randomChosen = Math.floor(
      Math.random() * (originals[0].items.results.length - 1)
    );
    let chosen = originals[0].items.results[randomChosen];

    console.log(chosen);

    setMovieList(list);
  };

  useEffect(() => {
    loadAll();
  }, []);

  return (
    <div className="page">
      {setFeaturedData && <FeatueMovie item={setFeaturedData} />}

      <section className="lists">
        {movieList.map((item, key) => (
          <MovieRow key={key} title={item.title} items={item.items} />
        ))}
      </section>
    </div>
  );
};

export default memo(App);
