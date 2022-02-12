import { useEffect, useState } from "react";
import axios from "axios";

function NewsFeed() {
  const [articles, setArticles] = useState(null);

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://crypto-news-live3.p.rapidapi.com/news",
      headers: {
        "x-rapidapi-host": "crypto-news-live3.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };
    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        setArticles(response.data);
      })
      .catch(function (error) {
        console.error(error);
      });
  }, []);

  console.log(articles);

  const sevenArticles = articles?.slice(0, 7);

  return (
    <div className="news-feed">
      <h2>News Feed</h2>
      {sevenArticles?.map((article, _index) => (
        <div key={_index}>
         <a href={article.url}><p>{article.title}</p></a> 
        </div>
      ))}
    </div>
  );
}

export default NewsFeed;
