type History = {
  id: string;
  created_at: string;
  updated_at: string;
  name: string;
  amount: number;
  paid: boolean;
};

export default function Billing({
  current,
  history,
}: {
  current: History;
  history: History[];
}) {
  const active = checkActive(current.created_at);
  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">Billing Settings</h2>
      <div className="space-y-8">
        <div>
          <h3 className="text-lg font-semibold mb-4">Current Plan</h3>
          <div className="bg-gray-700 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="font-semibold">
                  {current?.name[0].toUpperCase()! +
                    current?.name.substring(1, current.name.length)}
                </p>
                <p className="text-sm text-gray-400">
                  ₹{current?.amount} / month
                </p>
              </div>
              <span
                className={
                  "bg-blue-500/20 text-blue-400 px-3 py-1 rounded-full text-sm " +
                  `${!active ? "hidden" : ""}`
                }
              >
                Active
              </span>
            </div>
            <div className="flex">
              <button className="border border-gray-600 hover:bg-gray-600 px-4 py-2 rounded-lg">
                Cancel Plan
              </button>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4">Billing History</h3>
          <div className="bg-gray-700 rounded-lg overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-600">
                  <th className="text-left p-4">Date</th>
                  <th className="text-left p-4">Description</th>
                  <th className="text-left p-4">Amount</th>
                  <th className="text-left p-4">Status</th>
                </tr>
              </thead>
              <tbody>
                {history?.map((h) => (
                  <tr key={h.id} className="border-b border-gray-600">
                    <td className="p-4">
                      {new Date(h.created_at).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </td>
                    <td className="p-4">
                      {h.name[0].toUpperCase() +
                        h.name.substring(1, h.name.length)}
                    </td>
                    <td className="p-4">₹{h.amount}</td>
                    <td className="p-4">
                      <span
                        className={
                          "px-2 py-1 rounded-full text-sm " +
                          `${
                            h.paid
                              ? "bg-green-500/20 text-green-400"
                              : "bg-red-500/20 text-red-400"
                          }`
                        }
                      >
                        {h.paid ? "Paid" : "Unpaid"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function checkActive(date: string) {
  const d = new Date(date);
  const n = new Date();
  d.setMonth(d.getMonth() + 1);
  return d > n;
}
