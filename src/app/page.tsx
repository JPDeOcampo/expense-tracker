import Login from "@/components/layout/login";
const App = () => {
  return (
    <div className="grid grid-cols-2 h-full w-full">
      <div className="bg-tertiary"></div>
      <div className="w-full h-full flex items-center justify-center bg-secondary-50">
        <Login />
      </div>
    </div>
  );
};

export default App;
