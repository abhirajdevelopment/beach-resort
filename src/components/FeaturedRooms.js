import React, { Component } from 'react'
import { RoomContext } from '../context';

import Loader from "./Loader";
import Room from "./Room";
import Title from "./Title";

export default class FeaturedRooms extends Component {
	static contextType = RoomContext;

	render() {
		let { loading, featuredRooms: rooms } = this.context;
		rooms = rooms.map(room => {
			return <Room key={room.id} room={room} />
		});

		return (
			<section className="featured-rooms">
				<Title title="Featured Rooms" />
				
				<div className="featured-rooms-center">
					{ loading ? <Loader /> : rooms }
				</div>
			</section>
		)
	}
}