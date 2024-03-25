"use client";
import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
const Page = () => {
  const { data: session } = useSession();

  const router = useRouter();
  const userId = session?.user?.id;
    useEffect(() => {
      if (userId) {
        router.push(`/saves/${userId}`);
      }
    }, [userId, router]);
  return (
    <main className="py-32">
      <div className="text-center mt-10">
        <p className="text-lg mb-2">
          Please sign in to view your saved recipes.
        </p>
        <button
          className="w-fit rounded-full px-8 py-2 overflow-hidden group bg-my_red  text-white hover:ring-2 hover:ring-offset-2 hover:ring-my_red transition-all ease-out duration-300"
          onClick={() => signIn()}
        >
          Sign In
        </button>
      </div>
    </main>
  );
};

export default Page;
