"use client";

import React, { useState } from "react";
import { User, Shield, Trash2, Save, Key } from "lucide-react";

export default function Page() {
  const [activeTab, setActiveTab] = useState("personal");
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  // Personal Info State
  const [personalInfo, setPersonalInfo] = useState({
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
  });

  // Password State
  const [passwordInfo, setPasswordInfo] = useState({
    newPassword: "",
    confirmPassword: "",
  });

  const tabs = [
    { id: "personal", label: "Personal Info", icon: User },
    { id: "security", label: "Security", icon: Shield },
    { id: "delete", label: "Delete Account", icon: Trash2 },
  ];

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordInfo((prev) => ({ ...prev, [field]: value }));
  };

  const handleSavePersonalInfo = () => {
    console.log("Saving personal info:", personalInfo);
  };

  const handleSavePassword = () => {
    if (passwordInfo.newPassword !== passwordInfo.confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
    console.log("Changing password");
    setIsChangingPassword(false);
    setPasswordInfo({
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleDeleteAccount = () => {
    if (
      confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    ) {
      console.log("Deleting account");
    }
  };

  return (
    <div className="p-4 sm:p-6 text-white">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Account Settings</h1>
        <p className="text-gray-400 mt-2 text-sm sm:text-base">
          Manage your account preferences and security
        </p>
      </div>

      {/* Tab Bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        {tabs.map((tab) => {
          const IconComponent = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 sm:px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-gray-700 text-white"
                  : "text-gray-400 hover:text-white hover:bg-gray-800"
              }`}
            >
              <IconComponent className="w-4 h-4" />
              {tab.label}
            </button>
          );
        })}
      </div>

      {/* Tab Content */}
      <div>
        {/* Personal Info Tab */}
        {activeTab === "personal" && (
          <div>
            <h2 className="text-xl font-semibold text-white mb-6">
              Personal Information
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  First Name
                </label>
                <input
                  type="text"
                  value={personalInfo.firstName}
                  onChange={(e) =>
                    handlePersonalInfoChange("firstName", e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Last Name
                </label>
                <input
                  type="text"
                  value={personalInfo.lastName}
                  onChange={(e) =>
                    handlePersonalInfoChange("lastName", e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Email
                </label>
                <input
                  type="email"
                  value={personalInfo.email}
                  onChange={(e) =>
                    handlePersonalInfoChange("email", e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  value={personalInfo.phone}
                  onChange={(e) =>
                    handlePersonalInfoChange("phone", e.target.value)
                  }
                  className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                />
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleSavePersonalInfo}
                className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
              >
                <Save className="w-4 h-4" />
                Save Changes
              </button>
            </div>
          </div>
        )}

        {/* Security Tab */}
        {activeTab === "security" && (
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 rounded-lg mb-4">
              <div>
                <h3 className="font-medium text-white">Password</h3>
                <p className="text-sm text-gray-400 mt-1">
                  Last changed 2 months ago
                </p>
              </div>
              <button
                onClick={() => setIsChangingPassword(!isChangingPassword)}
                className="mt-3 sm:mt-0 flex items-center gap-2 border border-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition-colors font-semibold text-sm"
              >
                <Key className="w-4 h-4" />
                {isChangingPassword ? "Hide Form" : "Change Password"}
              </button>
            </div>

            {isChangingPassword && (
              <div className="space-y-4 p-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      New Password
                    </label>
                    <input
                      type="password"
                      value={passwordInfo.newPassword}
                      onChange={(e) =>
                        handlePasswordChange("newPassword", e.target.value)
                      }
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">
                      Confirm New Password
                    </label>
                    <input
                      type="password"
                      value={passwordInfo.confirmPassword}
                      onChange={(e) =>
                        handlePasswordChange("confirmPassword", e.target.value)
                      }
                      className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-gray-400"
                    />
                  </div>
                </div>
                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setIsChangingPassword(false)}
                    className="px-4 py-2 border border-gray-400 text-gray-400 rounded-lg hover:bg-gray-800 transition-colors font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSavePassword}
                    className="flex items-center gap-2 bg-white text-black px-6 py-2 rounded-lg hover:bg-gray-200 transition-colors font-semibold"
                  >
                    <Save className="w-4 h-4" />
                    Save Password
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Delete Account Tab */}
        {activeTab === "delete" && (
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 gap-4">
            <div>
              <h3 className="font-medium text-white">Delete Account</h3>
              <p className="text-sm text-gray-400 mt-1">
                Permanently delete your account and all associated data
              </p>
            </div>
            <button
              onClick={handleDeleteAccount}
              className="flex items-center justify-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold text-sm w-full sm:w-auto"
            >
              <Trash2 className="w-4 h-4" />
              Delete Account
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
