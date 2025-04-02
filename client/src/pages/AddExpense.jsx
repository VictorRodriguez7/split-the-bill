import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';

export default function AddExpense() {
  const { id } = useParams(); // group ID
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState('');
  const [members, setMembers] = useState([]);
  const [splitWith, setSplitWith] = useState([]);

  // Fetch group members from backend
  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${id}`);
        setMembers(res.data.members);
        setPaidBy(res.data.members[0]);
        setSplitWith(res.data.members); // default: split with all
      } catch (err) {
        console.error('Failed to load group:', err);
      }
    };

    fetchGroup();
  }, [id]);

  const handleCheckboxChange = (member) => {
    if (splitWith.includes(member)) {
      setSplitWith(splitWith.filter((m) => m !== member));
    } else {
      setSplitWith([...splitWith, member]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post('/expenses', {
        groupId: id,
        title,
        amount: parseFloat(amount),
        paidBy,
        splitWith,
      });

      navigate(`/groups/${id}`);
    } catch (err) {
      console.error('Failed to add expense:', err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add Expense</h2>
      <form onSubmit={handleSubmit}
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
          <label className="block font-medium">Title</label>
          <input
            type="text"
            className="w-full border px-3 py-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Amount</label>
          <input
            type="number"
            step="0.01"
            className="w-full border px-3 py-2 rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block font-medium">Paid by</label>
          <select
            className="w-full border px-3 py-2 rounded"
            value={paidBy}
            onChange={(e) => setPaidBy(e.target.value)}
          >
            {members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Split with</label>
          <div className="space-y-2">
            {members.map((member) => (
              <label key={member} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={splitWith.includes(member)}
                  onChange={() => handleCheckboxChange(member)}
                />
                {member}
              </label>
            ))}
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            style={{ backgroundColor: '#F8DFA2' }}
            onMouseEnter={(e) => (e.target.style.backgroundColor = '#f1ce73')}
            onMouseLeave={(e) => (e.target.style.backgroundColor = '#F8DFA2')}
            className="text-black font-semibold px-4 py-2 rounded shadow transition-colors duration-150"
          >
            Add
          </button>

          <button
            type="button"
            onClick={() => navigate(`/groups/${id}`)}
            className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded font-medium"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
