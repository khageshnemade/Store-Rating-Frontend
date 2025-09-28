import Stores from "../Common/Stores";

const UserDashboard = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        User Dashboard
      </h1>

      {/* Just render the reusable Stores component */}
      <Stores initialPageSize={2} />
    </div>
  );
};

export default UserDashboard;
