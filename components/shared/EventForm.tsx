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

import { z } from "zod";
import Dropdown from "./Dropdown";
import { useForm } from "react-hook-form";
import FileUploader from "./FileUploader";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { eventDefaultValues } from "@/constants";
import { eventFormSchema } from "@/lib/validator";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";

type EventFormProps = {
	userId: string;
	type: "Create" | "Update";
};

function EventForm({ userId, type }: EventFormProps) {
	const initialValues = eventDefaultValues;

	const form = useForm<z.infer<typeof eventFormSchema>>({
		resolver: zodResolver(eventFormSchema),
		defaultValues: initialValues,
	});

	// 2. Define a submit handler.
	function onSubmit(values: z.infer<typeof eventFormSchema>) {
		// Do something with the form values.
		// ✅ This will be type-safe and validated.
		console.log(values);
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

				{/* Description */}
				<div className="flex flex-col gap-5 md:flex-row">
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
				</div>

				{/* Image */}
				<FormField
					control={form.control}
					name="description"
					render={({ field }) => (
						<FormItem className="w-full">
							<FormControl className="h-72">
								<FileUploader />
							</FormControl>
							<FormMessage />
						</FormItem>
					)}
				/>

				<Button type="submit">Submit</Button>
			</form>
		</Form>
	);
}

export default EventForm;
