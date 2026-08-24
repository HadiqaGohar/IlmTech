import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import Card from '@/components/ui/Card';

interface StatsCardProps {
  title: string;
  value: string | number;
  change: number;
  icon: React.ReactNode;
  trend: 'up' | 'down';
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, icon, trend }) => {
  return (
    <Card className="flex items-center gap-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-900/30 dark:text-purple-400">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</p>
        <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      </div>
      <div className={`flex items-center gap-1 text-sm font-medium ${
        trend === 'up' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
      }`}>
        {trend === 'up' ? (
          <TrendingUp className="h-4 w-4" />
        ) : (
          <TrendingDown className="h-4 w-4" />
        )}
        {Math.abs(change)}%
      </div>
    </Card>
  );
};

export default StatsCard;
