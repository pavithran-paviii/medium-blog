import React from "react";

interface AuthenticationProps {
  child: React.ReactNode;
}

const Authentication: React.FC<AuthenticationProps> = ({ child }) => {
  return (
    <div className="flex h-screen items-center">
      <div className="flex align-center justify-center w-2/4 px-12 py-12">
        {child}
      </div>
      <div className="w-2/4	flex align-center justify-center row-1 flex-col bg-gray-100 px-12	py-12 h-full">
        <div className="text-3xl font-medium">
          "The customer service i reveived was exceptional. The support team
          went above and beyond to address my concerns."
        </div>
        <div className="mt-3.5">
          <div className="text-lg font-semibold">Jules Winnfield</div>
          <div className="text-m font-normal text-zinc-500">CEO, Acme Inc</div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
