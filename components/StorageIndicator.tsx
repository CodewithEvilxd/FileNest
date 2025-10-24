"use client";

import { useEffect, useState } from "react";
import { Progress } from "./ui/progress";

interface StorageUsage {
  usage: {
    bytes: number;
    formatted: string;
    percentage: number;
  };
  limit: {
    bytes: number;
    formatted: string;
  };
  remaining: {
    bytes: number;
    formatted: string;
  };
  canUpload: boolean;
}

interface StorageIndicatorProps {
  onStorageUpdate?: (usage: StorageUsage) => void;
}

export default function StorageIndicator({ onStorageUpdate }: StorageIndicatorProps) {
  const [storage, setStorage] = useState<StorageUsage | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchStorageUsage = async () => {
    try {
      console.log('Fetching storage usage...');
      const response = await fetch("/api/storage/usage");
      console.log('Storage API response:', response.status, response.statusText);

      if (response.ok) {
        const data = await response.json();
        console.log('Storage data received:', data);
        setStorage(data);
        onStorageUpdate?.(data);
      } else {
        console.error('Storage API error:', response.status, response.statusText);
        const errorText = await response.text();
        console.error('Error response body:', errorText);
      }
    } catch (error) {
      console.error('Failed to fetch storage usage:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStorageUsage();
  }, []);

  if (loading) {
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="space-y-4">
            <div className="text-sm text-gray-300 font-medium">Storage Usage</div>
            <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
              <div className="text-xs text-center py-1 text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!storage) {
    console.log('No storage data available');
    return (
      <div className="w-full max-w-md mx-auto">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20">
          <div className="space-y-4">
            <div className="text-sm text-gray-300 font-medium">Storage Usage</div>
            <div className="h-3 bg-gray-700/50 rounded-full overflow-hidden shadow-inner">
              <div className="text-xs text-center py-1 text-gray-500">Loading...</div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  const isNearLimit = storage.usage.percentage >= 80;
  const isAtLimit = storage.usage.percentage >= 95;

  return (
    <div className="w-full">
      {/* Storage Usage Display */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="space-y-4">
          {/* Header */}
          <div className="text-center">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Storage Usage</h3>
            <p className="text-lg text-gray-700 font-medium">
              {storage.usage.formatted} of {storage.limit.formatted}
            </p>
          </div>

          {/* Storage Bar */}
          <div className="relative">
            <div className="h-6 bg-gray-200 rounded-full overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full transition-all duration-500 ease-out shadow-sm"
                style={{
                  width: `${Math.max(storage.usage.percentage, 0.5)}%`,
                  background: isAtLimit
                    ? 'linear-gradient(90deg, #ef4444, #dc2626)'
                    : isNearLimit
                    ? 'linear-gradient(90deg, #f59e0b, #d97706)'
                    : 'linear-gradient(90deg, #10b981, #059669)'
                }}
              />
            </div>
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(storage.usage.bytes / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="text-sm text-gray-600">Used</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">
                {(storage.remaining.bytes / 1024 / 1024).toFixed(2)} MB
              </div>
              <div className="text-sm text-gray-600">Remaining</div>
            </div>
          </div>

          {/* Warning for near/at limit */}
          {isNearLimit && (
            <div className={`text-center p-3 rounded-lg ${
              isAtLimit
                ? 'bg-red-50 text-red-700 border border-red-200'
                : 'bg-yellow-50 text-yellow-700 border border-yellow-200'
            }`}>
              <div className="font-medium">
                {isAtLimit
                  ? "Storage full - cannot upload more files"
                  : "Storage running low"}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
