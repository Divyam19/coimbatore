import { Boxes } from "@/components/ui/background-boxes";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FlipWords } from "../components/ui/flip-words";
import { BackgroundBeams } from "../components/ui/background-beams";
import { Button } from "@/components/ui/button";



export default function LandingPage() {

  const words=["better","greener","eco-friendly","sustainable","climate-friendly"]

  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-14 flex items-center z-40">
        <Link className="flex items-center justify-center" href="#">
          <MountainIcon className="h-10 w-10 mt-6" />
          <span className="sr-only">Acme Inc</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          
          <a
            className="text-sm font-medium hover:underline underline-offset-4"
            href="/sign-in"
          >
            <Button variant={"ghost"} className="rounded-xl text-black pt-2 pb-2 bg-green-400 mt-6 hover:bg-green-600 hover:text-black">Sign Up</Button>
          </a>
        </nav>
      </header>
      <main>
        <div>
          <div className="h-[40rem] flex justify-center items-center -my-14 px-4 z-20 ">
            <div className="text-8xl mx-auto font-serif text-green-600 dark:text-green-400">
              {"Build   "} 
              <FlipWords words={words} /> <br />
              Systems with Econ-Wave
            </div>
          </div>
        </div>
      </main> 
     <BackgroundBeams/>
     {/* <footer className="flex justify-center items-center mt-40 py-4 px-4 bg-neutral-400 text-white">
       <div className="flex flex-col items-center">
         <div className="text-2xl font-bold">
           Econ-Wave
         </div>
         <div className="text-sm">
           A community of builders and innovators working together to build a better future.
         </div>
       </div>
     </footer> */}
    </div>
  );
}

function MountainIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
    </svg>
  );
}
