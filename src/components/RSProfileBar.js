import React from "react";
import Avatar from "react-avatar";

const RSProfileBar = () => {
  return (
    <div className="my-4 p-4 bg-gray-100 rounded-2xl">
      <h1 className="text-xl font-bold mb-4">Who to follow</h1>
      <div className="space-y-3">
        <div className="flex items-center justify-between p-2 hover:bg-gray-200 rounded-xl transition-colors">
          <div className="flex items-center">
            <Avatar src="" name="Wim Mostmans" size="40" />
            <div className="ml-2">
              <h1 className="font-semibold">Steffani</h1>
              <p className="text-sm text-gray-500">@Steffanimernsteck</p>
            </div>
          </div>
          <button className="bg-black min-w-[80px] px-4 py-1.5 text-white text-sm font-semibold rounded-full hover:bg-gray-900 active:bg-gray-800 transition-all duration-200 active:scale-95 hover:shadow-md">
            Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default RSProfileBar;
