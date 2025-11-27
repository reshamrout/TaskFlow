import React from "react";

const Loader = () => {
  return (
    <div class="min-h-60 flex flex-col bg-white border border-gray-200 shadow-2xs rounded-xl">
      <div class="flex flex-auto flex-col justify-center items-center p-4 md:p-5">
        <div class="flex justify-center">
          <div
            class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full"
            role="status"
            aria-label="loading"
          >
            <span class="sr-only">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
