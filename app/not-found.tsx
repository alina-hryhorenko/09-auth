import type { Metadata } from "next";
import css from "./not-found.module.css";

export const metadata: Metadata = {
  title: "404 - Page not found | NoteHub",
  description:
    "This page does not exist. The requested resource could not be found in NoteHub.",
  openGraph: {
    title: "404 - Page not found | NoteHub",
    description:
      "This page does not exist. The requested resource could not be found in NoteHub.",
    url: "https://notehub.vercel.app/404",
    images: ["https://ac.goit.global/fullstack/react/notehub-og-meta.jpg"],
  },
};

export default function NotFound() {
  return (
    <div>
      <h1 className={css.title}>404 - Page not found</h1>
      <p className={css.description}>
        Sorry, the page you are looking for does not exist.
      </p>
    </div>
  );
}
