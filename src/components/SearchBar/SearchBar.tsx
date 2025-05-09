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
    <div className="flex w-full items-center justify-center mt-4">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Latitude"
          className="border rounded border-black p-3 placeholder-black mr-2"
          name="lat"
        />
        <input
          type="text"
          placeholder="Longitude"
          className="border rounded border-black p-3 placeholder-black mr-2"
          name="long"
        />
        <button
          className="border rounded p-3 text-white bg-black"
          type="submit"
        >
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
