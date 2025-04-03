import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';
import getUserId from '../utils/getUserId'; // ⬅️ Import the userId helper

export default function CreateGroup() {
  const [groupName, setGroupName] = useState('');
  const [members, setMembers] = useState(['']);
  const navigate = useNavigate();

  const handleMemberChange = (index, value) => {
    const newMembers = [...members];
    newMembers[index] = value;
    setMembers(newMembers);
  };

  const addMember = () => {
    setMembers([...members, '']);
  };

  const removeMember = (index) => {
    const newMembers = [...members];
    newMembers.splice(index, 1);
    setMembers(newMembers);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const userId = getUserId(); // ⬅️ Get stored or generate userId

      const res = await api.post('/groups', {
        name: groupName,
        members: members.filter((m) => m.trim() !== ''),
        userId
      });

      console.log('Group created:', res.data);
      navigate('/');
    } catch (err) {
      console.error('Error creating group:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Create a New Group</h2>
      <form
        onSubmit={handleSubmit}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            e.preventDefault();
            const form = e.target.form;
            const index = Array.prototype.indexOf.call(form, e.target);
            form.elements[index + 1]?.focus();
          }
        }}
        className="space-y-4"
      >
        <div>
          <label className="block font-medium">Group Name</label>
          <input
            className="w-full border border-gray-300 rounded px-3 py-2 mt-1"
            type="text"
            value={groupName}
            onChange={(e) => setGroupName(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium mb-1">Group Members</label>
          {members.map((member, index) => (
            <div key={index} className="flex items-center mb-2">
              <input
                type="text"
                value={member}
                onChange={(e) => handleMemberChange(index, e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2"
                required
              />
              {members.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMember(index)}
                  className="ml-2 text-red-500"
                >
                  ✕
                </button>
              )}
            </div>
          ))}
          <button
            type="button"
            onClick={addMember}
            className="text-sm text-blue-500 hover:underline"
          >
            + Add another member
          </button>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            style={{ backgroundColor: '#F8DFA2' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f1ce73')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#F8DFA2')}
            className="text-black font-semibold px-4 py-2 rounded shadow transition-colors duration-150"
          >
            Create
          </button>

          <button
            type="button"
            onClick={() => navigate('/')}
            className="bg-gray-200 hover:bg-gray-300 text-black font-medium py-2 px-4 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
