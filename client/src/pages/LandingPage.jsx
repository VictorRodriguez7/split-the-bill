import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import getUserId from '../utils/getUserId'; // ⬅️ import helper

export default function LandingPage() {
  const [groups, setGroups] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchGroups = async () => {
      try {
        const userId = getUserId();
        const res = await api.get(`/groups?userId=${userId}`);

        setGroups(res.data);
      } catch (err) {
        console.error('Failed to fetch groups:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGroups();
  }, []);

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading groups...</div>;
  }

  if (error) {
    return <div className="text-center mt-10 text-red-500">Failed to load groups.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-4">Split the Bill</h1>
      <p className="text-gray-600 mb-6">
        No more awkward texts or forgotten IOUs — Split the Bill makes tracking group expenses easy, fair, and kinda fun.
      </p>

      <Link
        to="/create"
        style={{ backgroundColor: '#F8DFA2' }}
        onMouseEnter={(e) => (e.target.style.backgroundColor = '#f1ce73')}
        onMouseLeave={(e) => (e.target.style.backgroundColor = '#F8DFA2')}
        className="text-black font-semibold px-4 py-2 rounded shadow mb-8 inline-block transition-colors duration-150"
      >
        + Create Group
      </Link>

      <hr className="mt-0 my-6" />

      <h2 className="text-xl font-semibold text-gray-700 mb-4">Groups</h2>

      {groups.length === 0 ? (
        <p className="text-gray-500">No groups yet. Create one to get started!</p>
      ) : (
        <div className="space-y-4">
          {groups.map((group) => (
            <Link
              key={group.id}
              to={`/groups/${group.id}`}
              style={{
                backgroundColor: 'rgba(129, 165, 197, 0.8)',
                color: '#2D3640'
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = '#6f94b9')}
              onMouseLeave={(e) => (e.target.style.backgroundColor = '#81A5C5')}
              className="block py-8 px-6 rounded shadow-sm font-semibold text-lg text-white transition-colors duration-150"
            >
              {group.name}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
