"use client";

import { useRouter } from "next/navigation.js";
import FilmCard from "./components/FilmCard";
import { films } from "./mock/films";

export default function Home() {
  const router = useRouter();

  const availablePages = [
    { label: "Profile", path: "/determinate" },
    { label: "Profile Settings", path: "/settings" },
  ];

  const getHrElement = () => <hr className="w-[50%] border-gray-700" />;

  return (
    <div className="flex-1 pb-20 bg-[#14181C] h-full">
      <div className="container h-full">
        <div className="text-white py-10  flex flex-col gap-5 justify-center items-center h-full">
          <div className="flex flex-col gap-2 items-center">
            <p>Created for learning purposes</p>
            <p>
              <strong>Tech Stack:</strong> Next.js, Tailwind CSS, MongoDB
            </p>
          </div>

          {getHrElement()}

          <div className="flex flex-col gap-3">
            <p>
              Check out my favorite page (also favorite movie) via this card:
            </p>

            <div className="flex justify-center">
              <FilmCard filmData={films[0]} isBig={true} isRatingOn={false} />
            </div>
          </div>
          {getHrElement()}
          <div>
            <p>Other available pages:</p>
            <ul>
              {availablePages.map((page) => (
                <li key={page.path}>
                  <button
                    className="text-blue-300"
                    onClick={() => router.push(page.path)}
                  >
                    {page.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {getHrElement()}

          <p>
            You can use <strong>test123</strong> as both the username and
            password to sign in.
          </p>
        </div>
      </div>
    </div>
  );
}
