interface IPropTypes {
  defaultToast: boolean;
  message: string;
}
const GenericToast = ({ defaultToast, message }: IPropTypes) => {
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
