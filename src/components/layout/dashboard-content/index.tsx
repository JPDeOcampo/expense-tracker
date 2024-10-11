import Header from "../header";

const DashboardContent = () => {
  return (
    <div className="flex flex-col w-full h-full py-6 px-14">
      <div className="w-full flex justify-end">
        <Header />
      </div>
      <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      <div className="w-full h-full grid grid-cols-[30%_1fr] gap-6">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary">Overview</h2>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-primary">Overview</h2>
        </div>
      </div>
    </div>
  );
};

export default DashboardContent;
