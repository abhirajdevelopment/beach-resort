import React, { Component } from 'react';
import Client from "./Contentful";

const RoomContext = React.createContext();

class RoomProvider extends Component {
	state = {
		rooms: [],
		featuredRooms: [],
		sortedRooms: [],
		loading: true,
		type: "all",
		capacity: 1,
		price: 0,
		minPrice: 0,
		maxPrice: 0,
		minSize: 0,
		maxSize: 0,
		breakfast: false,
		pets: false
	};

	getData = async () => {
		try {
			let response = await Client.getEntries({ content_type: "beachResortRoom", order: "sys.createdAt" });
			let rooms = this.formatData(response.items);
			let featuredRooms = rooms.filter(room => room.featured);
			let maxPrice = Math.max(...rooms.map((item) => item.price));
			let maxSize = Math.max(...rooms.map((item) => item.size));

			this.setState({
				rooms,
				featuredRooms,
				sortedRooms: rooms,
				loading: false,
				price: maxPrice,
				maxPrice: maxPrice,
				maxSize: maxSize
			});

		} catch (error) {
			console.log(error);
		}
	}

	componentDidMount() {
		this.getData();
	}

	formatData(items) {
		let tempItems = items.map(item => {
			let id = item.sys.id;
			let images = item.fields.images.map(img => img.fields.file.url);
			let rooms = { ...item.fields, images, id }
			return rooms;
		});
		return tempItems;
	}

	getRoom = slug => {
		const tempRooms = [...this.state.rooms];
		console.log(this);
		const room = tempRooms.find(room => room.slug === slug);
		return room;
	}

	handleChange = event => {
		const target = event.target;
		const value = target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		this.setState({
			[name]: value
		}, this.filterRooms);
	}

	filterRooms = () => {
		let { rooms, type, capacity, price, minSize, maxSize, breakfast, pets } = this.state;
		let tempRooms = [...rooms];

		// transform value
		capacity = +capacity;
		price = +price;

		// filter by type
		if (type !== "all") {
			tempRooms = tempRooms.filter(room => room.type === type);
		}

		// filter by capacity
		if (capacity !== 1) {
			tempRooms = tempRooms.filter(room => room.capacity >= capacity);
		}

		// filter by price
		tempRooms = tempRooms.filter(room => room.price <= price);

		// filter by size
		tempRooms = tempRooms.filter(room => room.size >= minSize && room.size <= maxSize);

		// filter by breakfast
		if (breakfast) {
			tempRooms = tempRooms.filter(room => room.breakfast);
		}

		// filter by pets
		if (pets) {
			tempRooms = tempRooms.filter(room => room.pets === pets);
		}
		// change the state
		this.setState({
			sortedRooms: tempRooms
		});
	}

	render() {
		return (
			<RoomContext.Provider value={{ ...this.state, getRoom: this.getRoom, handleChange: this.handleChange }}>
				{this.props.children}
			</RoomContext.Provider>
		)
	}
}

const RoomConsumer = RoomContext.Consumer;

function withRoomConsumer(Component) {
	return function ConsumerWrapper(props) {
		return (
			<RoomConsumer>
				{
					value => {
						return <Component {...props} context={value} />
					}
				}
			</RoomConsumer>
		)
	}
}

export { RoomProvider, RoomConsumer, RoomContext, withRoomConsumer };