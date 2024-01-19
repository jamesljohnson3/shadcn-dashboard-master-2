import { Button } from "@/components/ui/button";
import prisma from "../utils/db";
import MovieButtons from "./MovieButtons";

async function getData() {
  const data = await prisma.movie.findFirst({
    select: {
      title: true,
      overview: true,
      videoSource: true,
      imageString: true,
      release: true,
      duration: true,
      id: true,
      age: true,
      youtubeString: true,
    },
  });
  return data;
}

export default async function MovieVideo() {
  const data = await getData();

  return (
    <div className="h-[45vh] lg:h-[45vh] w-full flex justify-start items-center">
      

      <div className="absolute w-[90%] lg:w-[40%] mx-auto">
        <h1 className="text-white text-4xl md:text-5xl lg:text-6xl font-bold">
          {data?.title}
        </h1>
        <p className="text-white text-lg mt-5 line-clamp-3">{data?.overview}</p>
        <div className="flex gap-x-3 mt-4">
          <MovieButtons
            age={data?.age as number}
            duration={data?.duration as number}
            id={data?.id as number}
            overview={data?.overview as string}
            releaseDate={data?.release as number}
            title={data?.title as string}
            youtubeUrl={data?.youtubeString as string}
            key={data?.id}
          />
        </div>
      </div>
    </div>
  );
}
