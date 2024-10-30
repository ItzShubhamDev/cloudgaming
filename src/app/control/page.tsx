"use client";

import { useState } from "react";
import {
  Power,
  PowerOff,
  RefreshCw,
  Activity,
  MemoryStick,
  Cpu,
  HardDrive,
} from "lucide-react";

type VMStatus = "running" | "stopped" | "starting" | "stopping";

export default function Control() {
  const [vmStatus, setVmStatus] = useState<VMStatus>("running");
  const [isLoading, setIsLoading] = useState(false);

  const handlePowerAction = (action: "start" | "stop" | "restart") => {
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      switch (action) {
        case "start":
          setVmStatus("running");
          break;
        case "stop":
          setVmStatus("stopped");
          break;
        case "restart":
          setVmStatus("starting");
          setTimeout(() => setVmStatus("running"), 2000);
          break;
      }
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-gray-900 pt-24 pb-12 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Control Panel */}
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h2 className="text-2xl font-bold mb-6">VM Control Panel</h2>

              <div className="grid grid-cols-3 gap-4 mb-8">
                <button
                  onClick={() => handlePowerAction("start")}
                  disabled={vmStatus === "running" || isLoading}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                    vmStatus === "running"
                      ? "bg-green-600/20 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <Power className="h-6 w-6 mb-2" />
                  <span>Start</span>
                </button>

                <button
                  onClick={() => handlePowerAction("stop")}
                  disabled={vmStatus === "stopped" || isLoading}
                  className={`flex flex-col items-center justify-center p-4 rounded-lg ${
                    vmStatus === "stopped"
                      ? "bg-red-600/20 cursor-not-allowed"
                      : "bg-gray-700 hover:bg-gray-600"
                  }`}
                >
                  <PowerOff className="h-6 w-6 mb-2" />
                  <span>Stop</span>
                </button>

                <button
                  onClick={() => handlePowerAction("restart")}
                  disabled={vmStatus === "stopped" || isLoading}
                  className="flex flex-col items-center justify-center p-4 rounded-lg bg-gray-700 hover:bg-gray-600"
                >
                  <RefreshCw
                    className={`h-6 w-6 mb-2 ${
                      isLoading ? "animate-spin" : ""
                    }`}
                  />
                  <span>Restart</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Activity className="h-5 w-5 mr-3 text-blue-400" />
                    <span>Status</span>
                  </div>
                  <span
                    className={`px-3 py-1 rounded-full text-sm ${
                      vmStatus === "running"
                        ? "bg-green-500/20 text-green-400"
                        : vmStatus === "stopped"
                        ? "bg-red-500/20 text-red-400"
                        : "bg-yellow-500/20 text-yellow-400"
                    }`}
                  >
                    {vmStatus.charAt(0).toUpperCase() + vmStatus.slice(1)}
                  </span>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <MemoryStick className="h-5 w-5 mr-3 text-blue-400" />
                    <span>Memory Usage</span>
                  </div>
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "60%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <Cpu className="h-5 w-5 mr-3 text-blue-400" />
                    <span>CPU Usage</span>
                  </div>
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "45%" }}
                    ></div>
                  </div>
                </div>

                <div className="flex items-center justify-between p-4 bg-gray-700 rounded-lg">
                  <div className="flex items-center">
                    <HardDrive className="h-5 w-5 mr-3 text-blue-400" />
                    <span>Storage Usage</span>
                  </div>
                  <div className="w-32 bg-gray-600 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Side Panel */}
          <div className="space-y-8">
            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">VM Information</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-sm text-gray-400">Instance ID</label>
                  <p className="font-mono">vm-8f293hf8923</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">IP Address</label>
                  <p className="font-mono">192.168.1.100</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Region</label>
                  <p>US East (N. Virginia)</p>
                </div>
                <div>
                  <label className="text-sm text-gray-400">Plan</label>
                  <p>Pro</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-800 rounded-2xl p-6">
              <h3 className="text-xl font-semibold mb-4">Quick Actions</h3>
              <div className="space-y-2">
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700">
                  Reset Password
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700">
                  View Console
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700">
                  Network Settings
                </button>
                <button className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-700">
                  Backup Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
