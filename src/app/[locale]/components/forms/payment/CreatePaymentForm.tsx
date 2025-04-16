import React, { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { fetchRentCycles, submitPayment } from '@/actions/payment';
import { useTranslations } from 'next-intl';
import toast from 'react-hot-toast';

type RentCycle = {
  id: number;
  cycle_start: string;
  cycle_end: string;
  is_paid: boolean;
  amount_due: number;
  payment: {
    amount: number | null;
    due_date: string | null;
    status: string;
    payment_method: string;
    transaction_id: string;
  };
};

type PaymentFormData = {
  rent_id: number;
  cycle_ids: number[];
  payment_method: string;
  transaction_id: string;
};

const CreatePaymentForm = ({ rentId, onSuccess }: { rentId: number; onSuccess?: () => void }) => {
  const t = useTranslations('full');
  const [selectedCycles, setSelectedCycles] = useState<number[]>([]);
  const [paymentMethod, setPaymentMethod] = useState('cbe');
  const [transactionId, setTransactionId] = useState('');

  // Fetch rent cycles
  const { data: cyclesData, isLoading, error } = useQuery({
    queryKey: ['rentCycles', rentId],
    queryFn: () => fetchRentCycles(rentId),
  });

  // Payment submission mutation
  const paymentMutation = useMutation({
    mutationFn: (data: PaymentFormData) => submitPayment(data),
    onSuccess: () => {
      toast.success(t('payment-success'));
      if (onSuccess) onSuccess();
    },
    onError: () => {
      toast.error(t('payment-error'));
    },
  });

  const handleCycleSelection = (cycleId: number) => {
    setSelectedCycles(prev =>
      prev.includes(cycleId)
        ? prev.filter(id => id !== cycleId)
        : [...prev, cycleId]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedCycles.length === 0) {
      toast.error(t('select-at-least-one-cycle'));
      return;
    }

    paymentMutation.mutate({
      rent_id: rentId,
      cycle_ids: selectedCycles,
      payment_method: paymentMethod,
      transaction_id: transactionId,
    });
  };

  if (isLoading) return (
    <div className="flex justify-center items-center h-64">
      <div className="text-gray-500 text-sm">Loading...</div>
    </div>
  );

  if (error) return (
    <div className="bg-red-50 border-l-4 border-red-500 p-4">
      <div className="flex">
        <div className="flex-shrink-0">
          <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        </div>
        <div className="ml-3">
          <p className="text-sm text-red-700">{t('error-loading-cycles')}</p>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col h-auto  bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 overflow-auto">
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-gray-800 dark:text-white">{t('select-cycles-to-pay')}</h3>
        <p className=" text-gray-500 dark:text-gray-400 mt-1 text-xs">
          Select the payment cycles you want to pay for
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
          <div className="max-h-96 overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('select')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('cycle')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('amount')}
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    {t('status')}
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                {cyclesData?.data?.map((cycle: RentCycle) => (
                  <tr key={cycle.id} className="hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={selectedCycles.includes(cycle.id)}
                        onChange={() => handleCycleSelection(cycle.id)}
                        disabled={(cycle.payment?.status === "payment complete" || cycle.payment?.status === "pending")}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded dark:bg-gray-800 dark:border-gray-600"
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {new Date(cycle.cycle_start).toLocaleDateString()} - {new Date(cycle.cycle_end).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800 dark:text-gray-200">
                      {cycle.amount_due.toLocaleString()} ETB
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        cycle.payment?.status === "payment complete" 
                          ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                          : cycle.payment?.status === "pending" 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                              : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                      }`}>
                        {cycle.payment?.status === "payment complete" 
                          ? t('paid') 
                          : cycle.payment?.status === "pending" 
                              ? t('pending') 
                              : t('unpaid')}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label htmlFor="paymentMethod" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('payment-method')}
            </label>
            <div className="relative">
              <select
                id="paymentMethod"
                value={paymentMethod}
                onChange={(e) => setPaymentMethod(e.target.value)}
                className="block w-full pl-3 pr-10 py-2.5 text-base border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              >
                <option value="cbe">CBE</option>
                <option value="oromia_bank">Oromia Bank</option>
                <option value="telebirr">Telebirr</option>
                <option value="bank_transfer">Bank Transfer</option>
                <option value="cash">Cash</option>
              </select>
           
            </div>
          </div>

          <div>
            <label htmlFor="transactionId" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              {t('transaction-id')}
            </label>
            <input
              type="text"
              id="transactionId"
              value={transactionId}
              placeholder="Enter transaction ID"
              onChange={(e) => setTransactionId(e.target.value)}
              className="block w-full px-3 py-2.5 border border-gray-300 dark:border-gray-600 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white sm:text-sm"
              required
            />
          </div>
        </div>

        <div className="flex justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={onSuccess}
            className="inline-flex items-center px-4 py-2 border border-gray-300 dark:border-gray-600 shadow-sm text-sm font-medium rounded-lg text-gray-700 dark:text-gray-200 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            {t('cancel')}
          </button>
          <button
            type="submit"
            disabled={paymentMutation.isPending}
            className="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {paymentMutation.isPending ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {t('processing')}
              </>
            ) : (
              t('submit-payment')
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreatePaymentForm;