import { useParams, Link } from 'react-router-dom';
import { jsPDF } from 'jspdf'; // For PDF export

const dummyGroups = [
  {
    id: '1',
    name: 'Roommates',
    members: ['Victor', 'Jeremiah', 'Johnny'],
    expenses: [
      {
        id: 'exp1',
        title: 'Groceries',
        amount: 60,
        paidBy: 'Victor',
        splitWith: ['Victor', 'Jeremiah', 'Johnny']
      },
      {
        id: 'exp2',
        title: 'Pizza Night',
        amount: 40,
        paidBy: 'Jeremiah',
        splitWith: ['Jeremiah', 'Johnny']
      }
    ]
  }
];

export default function GroupPage() {
  const { id } = useParams();
  const group = dummyGroups.find((g) => g.id === id);

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

  if (!group) {
    return <div className="text-center mt-10 text-gray-600">Group not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-2">{group.name}</h1>
      <p className="text-gray-600 mb-6">Members: {group.members.join(', ')}</p>

      <div className="flex gap-4 mb-6">
        <Link
          to={`/groups/${group.id}/add`}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Expense
        </Link>

        <button
          onClick={handleExport}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Export Expenses
        </button>
      </div>

      {group.expenses.length === 0 ? (
        <p className="text-gray-500">No expenses added yet.</p>
      ) : (
        <div className="space-y-4">
          {group.expenses.map((expense) => (
            <div
              key={expense.id}
              className="border border-gray-200 rounded p-4 shadow-sm"
            >
              <h3 className="font-semibold text-lg">{expense.title}</h3>
              <p className="text-sm text-gray-600">
                Amount: ${expense.amount} | Paid by: {expense.paidBy}
              </p>
              <div className="mt-2 text-sm text-gray-600">
                {expense.splitWith
                  .filter((person) => person !== expense.paidBy)
                  .map((person) => (
                    <div key={person} className="flex items-center gap-2">
                      <input type="checkbox" disabled />
                      <span>
                        {person} owes ${(
                          expense.amount / expense.splitWith.length
                        ).toFixed(2)}{' '}
                        to {expense.paidBy}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
