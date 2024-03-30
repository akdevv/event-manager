"use client";

import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import Image from "next/image";
import { useState } from "react";
import { useForm } from "react-hook-form";
import DatePicker from "react-datepicker";
import { useRouter } from "next/navigation";
import "react-datepicker/dist/react-datepicker.css";

import Dropdown from "./Dropdown";
import { FileUploader } from "./FileUploader";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validator";
import { useUploadThing } from "@/lib/uploadthing";
import { createEvent } from "@/lib/actions/events.actions";

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

function EventForm({ userId, type }: EventFormProps) {
	const [files, setFiles] = useState<File[]>([]);

	const router = useRouter();
	const { startUpload } = useUploadThing("imageUploader");
	const initialValues = eventDefaultValues;

	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	async function onSubmit(values: z.infer<typeof eventFormSchema>) {
		let uploadedImageUrl = values.imageUrl;

		if (files.length > 0) {
			const uploadedImages = await startUpload(files);
			if (!uploadedImages) return;
			uploadedImageUrl = uploadedImages[0].url;
		}

		if (type === "Create") {
			try {
				const newEvent = await createEvent({
					event: { ...values, imageUrl: uploadedImageUrl },
					userId,
					path: "/profile",
				});
				if (newEvent) {
					form.reset();
					router.push(`/events/${newEvent._id}`);
				}
			} catch (error) {
				console.error(error);
			}
		}
	}

	return (
		<Form {...form}>
			<form
				onSubmit={form.handleSubmit(onSubmit)}
				className="flex flex-col gap-5"
			>
				<div className="flex flex-col gap-5 md:flex-row">
					{/* Event Title */}
					<FormField
						control={form.control}
						name="title"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Input
										placeholder="Event Title"
										className="input-field"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Category */}
					<FormField
						control={form.control}
						name="categoryId"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<Dropdown
										onChangeHandler={field.onChange}
										value={field.value}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					{/* Description */}
					<FormField
						control={form.control}
						name="description"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<Textarea
										placeholder="Description"
										className="textarea rounded-2xl"
										{...field}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* Image */}
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl className="h-72">
									<FileUploader
										onFieldChange={field.onChange}
										imageUrl={field.value}
										setFiles={setFiles}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Location */}
				<div className="flex flex-col gap-5 md:flex-row">
					<FormField
						control={form.control}
						name="loc"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/location-grey.svg"
											alt="location pin"
											width={24}
											height={24}
										/>
										<Input
											placeholder="Event Loaction or Online"
											className="input-field"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Date */}
				<div className="flex flex-col gap-5 md:flex-row">
					{/* Start Date */}
					<FormField
						control={form.control}
						name="startDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-gray-600">
											Start Date:
										</p>
										<DatePicker
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="dd/MM/yyyy hh:mm aa"
											wrapperClassName="datePicker"
											selected={field.value}
											onChange={(date: Date) =>
												field.onChange(date)
											}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* End Date */}
					<FormField
						control={form.control}
						name="endDateTime"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/calendar.svg"
											alt="calendar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<p className="ml-3 whitespace-nowrap text-gray-600">
											End Date:
										</p>
										<DatePicker
											showTimeSelect
											timeInputLabel="Time:"
											dateFormat="dd/MM/yyyy hh:mm aa"
											wrapperClassName="datePicker"
											selected={field.value}
											onChange={(date: Date) =>
												field.onChange(date)
											}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				<div className="flex flex-col gap-5 md:flex-row">
					{/* Price */}
					<FormField
						control={form.control}
						name="price"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/dollar.svg"
											alt="dollar"
											width={24}
											height={24}
											className="filter-grey"
										/>
										<Input
											type="number"
											placeholder="Price"
											{...field}
											className="p-regular-16 border-0 bg-grey-50 outline-offset-0 focus:border-0 focus-visible:ring-0 focus-visible:ring-offset-0"
										/>

										{/* isFree Input */}
										<FormField
											control={form.control}
											name="isFree"
											render={({ field }) => (
												<FormItem>
													<FormControl>
														<div className="flex items-center">
															<label
																htmlFor="isFree"
																className="whitespace-nowrap pr-3 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
															>
																Free Ticket
															</label>
															<Checkbox
																id="isFree"
																checked={
																	field.value
																}
																onCheckedChange={
																	field.onChange
																}
																className="mr-2 h-5 w-5 border-2 border-primary-500"
															/>
														</div>
													</FormControl>
													<FormMessage />
												</FormItem>
											)}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>

					{/* URL Input */}
					<FormField
						control={form.control}
						name="url"
						render={({ field }) => (
							<FormItem className="w-full">
								<FormControl>
									<div className="flex-center h-[54px] w-full overflow-hidden rounded-full bg-grey-50 px-4 py-2">
										<Image
											src="/assets/icons/link.svg"
											alt="link"
											width={24}
											height={24}
										/>
										<Input
											placeholder="URL"
											className="input-field"
											{...field}
										/>
									</div>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
				</div>

				{/* Submit Button */}
				<Button
					type="submit"
					size="lg"
					disabled={form.formState.isSubmitting}
					className="button col-span-2 w-full"
				>
					{form.formState.isSubmitting
						? "Submitting..."
						: `${type} Event`}
				</Button>
			</form>
		</Form>
	);
}

export default EventForm;
