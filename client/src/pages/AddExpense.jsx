import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

// Dummy group (you can replace this later with data from backend)
const dummyGroup = {
  id: '1',
  name: 'Roommates',
  members: ['Victor', 'Jeremiah', 'Johnny'],
};

export default function AddExpense() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState(dummyGroup.members[0]);
  const [splitWith, setSplitWith] = useState(dummyGroup.members);

  const handleCheckboxChange = (member) => {
    if (splitWith.includes(member)) {
      setSplitWith(splitWith.filter((m) => m !== member));
    } else {
      setSplitWith([...splitWith, member]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newExpense = {
      title,
      amount: parseFloat(amount),
      paidBy,
      splitWith,
    };

    console.log('New expense:', newExpense);

    // Redirect to group page (for now)
    navigate(`/groups/${id}`);
  };

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h2 className="text-2xl font-semibold mb-6">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
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
            {dummyGroup.members.map((member) => (
              <option key={member} value={member}>
                {member}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block font-medium mb-2">Split with</label>
          <div className="space-y-2">
            {dummyGroup.members.map((member) => (
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

        <button
          type="submit"
          className="bg-yellow-300 hover:bg-yellow-400 px-4 py-2 rounded font-semibold"
        >
          Add Expense
        </button>
      </form>
    </div>
  );
}
