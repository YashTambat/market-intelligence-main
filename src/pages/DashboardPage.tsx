import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks/redux';
import { fetchMarketData } from '../features/market/marketSlice';
import { fetchUserStats } from '../features/users/userSlice';
import { selectTotalRevenue, selectVisibleProducts } from '../selectors/revenueSelectors';
import FilterPanel from '../components/FilterPanel';
import MetricCard from '../components/widgets/MetricCard';
import TrendChart from '../components/charts/TrendChart';
import ProductTable from '../components/ProductTable';
import { DollarSign, ShoppingBag, Users, TrendingUp } from 'lucide-react';

const DashboardPage = () => {
  const dispatch = useAppDispatch();
  const { loading: productsLoading } = useAppSelector(state => state.products);
  const { prices, loading: marketLoading } = useAppSelector(state => state.market);
  const { activeUsers, loading: usersLoading } = useAppSelector(state => state.users);
  const totalRevenue = useAppSelector(selectTotalRevenue);
  const visibleProducts = useAppSelector(selectVisibleProducts);

  useEffect(() => {
    dispatch(fetchMarketData());
    dispatch(fetchUserStats());
  }, [dispatch]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-slate-900">Market Intelligence Overview</h1>
        <p className="text-slate-500">Real-time performance and market trends</p>
      </div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard
          title="Total Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change={12.5}
          icon={DollarSign}
          loading={productsLoading}
        />
        <MetricCard
          title="Products Sold"
          value={visibleProducts.length * 14}
          change={-2.4}
          icon={ShoppingBag}
          color="green"
          loading={productsLoading}
        />
        <MetricCard
          title="Active Users"
          value={activeUsers.toLocaleString()}
          change={5.1}
          icon={Users}
          color="purple"
          loading={usersLoading}
        />
        <MetricCard
          title="Market Change"
          value="+4.2%"
          change={0.8}
          icon={TrendingUp}
          color="orange"
          loading={marketLoading}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrendChart
          title="Product Sales Trend"
          data={[
            { name: 'Jan', value: 400 },
            { name: 'Feb', value: 300 },
            { name: 'Mar', value: 600 },
            { name: 'Apr', value: 800 },
            { name: 'May', value: 500 },
            { name: 'Jun', value: 900 },
          ]}
          dataKey="value"
        />
        <TrendChart
          title="Market Price Trend (BTC/USD)"
          data={prices}
          dataKey="value"
          color="#f59e0b"
          type="area"
        />
      </div>
      <FilterPanel />

      <div>
        <h2 className="text-xl font-bold text-slate-900 mb-4">Product Inventory</h2>
        <ProductTable />
      </div>
    </div>
  );
};

export default DashboardPage;
