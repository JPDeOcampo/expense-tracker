import Header from "../header";
import BalanceSpent from "@/components/shared/components/charts/balance-spent";
import GenericModal from "@/components/shared/components/generic-modal";

const Card = ({ title, children }: any) => {
  return (
    <div className="bg-neutral-light p-4 rounded-lg shadow-md flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-tertiary-900">{title}</h2>
      {children}
    </div>
  );
};

const Overview = () => {

  const overviewItems = [
    { title: "Total Overall balance", icon: "" },
    { title: "Loan", icon: "" },
    { title: "Investment", icon: "" },
  ];

  return (
    <div className="flex flex-col gap-4">
      <ul>
        {overviewItems.map((item, index) => {
          return (
            <li key={index} className="my-2">
              <span className="text-base text-quaternary font-medium">
                {item.title}
              </span>
            </li>
          );
        })}
      </ul>
      <div className="w-full grid grid-cols-2 gap-2">
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">Total Spent</p>
          <p className="text-base font-medium text-primary">140,00</p>
        </div>
        <div className="flex flex-col gap-4 p-4 bg-tertiary rounded-md">
          <p className="text-base font-medium text-quaternary">Current Balance</p>
          <p className="text-base font-medium text-primary">140,00</p>
        </div>
      </div>
    </div>
  );
};
const DashboardContent = () => {
  return (
    <div className="flex flex-col w-full h-full py-6 px-14 gap-4">
      <div className="flex flex-col gap-6">
        <div className="w-full flex justify-end">
          <Header />
        </div>
        <h1 className="text-3xl font-bold text-primary">Dashboard</h1>
      </div>
      <div className="flex flex-col gap-6">
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-[30%_1fr] gap-6">
          <Card title="Overview">
            <Overview />
          </Card>
          <Card title="Balance vs spent">
            <BalanceSpent />
          </Card>
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Overview">
            <div></div>
          </Card>
          <Card title="Balance vs spent">
            <BalanceSpent />
          </Card>
        </div>
        <div className="w-full h-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card title="Overview">
            <div></div>
          </Card>
          <Card title="Balance vs spent">
            <BalanceSpent />
          </Card>
        </div>
      </div>
      <GenericModal/>
    </div>
  );
};

export default DashboardContent;
