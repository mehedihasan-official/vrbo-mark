import React, { useContext } from 'react';
import InfoCard from '../../../components/InfoCard/InfoCard';
import { AuthContext } from '../../../providers/AuthProvider/AuthProvider';

const Complete = () => {
    const { hotelData } = useContext(AuthContext);

    const hiltonResorts = hotelData
        ? [...hotelData]
            .filter((hotel) => hotel.title?.toLowerCase().includes("hilton"))
            .sort((a, b) => a.id - b.id)
        : [];

    if (!hotelData) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (hiltonResorts.length === 0) {
        return (
            <div className="flex flex-col justify-center items-center h-64 gap-2">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                        d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-lg font-medium text-gray-500">No completed Hilton reservations found</p>
                <p className="text-sm text-gray-400">Your completed stays will appear here</p>
            </div>
        );
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Completed Reservations</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-6">
                {hiltonResorts.map((resort) => (
                    <InfoCard
                        key={resort.id}
                        data={resort}
                        showStatus={true}
                        statusVariant="success"
                    />
                ))}
            </div>

            <div className="mt-6 text-center text-sm text-gray-500">
                <p>{hiltonResorts.length} Hilton resort{hiltonResorts.length !== 1 ? "s" : ""} found</p>
            </div>
        </div>
    );
};

export default Complete;