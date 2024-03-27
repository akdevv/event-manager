import Image from "next/image";
import NavItems from "./NavItems";
import { Separator } from "@/components/ui/separator";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

export default function MobileNav() {
	return (
		<nav className="md:hidden">
			<Sheet>
				<SheetTrigger className="align-middle">
					<Image
						src="/assets/icons/menu.svg"
						alt="Menu Icon"
						width={24}
						height={24}
						className="cursor-pointer"
					/>
				</SheetTrigger>
				<SheetContent className="flex flex-col gap-6 bg-white md:hidden">
					<Image
						src="/assets/images/logo.svg"
						alt="Logo"
						width={128}
						height={38}
					/>
					<Separator className="border border-gray-50" />
					<NavItems />
				</SheetContent>
			</Sheet>
		</nav>
	);
}
