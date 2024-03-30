"use server";

import User from "@/models/user.model";
import { handleError } from "../utils";
import Event from "@/models/event.model";
import { CreateEventParams } from "@/types";
import { connectToDatabase } from "../database";

export const createEvent = async ({
	event,
	userId,
	path,
}: CreateEventParams) => {
	try {
		await connectToDatabase();
		const organizer = await User.findById(userId);
		if (!organizer) throw new Error("Organizer not found");
		const newEvent = await Event.create({
			...event,
			category: event.categoryId,
			organizer: userId,
		});

		return JSON.parse(JSON.stringify(newEvent));
	} catch (error) {
		handleError(error);
	}
};
