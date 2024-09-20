import { PhotoIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Button from "./Button";

export default function Loading() {
  return (
    <div className="absolute left-0 top-0 flex h-full w-full items-center justify-center bg-black bg-opacity-60">
      <Button className="absolute right-5 top-5">
        <XMarkIcon className="size-10" />
      </Button>
      <div className="flex h-1/2 w-full max-w-screen-sm justify-center">
        <div className="flex animate-pulse flex-col gap-5 p-5">
          <div className="flex aspect-square items-center justify-center rounded-md bg-neutral-700 text-neutral-200">
            <PhotoIcon className="h-28" />
          </div>
          <div className="flex items-center gap-2">
            <div className="size-14 rounded-full bg-neutral-700" />
            <div className="flex flex-col gap-1">
              <div className="h-5 w-40 rounded-md bg-neutral-700" />
              <div className="h-5 w-20 rounded-md bg-neutral-700" />
            </div>
          </div>
          <div className="h-5 w-80 rounded-md bg-neutral-700" />
        </div>
      </div>
    </div>
  );
}
