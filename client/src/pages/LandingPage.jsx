import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';

export default function LandingPage() {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const res = await api.get('/groups');
        setGroups(res.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
      }
    };

    fetchGroups();
  }, []);

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-6">Split the Bill</h1>

      <Link
        to="/create"
        className="inline-block bg-yellow-300 hover:bg-yellow-400 text-black font-semibold py-2 px-4 rounded mb-8"
      >
        + Create Group
      </Link>

      <div className="space-y-4">
        {groups.map((group) => (
          <Link
            key={group.id}
            to={`/groups/${group.id}`}
            className="block p-4 border border-gray-200 rounded hover:bg-gray-100"
          >
            {group.name}
          </Link>
        ))}
      </div>
    </div>
  );
}
