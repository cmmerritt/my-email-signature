import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";

export const meta: MetaFunction = () => {
  return [
    { title: "Email Signature Generator" },
    { name: "description", content: "Create your own custom email signature with a random quote and GIF." },
    { charset: "utf-8" },
    { name: "viewport", content: "width=device-width,initial-scale=1" },
  ];
};

export default function Index() {
  return (
    <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8" }}>
        <div className="mx-auto mt-16 max-w-7xl text-center">
      <Link
        to="/signature"
        className="text-xl text-blue-600 underline"
      >
        Generate a Signature!
      </Link>
    </div>
    </div>
  );
}
