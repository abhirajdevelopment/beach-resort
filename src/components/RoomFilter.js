import React from 'react';
import { useContext } from "react";
import { RoomContext } from "../context";
import Title from "../components/Title";

const getUnique = (items, value) => {
	return [...new Set(items.map(item => item[value]))];
}

export default function RoomFilter({ rooms }) {
	const context = useContext(RoomContext);
	const { handleChange, type, capacity, price, minPrice, maxPrice, minSize, maxSize, breakfast, pets } = context;
	let types = getUnique(rooms, "type");
	types = ["all", ...types];
	types = types.map((item, index) => {
		return (
			<option value={item} key={index}>{item}</option>
		)
	});

	let roomCapacity = getUnique(rooms, "capacity");
	roomCapacity = roomCapacity.map((item, index) => {
		return (
			<option value={item} key={index}>{item}</option>
		)
	});
	return (
		<section className="filter-container">
			<Title title="Search Rooms" />
			<form className="filter-form">
				<div className="form-group">
					<label htmlFor="type">Room Type</label>
					<select className="form-control" name="type" id="type" value={type} onChange={handleChange}>
						{types}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="capacity">Capacity</label>
					<select className="form-control" name="capacity" id="capacity" value={capacity} onChange={handleChange}>
						{roomCapacity}
					</select>
				</div>

				<div className="form-group">
					<label htmlFor="price">Room Price ${price}</label>
					<input className="form-control" type="range" name="price" id="price" min={minPrice} max={maxPrice} value={price} onChange={handleChange} />
				</div>

				<div className="form-group">
					<label htmlFor="size">Room Size</label>
					<div className="size-inputs">
						<input className="size-input" type="number" name="minSize" id="size" value={minSize} onChange={handleChange} />
						<input className="size-input" type="number" name="maxSize" id="size" value={maxSize} onChange={handleChange} />
					</div>
				</div>

				<div className="form-group">
					<div className="single-extra">
						<input type="checkbox" name="breakfast" id="breakfast" checked={breakfast} onChange={handleChange} />
						<label htmlFor="breakfast">Breakfast</label>
					</div>
					<div className="single-extra">
						<input type="checkbox" name="pets" id="pets" checked={pets} onChange={handleChange} />
						<label htmlFor="pets">Pets</label>
					</div>
				</div>
			</form>
		</section>
	)
}