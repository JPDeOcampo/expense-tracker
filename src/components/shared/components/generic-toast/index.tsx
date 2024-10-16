import React from "react";

const GenericToast = ({ defaultToast, message }: any) => {
  return (
    <>
      {defaultToast ? (
        <div className="border-l-4 border-red-500 bg-neutral-light p-4">
          <p className="text-base text-quaternary">{message}</p>
        </div>
      ) : null}
    </>
  );
};

export default GenericToast;
