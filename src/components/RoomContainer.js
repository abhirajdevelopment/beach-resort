import React from 'react';
import RoomsFilter from "./RoomFilter";
import RoomsList from "./RoomList";
import Loader from "./Loader";
import { withRoomConsumer } from "../context";

function RoomContainer({ context }) {
	const { loading, sortedRooms, rooms } = context;
	if (loading) {
		return <Loader />
	}

	return (
		<>
			<RoomsFilter rooms={rooms} />
			<RoomsList rooms={sortedRooms} />
		</>
	)
}

export default withRoomConsumer(RoomContainer);