import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function Detail() {
  const detailId = useParams();
  const [loading, setLoading] = useState(true);
  const [detail, setDetail] = useState([]);
  const movieDetail = async () => {
    const json = await (
      await fetch(
        `https://yts.mx/api/v2/movie_details.json?movie_id=${detailId.id}`
      )
    ).json();
    setLoading(false);
    setDetail(json.data.movie);
  };
  useEffect(() => {
    movieDetail();
  }, []);
  console.log(detail);
  return (
    <div>
      <h1>detail</h1>
      {loading ? (
        <h3>loading...</h3>
      ) : (
        <div>
          <img src={detail.large_cover_image} alt={detail.title} />
          <h1>{detail.title}</h1>
          <p>{detail.description_full}</p>
        </div>
      )}
    </div>
  );
}
