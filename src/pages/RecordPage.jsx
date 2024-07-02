import React from 'react';
import { useGetUserHistoryQuery } from '../store/states/authApi';

const RecordPage = () => {
  const { data: history, error, isLoading } = useGetUserHistoryQuery();

  if (isLoading) return <div className="text-center py-4 text-gray-600 font-semibold">Loading...</div>;
  if (error) return <div className="text-center py-4 text-red-600 font-semibold">Error loading history</div>;

  return (
    <div className="container mx-auto p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 text-center">User Purchase History</h1>
      {history && history.length > 0 ? (
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full bg-white border border-gray-300">
            <thead>
              <tr className="bg-gray-200 text-gray-700">
                <th className="py-3 px-4 border-b text-left">User</th>
                <th className="py-3 px-4 border-b text-left">Game</th>
                <th className="py-3 px-4 border-b text-left">Price</th>
                <th className="py-3 px-4 border-b text-left">Status</th>
                <th className="py-3 px-4 border-b text-left">Created At</th>
              </tr>
            </thead>
            <tbody>
              {history.map((payment, index) => (
                <tr key={index} className={`even:bg-gray-100 odd:bg-white`}>
                  <td className="py-2 px-4 border-b">{payment.user}</td>
                  <td className="py-2 px-4 border-b">{payment.game}</td>
                  <td className="py-2 px-4 border-b">{payment.price}</td>
                  <td className="py-2 px-4 border-b">{payment.status}</td>
                  <td className="py-2 px-4 border-b">{new Date(payment.created_at).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-4 text-gray-600 font-semibold">No purchase history available</div>
      )}
    </div>
  );
};

export default RecordPage;

