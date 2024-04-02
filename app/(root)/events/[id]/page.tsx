import Image from "next/image";
import { SearchParamProps } from "@/types";
import { formatDateTime } from "@/lib/utils";
import Collection from "@/components/shared/Collection";
import CheckoutButton from "@/components/shared/CheckoutButton";

import {
	getEventById,
	getRelatedEventsByCategory,
} from "@/lib/actions/events.actions";

async function EventDetails({
	params: { id },
	searchParams,
}: SearchParamProps) {
	const evt = await getEventById(id);
	const start = formatDateTime(evt.startDateTime);
	const end = formatDateTime(evt.endDateTime);

	const relatedEvents = await getRelatedEventsByCategory({
		categoryId: evt.category._id,
		eventId: evt._id,
		page: searchParams.page as string,
	});

	return (
		<>
			<section className="flex justify-center bg-contain bg-primary-50 bg-dotted-pattern">
				<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
					{/* COVER IMAGE */}
					<Image
						src={evt.imageUrl}
						alt="hero image"
						width={1000}
						height={1000}
						className="h-full min-h-[300px] object-cover object-center"
					/>
					{/* TITLE, NAME, PRICE & ORGANIZER */}
					<div className="flex flex-col w-full gap-8 p-5 md:p-10">
						<div className="flex flex-col gap-6">
							<h2 className="h2-bold">{evt.title}</h2>
							<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
								<div className="flex gap-3">
									<p className="px-5 py-2 text-green-700 rounded-full p-bold-20 bg-green-500/10">
										{evt.isFree ? "FREE" : `$${evt.price}`}
									</p>
									<p className="px-4 rounded-full py-2.5 p-medium-16 bg-gray-500/10 text-gray-500">
										{evt.category.name}
									</p>
								</div>
								<p className="mt-2 ml-2 p-medium-18 sm:mt-0">
									by{" "}
									<span className="text-primary-500">
										{evt.organizer.firstName}{" "}
										{evt.organizer.lastName}
									</span>
								</p>
							</div>
						</div>

						{/* CHECKOUT BUTTON */}
						<CheckoutButton event={evt} />

						{/* DATE AND TIME */}
						<div className="flex flex-col gap-5">
							<div className="flex gap-2 md:gap-3">
								<Image
									src="/assets/icons/calendar.svg"
									alt="calendar"
									width={32}
									height={32}
								/>
								<div className="p-medium-16 lg:p-regular-20 flex flex-col items-center">
									<p>
										{start.dateOnly} - {start.timeOnly}
									</p>
									<p>
										{end.dateOnly} - {end.timeOnly}
									</p>
								</div>
							</div>
						</div>

						{/* LOCATION */}
						<div className="p-regular-20 flex items-center gap-3">
							<Image
								src="/assets/icons/location.svg"
								alt="location"
								height={32}
								width={32}
							/>
							<p className="p-medium-16 lg:p-regular-20">
								{evt.loc}
							</p>
						</div>

						{/*  */}
						<div className="flex flex-col gap-2">
							<p className="p-bold-20 text-gray-600">
								What You'll Learn:
							</p>
							<p className="p-medium-16 lg:p-regular-18">
								{evt.description}
							</p>
							<p className="p-medium-16 lg:p-regular-18 truncate text-primary-500 underline">
								{evt.url}
							</p>
						</div>
					</div>
				</div>
			</section>

			{/* EVENTS WITH THE SAME CATEGORY */}
			<section className="wrapper my-8 flex flex-col gap-8 md:gap-12">
				<h2 className="h2-bold">
					<Collection
						data={relatedEvents?.data}
						emptyTitle="No Events Found"
						emptyStateSubtext="Come back later"
						collectionType="All_Events"
						limit={6}
						page={1}
						totalPages={2}
					/>
				</h2>
			</section>
		</>
	);
}

export default EventDetails;
