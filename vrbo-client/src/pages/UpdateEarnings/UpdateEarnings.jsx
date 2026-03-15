import React, { useContext, useState, useEffect } from 'react';
import { AuthContext } from '../../providers/AuthProvider/AuthProvider';

const UpdateEarnings = () => {
  const { yearlyEarnings, updateYearlyEarnings, user, admin, loading } = useContext(AuthContext        );
  const [editedEarnings, setEditedEarnings] = useState([]);
  const [notification, setNotification] = useState({ type: '', message: '' });

  useEffect(() => {
    if (Array.isArray(yearlyEarnings)) {
      setEditedEarnings(yearlyEarnings.map(item => ({ ...item, originalAmount: item.amount })));
    }
  }, [yearlyEarnings]);

  const handleChange = (index, value) => {
    const updated = [...editedEarnings];
    updated[index].amount = parseFloat(value) || 0;
    setEditedEarnings(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setNotification({ type: '', message: '' });
    if (!admin) { setNotification({ type: 'error', message: 'Unauthorized access' }); return; }
    try {
      const changes = editedEarnings.filter(item => item.amount !== item.originalAmount).map(({ year, amount }) => ({ year, amount }));
      if (changes.length === 0) { setNotification({ type: 'info', message: 'No changes detected' }); return; }
      await updateYearlyEarnings(changes);
      setNotification({ type: 'success', message: 'Earnings updated successfully!' });
      setEditedEarnings(prev => prev.map(item => ({ ...item, originalAmount: item.amount })));
    } catch (error) {
      setNotification({ type: 'error', message: 'Failed to update earnings. Please try again.' });
    }
  };

  const hasChanges = editedEarnings.some(item => item.amount !== item.originalAmount);

  if (loading) return (
    <div className="flex justify-center items-center h-64 bg-white dark:bg-gray-950">
      <p className="text-lg text-gray-600 dark:text-gray-400">Loading earnings data...</p>
    </div>
  );

  return (
    <div className="container mx-auto my-10 px-4 bg-white dark:bg-gray-950 min-h-screen transition-colors duration-300">
      <h1 className="text-2xl font-bold mb-6 text-center text-gray-800 dark:text-white">Update Yearly Earnings</h1>

      {!admin ? (
        <div className="max-w-3xl mx-auto bg-yellow-100 dark:bg-yellow-950 border-l-4 border-yellow-500 p-4">
          <p className="text-yellow-700 dark:text-yellow-400">You need admin privileges to edit earnings data.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            {notification.message && (
              <div className={`mb-4 p-3 rounded border ${
                notification.type === 'error' ? 'bg-red-100 dark:bg-red-950 border-red-400 text-red-700 dark:text-red-400'
                : notification.type === 'success' ? 'bg-green-100 dark:bg-green-950 border-green-400 text-green-700 dark:text-green-400'
                : 'bg-blue-100 dark:bg-blue-950 border-blue-400 text-blue-700 dark:text-blue-400'
              }`}>
                {notification.message}
              </div>
            )}

            <div className="space-y-4 mb-6">
              {editedEarnings.map((entry, index) => (
                <div key={`${entry.year}-${index}`} className="grid grid-cols-12 items-center gap-4 p-3 border-b border-gray-200 dark:border-gray-700">
                  <span className="col-span-2 font-medium text-gray-800 dark:text-gray-200">{entry.year}</span>
                  <div className="col-span-8 relative">
                    <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 dark:text-gray-400">$</span>
                    <input type="number" step="0.01" min="0" value={entry.amount} onChange={(e) => handleChange(index, e.target.value)}
                      className="w-full pl-8 pr-3 py-2 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500" />
                  </div>
                  <div className="col-span-2 text-right">
                    {entry.amount !== entry.originalAmount && <span className="text-xs text-blue-600 dark:text-blue-400">Modified</span>}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-500 dark:text-gray-400">
                {hasChanges ? 'You have unsaved changes' : 'All changes saved'}
              </span>
              <button type="submit" disabled={!hasChanges || loading}
                className={`px-6 py-2 rounded-md font-medium text-white ${hasChanges ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'} transition-colors`}>
                {loading ? 'Saving...' : 'Save Changes'}
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};

export default UpdateEarnings;
