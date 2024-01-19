import React, { useState, useRef, useEffect } from "react";
import { createTask } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  InputAdornment,
} from "@mui/material";
import Typography from "@mui/material/Typography";

const AddTask = () => {
  const { auth, users } = useSelector((state) => state);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [country, setCountry] = useState("");
  const [lat, setLat] = useState("");
  const [lng, setLng] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  function isEnoughMoney(price) {
    return auth.wallet > price;
  }

  const handleMoney = (ev) => {
    if (!isEnoughMoney(ev.target.value)) {
      setError("Insufficient Funds!!!");
    } else {
      setError(null);
    }
    setPrice(ev.target.value);
  };

  const input = useRef();
  useEffect(() => {
    if (input.current) {
      const autocomplete = new google.maps.places.Autocomplete(input.current, {
        fields: [
          "address_components",
          "geometry",
          "icon",
          "name",
          "formatted_address",
        ],
      });
      autocomplete.addListener("place_changed", () => {
        const place = autocomplete.getPlace();
        if (place.address_components) {
          let Address = place.formatted_address.split(",");
          setStreet(Address[0]);
          setCity(Address[1]);
          setState(Address[2].split(" ")[1]);
          setZipCode(Address[2].split(" ")[2]);
          setCountry(Address[3]);
          setLat(place.geometry.location.lat);
          setLng(place.geometry.location.lng);
        }
      });
    }
  }, [input]);

  const categories = [
    "virtual",
    "shopping",
    "misc",
    "moving",
    "sport",
    "gaming",
    "photography",
    "beauty",
    "cleaning",
  ];
  const create = async (ev) => {
    ev.preventDefault();
    await dispatch(
      createTask({
        title,
        description,
        street,
        city,
        state,
        zipCode,
        country,
        lat,
        lng,
        price,
        category,
        userId: auth.id,
      })
    );
    navigate("/myTasks");
  };

  return (
    <div className="add-task">
      <div>
        <Typography variant="h4">Post Job</Typography>
      </div>
      <form onSubmit={create}>
        <TextField
          required
          label="Title"
          variant="outlined"
          value={title}
          onChange={(ev) => setTitle(ev.target.value)}
          placeholder="Title"
        />
        <TextField
          required
          label="Description"
          variant="outlined"
          value={description}
          onChange={(ev) => setDescription(ev.target.value)}
          placeholder="Description"
          multiline
          rows={4}
        />
        <TextField
          required
          label="Price"
          variant="outlined"
          value={price}
          onChange={handleMoney}
          placeholder="Price (ex: 1000)"
          error={error && !isEnoughMoney(price)}
          helperText={
            error && isNaN(price)
              ? "Enter a Number"
              : error && !isEnoughMoney(price)
              ? "Insufficient Funds!!!"
              : ""
          }
          InputProps={{
            startAdornment: <InputAdornment position="start">$</InputAdornment>,
          }}
        />
        <FormControl>
          <InputLabel>Select A Category</InputLabel>
          <Select
            name="categories"
            id="task-category"
            value={category}
            onChange={(ev) => setCategory(ev.target.value)}
          >
            <MenuItem value="">Select a Category</MenuItem>
            {categories.sort().map((category) => (
              <MenuItem key={category} value={category}>
                {category}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        <input className="addressInput" ref={input} />
        <Button
          type="submit"
          variant="contained"
          disabled={!title || !description || !price || !category || !!street}
        >
          Post
        </Button>
      </form>
    </div>
  );
};

export default AddTask;
