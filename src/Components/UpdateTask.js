import React, { useState, useRef, useEffect } from "react";
import { updateTask } from "../store";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { TextField, Button, Input } from "@mui/material";
import Typography from "@mui/material/Typography";

const UpdateTask = () => {
  const { tasks } = useSelector((state) => state);
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
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();

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
  useEffect(() => {
    setTitle(task.title);
    setDescription(task.description);
    setPrice(task.price);
  }, [tasks]);

  const task = tasks.find((task) => task.id === id);

  if (!task) {
    return null;
  }
  const update = async (ev) => {
    ev.preventDefault();
    await dispatch(
      updateTask({
        id: task.id,
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
      })
    );
    navigate("/myTasks");
  };

  return (
    <div className="update-task">
      <Typography variant="h4">Update Job</Typography>
      <form onSubmit={update}>
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
          onChange={(ev) => setPrice(ev.target.value)}
          placeholder="Price"
        />
        <input className="addressInput" ref={input} />
        <Button
          type="submit"
          variant="outlined"
          disabled={!title || !description || !price || !street}
        >
          Update
        </Button>
      </form>
    </div>
  );
};

export default UpdateTask;
