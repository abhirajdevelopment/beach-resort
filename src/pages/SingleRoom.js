import React, { Component } from 'react';
import { Link } from "react-router-dom";
import { RoomContext } from "../context";
import defaultBcg from "../images/room-1.jpeg";
import Banner from '../components/Banner';
import StyledHero from "../components/StyledHero";

export default class SingleRoom extends Component {
	constructor(props) {
		super(props);
		console.log(this.props);

		this.state = {
			slug: this.props.match.params.slug,
			defaultBcg
		}
	}
	static contextType = RoomContext;

	render() {
		const { getRoom } = this.context;
		const room = getRoom(this.state.slug);

		if (!room) {
			return (
				<div className="error">
					<h3>No such room could be found...</h3>
					<Link to="/rooms" className="btn-primary">
						Back to Rooms
					</Link>
				</div>
			)
		}

		const { name, description, capacity, size, price, extras, breakfast, pets, images } = room;
		const [mainImg, ...otherImgs] = images;
		return (
			<>
				<StyledHero img={mainImg || defaultBcg}>
					<Banner title={`${name} Room`}>
						<Link to="/rooms" className="btn-primary">
							Back to Rooms
					</Link>
					</Banner>
				</StyledHero>
				<section className="single-room">
					<div className="single-room-images">
						{ 
							otherImgs.map((item, index) => (
								<img key={index} src={item} alt={name} />
							))
						}
					</div>
					<div className="single-room-info">
						<article className="desc">
							<h3>details</h3>
							<p>{description}</p>
						</article>

						<article className="info">
							<h3>Info</h3>
							<h6>Price: ${price}</h6>
							<h6>Size: {size} sq. ft</h6>
							<h6>Max Capacity: {capacity > 1 ? `${capacity} People` : `${capacity} Person` }</h6>
							<h6>Size: ${size}</h6>
							<h6>{pets ? "Pets are allowed" : "No pets allowed"}</h6>
							<h6>{breakfast && "Free breakfast included"}</h6>
						</article>
					</div>
				</section>

				<section className="room-extras">
					<h6>Extras</h6>
					<ul className="extras">
						{
							extras.map((item, index) => (
								<li key={index}>- {item}</li>
							))
						}
					</ul>
				</section>
			</>
		)
	}

}