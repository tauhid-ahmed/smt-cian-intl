import React from 'react';
import { Check, Calendar, X } from 'lucide-react';

const SubscriptionsPage = () => {
  return (
    <div className="min-h-screen bg-black text-white p-4 sm:p-6">
      {/* Header */}
      <div className="mb-6 sm:mb-8">
        <h1 className="text-2xl sm:text-3xl font-bold mb-2">Active Subscriptions</h1>
        <p className="text-gray-400 text-sm sm:text-base">Manage your Faithful Discoverers subscriptions</p>
      </div>

      {/* Active Subscription Card */}
      <div className="border border-yellow-600/50 rounded-lg p-4 sm:p-6 mb-6 sm:mb-8 bg-linear-to-br from-yellow-900/10 to-transparent">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-4">
          <div className="flex items-center gap-3">
            <span className="text-lg sm:text-xl font-semibold">Premium Member</span>
            <span className="bg-green-600 text-white text-xs px-2 sm:px-3 py-1 rounded-full">
              Active
            </span>
          </div>
          <button className="flex items-center gap-2 text-red-500 hover:text-red-400 transition-colors self-start sm:self-auto">
            <X className="w-4 h-4" />
            <span className="text-sm">Cancel</span>
          </button>
        </div>

        <div className="text-xl sm:text-2xl font-bold mb-3">$19.99</div>

        <div className="flex items-center gap-2 text-gray-300 mb-4">
          <Calendar className="w-4 h-4" />
          <span className="text-sm">Next billing: November 15, 2925</span>
        </div>

        <div>
          <p className="text-sm font-semibold mb-3">Your Benefits:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Free shipping on all orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Early access to sales</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Free shipping on all orders</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Priority customer support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Exclusive member discounts</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-green-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-green-500" />
              </div>
              <span className="text-sm text-gray-300">Monthly reward points bonus</span>
            </div>
          </div>
        </div>

        <div className="text-right mt-4">
          <span className="text-lg sm:text-xl font-bold">$34.99/monthly</span>
        </div>
      </div>

      {/* Pricing Plans Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {/* Basic Plan */}
        <div className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-900/50 hover:border-gray-600 transition-colors flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Basic</h3>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">
            $19.99<span className="text-base sm:text-lg text-gray-400">/mo</span>
          </div>
          <div className="space-y-3 mb-6 grow">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">1 Album (digital)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Early access to releases</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Review privileges</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Member community</span>
            </div>
          </div>
          <button className="w-full py-2 sm:py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors font-semibold text-sm sm:text-base mt-auto">
            Select
          </button>
        </div>

        {/* Premium Plan */}
        <div className="border border-yellow-600 rounded-lg p-4 sm:p-6 bg-linear-to-br from-yellow-900/20 to-transparent relative hover:border-yellow-500 transition-colors flex flex-col">
          <span className="absolute top-3 sm:top-4 right-3 sm:right-4 bg-yellow-500 text-black text-xs px-2 sm:px-3 py-1 rounded-full font-bold">
            Popular
          </span>
          <h3 className="text-lg sm:text-xl font-bold mb-4">Premium</h3>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">
            $34.99<span className="text-base sm:text-lg text-gray-400">/mo</span>
          </div>
          <div className="space-y-3 mb-6 grow">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">2 Albums (CD/vinyl)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">All Basic features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Exclusive tracks</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Artist content</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Priority support</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">1 merch item</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Digital bonus content</span>
            </div>
          </div>
          <button className="w-full py-2 sm:py-3 bg-white text-black rounded-lg hover:bg-gray-200 transition-colors font-semibold text-sm sm:text-base mt-auto">
            Running
          </button>
        </div>

        {/* VIP Plan */}
        <div className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-900/50 hover:border-gray-600 transition-colors flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-4">VIP</h3>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">
            $59.99<span className="text-base sm:text-lg text-gray-400">/mo</span>
          </div>
          <div className="space-y-3 mb-6 grow">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">3 Albums (vinyl)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">All Premium features</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Signed merch</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Video call with artist (1/year)</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">2 merch items</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Featured reviews</span>
            </div>
          </div>
          <button className="w-full py-2 sm:py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors font-semibold text-sm sm:text-base mt-auto">
            Select
          </button>
        </div>

        {/* Church Plan */}
        <div className="border border-gray-700 rounded-lg p-4 sm:p-6 bg-gray-900/50 hover:border-gray-600 transition-colors flex flex-col">
          <h3 className="text-lg sm:text-xl font-bold mb-4">Church</h3>
          <div className="text-2xl sm:text-3xl font-bold text-yellow-500 mb-4 sm:mb-6">
            Custom Pricing
          </div>
          <div className="space-y-3 mb-6 grow">
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Bulk licenses</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Custom selection</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Group rates</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Church resources</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-full border-2 border-gray-500 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-gray-500" />
              </div>
              <span className="text-sm text-gray-300">Bulk downloads</span>
            </div>
          </div>
          <button className="w-full py-2 sm:py-3 border-2 border-white rounded-lg hover:bg-white hover:text-black transition-colors font-semibold text-sm sm:text-base mt-auto">
            Contact us
          </button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionsPage;