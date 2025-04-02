import { useParams, Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { jsPDF } from 'jspdf';
import api from '../api';

export default function GroupPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [group, setGroup] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [paidMap, setPaidMap] = useState({}); // <-- NEW

  useEffect(() => {
    const fetchGroup = async () => {
      try {
        const res = await api.get(`/groups/${id}`);
        setGroup(res.data);
      } catch (err) {
        console.error('Failed to fetch group:', err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchGroup();
  }, [id]);

  const handleExport = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(group.name + ' - Expense Summary', 10, 10);

    group.expenses.forEach((exp, i) => {
      const y = 20 + i * 10;
      doc.setFontSize(12);
      doc.text(
        `${exp.title} - $${exp.amount} | Paid by: ${exp.paidBy} | Split with: ${exp.splitWith.join(', ')}`,
        10,
        y
      );
    });

    doc.save(`${group.name}-expenses.pdf`);
  };

  const handleDeleteGroup = async () => {
    const confirmed = confirm('Are you sure you want to delete this group?');
    if (!confirmed) return;

    try {
      await api.delete(`/groups/${group.id}`);
      navigate('/');
    } catch (err) {
      console.error('Error deleting group:', err);
    }
  };

  const handleDeleteExpense = async (expenseId) => {
    const confirmDelete = confirm('Delete this expense?');
    if (!confirmDelete) return;

    try {
      await api.delete(`/expenses/${expenseId}`);
      setGroup((prev) => ({
        ...prev,
        expenses: prev.expenses.filter((e) => e.id !== expenseId),
      }));
    } catch (err) {
      console.error('Error deleting expense:', err);
    }
  };

  // ✅ NEW: toggle checkbox state
  const handleCheckboxChange = async (expenseId, person) => {
    try {
      const res = await api.patch(`/expenses/${expenseId}/paid`, {
        expenseId,
        groupId: group.id,
        person
      });
  
      // update local state from response
      const updatedStatus = res.data.paidStatus;
      setGroup(prev => ({
        ...prev,
        expenses: prev.expenses.map(exp =>
          exp.id === expenseId
            ? { ...exp, paidStatus: updatedStatus }
            : exp
        )
      }));
    } catch (err) {
      console.error('Failed to update paid status:', err);
    }
  };
  

  if (loading) {
    return <div className="text-center mt-10 text-gray-600">Loading group...</div>;
  }

  if (error || !group) {
    return <div className="text-center mt-10 text-red-500">Group not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <div className="flex justify-between items-center mb-2">
        <h1 className="text-3xl font-bold">{group.name}</h1>
        <button
          onClick={handleDeleteGroup}
          style={{ backgroundColor: '#e5e7eb' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = '#d1d5db')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = '#e5e7eb')}
          className="text-black font-semibold px-3 py-1 rounded shadow transition-colors duration-150"
        >
          Delete Group
        </button>
      </div>

      <p className="text-gray-600 mb-6">Members: {group.members.join(', ')}</p>

      <div className="flex gap-4 mb-6">
        <Link
          to={`/groups/${group.id}/add`}
          style={{ backgroundColor: 'rgba(129, 165, 197, 0.9)' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(111, 148, 185, 0.9)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(129, 165, 197, 0.9)')}
          className="text-[#2D3640] font-medium px-4 py-2 rounded shadow-sm transition-colors duration-150"
        >
          + Add Expense
        </Link>

        <button
          onClick={handleExport}
          style={{ backgroundColor: 'rgba(187, 201, 181, 0.8)' }}
          onMouseEnter={(e) => (e.target.style.backgroundColor = 'rgba(170, 186, 167, 0.8)')}
          onMouseLeave={(e) => (e.target.style.backgroundColor = 'rgba(187, 201, 181, 0.8)')}
          className="text-[#2D3640] font-medium px-4 py-2 rounded shadow-sm transition-colors duration-150"
        >
          Export Expenses
        </button>
      </div>

      {group.expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <div className="space-y-4">
          {group.expenses.map((expense) => (
            <div key={expense.id} className="relative border border-gray-200 rounded p-4 shadow-sm">
              <button
                onClick={() => handleDeleteExpense(expense.id)}
                className="absolute top-2 right-2 text-red-500 hover:text-red-700 text-sm"
                title="Delete expense"
              >
                ✕
              </button>
              <h3 className="font-semibold text-lg">{expense.title}</h3>
              <p className="text-sm text-gray-600">
                Amount: ${expense.amount} | Paid by: {expense.paidBy}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                {expense.splitWith
                  .filter((person) => person !== expense.paidBy)
                  .map((person) => {
                    const key = `${expense.id}-${person}`;
                    const isChecked = paidMap[key] || false;
                    return (
                      <div key={person} className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={!!expense.paidStatus?.[person]}
                          onChange={() => handleCheckboxChange(expense.id, person)}
                        />

                        <span className={expense.paidStatus?.[person] ? 'line-through text-gray-400' : ''}>
                          {person} owes $
                          {(expense.amount / expense.splitWith.length).toFixed(2)} to {expense.paidBy}
                        </span>
                      </div>
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
