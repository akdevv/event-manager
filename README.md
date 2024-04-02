# Evently - Event Management Application

## Overview

Hey there! Evently is a cool event management app that helps you handle all things events! You can make your own events, check out others, and keep everything organized super easily. Plus, it's got a safe way for users to sign in and manage their stuff. Oh, and buying tickets for events is a breeze too, thanks to it's neat payment feature. It's pretty handy for anyone into hosting or going to events!

## Run Locally

Here are the steps to get Evently running on your machine:

1. **Install Node.js and MongoDB**: Make sure Node.js and MongoDB are installed on your computer.

2. **Set Up Accounts**:

    - **Stripe Account**: For handling payments.
    - **Clerk Account**: For user authentication.
    - **Uploadthing Account**: For uploading images.
    - **MongoDB Atlas**: For adding data to a remote database.

3. **Clone the Repository**:

```bash
git clone https://github.com/akdevv/event-manager
```

4. **Enter the Project Directory**:

```bash
cd event-manager
```

5. **Install Dependencies**:

```bash
npm install
```

6. **Set Up Environment Variables**: Create a `.env.local` file in the root directory. Add the following keys:

```bash
MONGODB_URI="<your-mongodb-uri>"

NEXT_PUBLIC_CLERK_SIGN_IN_URL="/sign-in"
NEXT_PUBLIC_CLERK_SIGN_UP_URL="/sign-up"
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL="/"
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL="/"
NEXT_PUBLIC_SERVER_URL="http://localhost:3000"

CLERK_SECRET_KEY="<your-clerk-secret-key>"
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="<your-public-clerk-publishable-key>"
WEBHOOK_SECRET="<your-clerk-webhook-secret>"

UPLOADTHING_APP_ID="<your-uploadting-id>"
UPLOADTHING_SECRET="<your-uploadthing-secret>"

STRIPE_SECRET_KEY="<your-stripe-secret-key>"
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY="<your-strip-publishable-key>"
STRIPE_WEBHOOK_SECRET="<your-stripe-webhook-secret>"
```

7. **Start the Server**:

```bash
npm run dev
```

Open http://localhost:3000 in your browser to see Evently!

## Screenshots

![Screenshot Homepage](/public/assets/images/screenshot-home-desktop.png)
![Screenshot Event Details Page](/public/assets/images/screenshot-event-details.png)

## File Structure

```
event-manager/
├── app/                                 # Root folder for the App Router
│   ├── (auth)/                          # Auth-related pages
│   │   ├── sign-in/                     # Sign-in page route
│   │   │   ├── [[...sign-in]]/
│   │   │   │   └── page.tsx
│   │   ├── sign-up/                     # Sign-up page route
│   │   │   ├── [[...sign-up]]/
│   │   │   │   └── page.tsx
│   ├── (root)/                          # Root pages
│   │   ├── events/                      # Events related pages
│   │   │   ├── [id]/                    # Dynamic event pages
│   │   │   │   ├── update/              # Update event route
│   │   │   │   │   └── page.tsx         # Update page
│   │   │   │   └── page.tsx             # Individual event detail page
│   │   │   ├── create/                  # Create event route
│   │   │   │   └── page.tsx             # Create event page
│   │   ├── orders/                      # Orders page route
│   │   │   └── page.tsx                 # Orders page
│   │   ├── profile/                     # Profile page route
│   │   │   └── page.tsx                 # User profile page
│   ├── api/                             # API routes
│   │   ├── uploadthing/                 # API route for "uploadthing"
│   │   │   ├── core.ts                  # Core logic for "uploadthing"
│   │   │   └── route.ts                 # Route definition for "uploadthing"
│   │   ├── webhooks/                    # API route for webhooks
│   │   │   ├── strip/
│   │   │   │   └── route.ts             # Webhook route for "Stripe"
│   │   │   └── route.ts                 # Webhook route for "Clerk"
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx                       # Global layout file
│   └── page.tsx                         # Global page file
├── components/                          # Reusable components
│   ├── shared/                          # Shared components used across the project
│   │   ├── Card.tsx
│   │   ├── CategoryFilter.tsx
│   │   ├── Checkout.tsx
│   │   ├── CheckoutButton.tsx
│   │   ├── Collection.tsx
│   │   ├── DeleteConfirmation.tsx
│   │   ├── Dropdown.tsx
│   │   ├── EventForm.tsx
│   │   ├── FileUploader.tsx
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── MobileNav.tsx
│   │   ├── NavItems.tsx
│   │   ├── Pagination.tsx
│   │   └── Search.tsx
│   └── ui/                              # UI components from shadcn ui
├── constants/                           # Constants used in the project
│   └── index.ts
├── lib/                                 # Library functions and utilities
│   ├── actions/                         # Server actions for categories, events, orders & users
│   │   ├── category.actions.ts
│   │   ├── events.actions.ts
│   │   ├── order.actions.ts
│   │   └── user.actions.ts
│   ├── database/                        # Database related function
│   │   └── index.ts
│   ├── uploadthing.ts                   # "uploadthing" configurations
│   ├── utils.ts                         # General utilities
│   └── validators.ts                    # Validators for data validation
├── models/                              # Data models for category, event, order, user
│   ├── category.models.ts
│   ├── event.models.ts
│   ├── order.models.ts
│   └── user.models.ts
├── public/
│   ├── assets/                          # Static files
│   │   ├── icons/
│   │   └── images/
├── types/                               # TypeScript types and interfaces
│   └── index.ts
├── components.json                      # Configuration for shadcn UI components
├── middleware.ts                        # Middleware for Next.js
├── next.config.mjs                      # Next.js configuration file
├── package-lock.json
├── package.json
├── postcss.config.js                    # PostCSS configuration
├── README.md
├── tailwind.config.ts                   # Tailwind CSS configuration
└── tsconfig.json                        # TypeScript configuration

```

## Technologies Used

Evently is built with a robust set of technologies ensuring a modern, efficient, and user-friendly experience:

-   **Next.js**: A React framework for building server-side rendering and static web applications.
-   **Clerk**: For secure and scalable user authentication.
-   **MongoDB**: A NoSQL database used for storing application data.
-   **Stripe**: To handle secure online payment transactions.
-   **Tailwind CSS**: A utility-first CSS framework for rapid UI development.
-   **Shadcn UI**: A UI library for building high-quality, responsive user interfaces.
-   **Uploadthing**: A service for handling file uploads efficiently.

## Credits

This project was made with help form tutorial by [JavaScrip Mastery](https://www.youtube.com/watch?v=zgGhzuBZOQg) YouTube channel.
