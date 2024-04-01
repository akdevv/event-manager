import Image from "next/image";
import { SearchParamProps } from "@/types";
import { formatDateTime } from "@/lib/utils";
import { getEventsById } from "@/lib/actions/events.actions";

async function EventDetails({ params: { id } }: SearchParamProps) {
	const event = await getEventsById(id);
	return (
		<section className="flex justify-center bg-contain bg-primary-50 bg-dotted-pattern">
			<div className="grid grid-cols-1 md:grid-cols-2 2xl:max-w-7xl">
				<Image
					src={event.imageUrl}
					alt="hero image"
					width={1000}
					height={1000}
					className="h-full min-h-[300px] object-cover object-center"
				/>
				<div className="flex flex-col w-full gap-8 p-5 md:p-10">
					<div className="flex flex-col gap-6">
						<h2 className="h2-bold">{event.title}</h2>
						<div className="flex flex-col gap-3 sm:flex-row sm:items-center">
							<div className="flex gap-3">
								<p className="px-5 py-2 text-green-700 rounded-full p-bold-20 bg-green-500/10">
									{event.isFree ? "FREE" : `$${event.price}`}
								</p>
								<p className="px-4 rounded-full py-2.5 p-medium-16 bg-gray-500/10 text-gray-500">
									{event.category.name}
								</p>
							</div>
							<p className="mt-2 ml-2 p-medium-18 sm:mt-0">
								by{" "}
								<span className="text-primary-500">
									{event.organizer.firstName}{" "}
									{event.organizer.lastName}
								</span>
							</p>
						</div>
					</div>

					{/* CHECKOUT BUTTON */}

					<div className="flex flex-col gap-5">
						<div className="flex gap-2 md:gap-3">
							<Image
								src="/assets/icons/calendar.svg"
								alt="calendar"
								width={32}
								height={32}
							/>
							<div>
								<p>
									{
										formatDateTime(event.startDateTime)
											.dateOnly
									}
								</p>
								{/* <p className="ml-1">
									{
										formatDateTime(event.startDateTime)
											.timeOnly
									}
									-{" "}
								</p> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}

export default EventDetails;
