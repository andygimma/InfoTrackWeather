import { useNavigate } from "react-router";
import { FormEvent } from "react";

function SearchBar() {
  const navigate = useNavigate();

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const lat = formData.get("lat");
    const long = formData.get("long");
    navigate(`/search/${lat}/${long}`);
  };
  return (
    <div>
      <form onSubmit={onSubmit}>
        <input type="text" placeholder="Lat" className="border" name="lat" />
        <br />
        <input type="text" placeholder="Long" className="border" name="long" />
        <br />
        <button className="border" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
