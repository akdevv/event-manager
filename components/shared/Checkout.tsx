import { useEffect } from "react";
import { Button } from "../ui/button";
import { IEvent } from "@/models/event.model";
import { loadStripe } from "@stripe/stripe-js";
import { checkoutOrder } from "@/lib/actions/order.actions";

loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

function Checkout({ event, userId }: { event: IEvent; userId: string }) {
	useEffect(() => {
		const query = new URLSearchParams(window.location.search);
		if (query.get("success")) {
			console.log("Payment was successful!");
		}
		if (query.get("canceled")) {
			console.log("Payment was canceled.");
		}
	}, []);

	const onCheckout = async () => {
		const order = {
			eventTitle: event.title,
			eventId: event._id,
			price: event.price,
			isFree: event.isFree,
			buyerId: userId,
		};

		await checkoutOrder(order);
	};

	return (
		<form action={onCheckout} method="POST">
			<Button
				type="submit"
				role="link"
				size="lg"
				className="button sm:w-fit"
			>
				{event.isFree ? "Get Ticket" : "Buy Ticket"}
			</Button>
		</form>
	);
}

export default Checkout;
