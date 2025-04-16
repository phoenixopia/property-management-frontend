"use client";
import React from 'react';
import { faList } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslations } from 'next-intl';

interface User {
  id: number;
  first_name: string | null;
  last_name: string | null;
  date_joined: string;
}

interface LatestAddedTenantsProps {
  users: User[];
}

const LatestAddedTenants = ({ users }: LatestAddedTenantsProps) => {
  const t = useTranslations('full');

  return (
    <div className="w-full max-w-md overflow-auto max-h-[28rem] p-4 rounded-xl dark:bg-[#2f2f32]">
      <div className="flex items-center justify-start gap-2 mb-4">
        <span className=''>       
          <FontAwesomeIcon icon={faList} className='text-black w-4 dark:text-gray-50 text-2xl'/>
        </span>
        <p className='text-gray-800 dark:text-gray-50 text-sm font-bold '>
          {t('latest-added-users')}
        </p>
      </div>

      <ul className="space-y-3">
        {users.slice(0, 10).map((user) => (
          <li
            key={user.id}
            className="flex flex-col bg-gray-50 dark:bg-[#38393c] p-3 rounded-lg shadow-sm hover:bg-gray-100 dark:hover:bg-[#444547] transition"
          >
            <span className="text-gray-800 dark:text-gray-100 text-sm font-semibold">
              {new Date(user.date_joined).toLocaleDateString()}
            </span>
            <span className="text-gray-500 dark:text-gray-300 text-xs">
              {user.first_name || 'Unknown'} {user.last_name || ''} is-added
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LatestAddedTenants;