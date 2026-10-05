# ByteBite

A one-page food delivery landing page with a responsive app mockup, Lottie food icons, and a MongoDB-backed feedback endpoint.

## Run locally

1. Install dependencies with `npm install`.
2. Copy `.env.example` to `.env` and set `MONGODB_URI` to a MongoDB connection string.
3. Start the app with `npm start` and open `http://localhost:3000`.

Feedback is stored in the `feedback` collection in the database named by `MONGODB_DATABASE` (defaults to `bytebite`). The page works without MongoDB, but the feedback form will report that storage is not configured until a connection string is provided.