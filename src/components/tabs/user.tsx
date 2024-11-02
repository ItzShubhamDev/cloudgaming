import { User as IUser } from "@supabase/supabase-js";

export default function User({ user }: { user: IUser }) {
  return (
    <div className="bg-gray-800 rounded-2xl p-8">
      <h2 className="text-2xl font-bold mb-6">Profile Settings</h2>
      <form className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <input
              type="text"
              defaultValue={user?.user_metadata.name}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Email</label>
            <input
              type="email"
              defaultValue={user?.email}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">ID</label>
            <input
              type="text"
              defaultValue={user?.id}
              className="w-full bg-gray-700 rounded-lg px-4 py-2"
            />
          </div>
        </div>
        {/* <div className="flex justify-end">
                    <button
                      type="submit"
                      className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
                    >
                      Save Changes
                    </button>
                  </div> */}
      </form>
    </div>
  );
}
