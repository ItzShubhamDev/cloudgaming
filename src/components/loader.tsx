import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <>
      <div className="animate-spin text-blue-500 h-8 w-8">
        <LoaderCircle />
      </div>
      <span className="sr-only">Loading...</span>
    </>
  );
}
