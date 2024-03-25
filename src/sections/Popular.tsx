import React from "react";
import Recipes from "../data/recipes.json";
import Image from "next/image";
import Link from "next/link";
import Rating from "../components/Rating";
const Popular = () => {
  function TitleToLink(title: string) {
    const lower = title.toLowerCase();
    const link = lower.replace(/\s+/g, "-");
    return link;
  }

  return (
    <section className="w-[1380px] max-w-full  m-auto py-20 px-6">
      <h2 className="text-3xl font-medium text-center mb-10 underline decoration-wavy decoration-my_red underline-offset-8">
        Popular Recipes
      </h2>

      <div className="grid md:grid-cols-3 gap-5">
        {Recipes.recipes.map((item, index) => {
          return (
            <Link
              key={index}
              href={`/recipes/${TitleToLink(item.name)}`}
              className="hover:shadow-2xl hover:scale-[1.01] rounded-md transition-all"
            >
              <div className="">
                <Image
                  src={`/recipes/${item.name}.webp`}
                  alt={item.name}
                  width={300}
                  height={200}
                  className="w-full rounded-t-md"
                />
                <div className="bg-my_black text-white p-2 rounded-b-md">
                  <h3 className="font-semibold mb-2"> {item.name}</h3>

                  <Rating rate={5} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Popular;
