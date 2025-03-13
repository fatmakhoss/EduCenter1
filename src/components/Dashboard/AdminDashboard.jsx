import React from 'react';
import { Users, BookOpen, Video, BarChart } from 'lucide-react';

function AdminDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Admin Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<Users className="h-6 w-6 text-blue-600" />}
          title="Total Users"
          value="1,234"
          change="+12%"
        />
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-green-600" />}
          title="Active Courses"
          value="45"
          change="+5%"
        />
        <StatCard
          icon={<Video className="h-6 w-6 text-purple-600" />}
          title="Live Sessions"
          value="8"
          change="Today"
        />
        <StatCard
          icon={<BarChart className="h-6 w-6 text-orange-600" />}
          title="Completion Rate"
          value="87%"
          change="+3%"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Recent Registrations</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Users className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">Student Name {i}</p>
                    <p className="text-sm text-gray-500">French - Beginner</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                  Approve
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">English Advanced - Group {i}</p>
                    <p className="text-sm text-gray-500">Today at {i + 1}:00 PM</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value, change }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <span className="text-sm text-green-600">{change}</span>
      </div>
      <h3 className="text-gray-500 text-sm">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default AdminDashboard;