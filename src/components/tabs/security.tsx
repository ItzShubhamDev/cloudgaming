export default function Security() {
    return (
        <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6">Security Settings</h2>
            <div className="space-y-8">
                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Change Password
                    </h3>
                    <form className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Current Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                New Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                className="w-full bg-gray-300 dark:bg-gray-700 rounded-lg px-4 py-2"
                            />
                        </div>
                        <div className="flex justify-end">
                            <button
                                type="submit"
                                className="text-white bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 px-6 py-2 rounded-lg font-semibold"
                            >
                                Update Password
                            </button>
                        </div>
                    </form>
                </div>

                <div>
                    <h3 className="text-lg font-semibold mb-4">
                        Two-Factor Authentication
                    </h3>
                    <div className="flex items-center justify-between p-4 bg-gray-300 dark:bg-gray-700 rounded-lg">
                        <div>
                            <p className="font-medium">
                                Protect your account with 2FA
                            </p>
                            <p className="text-sm text-gray-400">
                                Add an extra layer of security to your account
                            </p>
                        </div>
                        <button className="text-white bg-blue-600 hover:bg-blue-500 dark:hover:bg-blue-700 px-4 py-2 rounded-lg">
                            Enable
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
