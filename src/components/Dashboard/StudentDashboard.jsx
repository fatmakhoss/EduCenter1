import React from 'react';
import { BookOpen, Video, Award, Clock } from 'lucide-react';

function StudentDashboard() {
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Student Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          icon={<BookOpen className="h-6 w-6 text-blue-600" />}
          title="Current Course"
          value="French B2"
        />
        <StatCard
          icon={<Video className="h-6 w-6 text-green-600" />}
          title="Next Session"
          value="2:00 PM"
        />
        <StatCard
          icon={<Award className="h-6 w-6 text-purple-600" />}
          title="Progress"
          value="75%"
        />
        <StatCard
          icon={<Clock className="h-6 w-6 text-orange-600" />}
          title="Study Time"
          value="24h"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Upcoming Sessions</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                    <Video className="h-5 w-5 text-indigo-600" />
                  </div>
                  <div>
                    <p className="font-medium">French Conversation</p>
                    <p className="text-sm text-gray-500">Tomorrow at {i}:00 PM</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-indigo-600 hover:bg-indigo-50 rounded-md">
                  Join
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-lg font-semibold mb-4">Learning Resources</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                    <BookOpen className="h-5 w-5 text-green-600" />
                  </div>
                  <div>
                    <p className="font-medium">Grammar Lesson {i}</p>
                    <p className="text-sm text-gray-500">PDF • Study Material</p>
                  </div>
                </div>
                <button className="px-4 py-2 text-sm text-green-600 hover:bg-green-50 rounded-md">
                  Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCard({ icon, title, value }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center gap-4 mb-4">
        <div className="p-2 bg-gray-50 rounded-lg">{icon}</div>
        <h3 className="text-gray-500 text-sm">{title}</h3>
      </div>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );
}

export default StudentDashboard;