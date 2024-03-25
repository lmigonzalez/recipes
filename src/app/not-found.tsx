import React from "react";
import Link from "next/link";
const NotFound = () => {
  return (
    <main className="py-32">
      <div className="text-center mt-10">
        <p className="text-lg font-semibold">
          Oops! The page you're looking for cannot be found.
        </p>
        <p className="text-lg font-semibold">
          Please check the URL or go back to the{" "}
          <Link className="text-sky-700" href={"/"}>
            homepage.
          </Link>
        </p>
      </div>
    </main>
  );
};

export default NotFound;
