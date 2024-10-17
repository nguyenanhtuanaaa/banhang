import React, { useEffect, useState } from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js'; 
import axios from 'axios';
import Cookies from 'js-cookie';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement);

const RevenueAnalytics = () => {
  const [analyticsData, setAnalyticsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const token = Cookies.get('access_token');
        if (!token) {
          throw new Error('Token not found');
        }

        // Fetch analytics data
        const response = await axios.get('http://localhost:3030/admin/analytics', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log('Analytics Response:', response.data);
        setAnalyticsData(response.data.data);
      } catch (error) {
        console.error("Error fetching analytics data", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!analyticsData || !analyticsData.totalRevenueByCategory || !analyticsData.totalRevenueByCategory.length) {
    return <div>Không có dữ liệu</div>; 
  }

  const labels = analyticsData.totalRevenueByCategory.map(item => item.category);
  const dataValues = analyticsData.totalRevenueByCategory.map(item => item.totalRevenue);

  const barData = {
    labels: labels,
    datasets: [{
      label: 'Doanh thu theo danh mục',
      data: dataValues,
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
      borderColor: 'rgba(75, 192, 192, 1)',
      borderWidth: 1,
    }]
  };

  // Bar chart options
  const barOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo danh mục',
      },
    },
  };


  const orderRevenueData = analyticsData.revenuePercentage; 

  if (!Array.isArray(orderRevenueData)) {
    console.error("orderRevenueData is not an array", orderRevenueData);
    return <div>Không có dữ liệu cho doanh thu từng đơn hàng.</div>; 
  }

  const orderLabelsRevenue = orderRevenueData.map(item => item.category);
  const orderDataValuesRevenue = orderRevenueData.map(item => item.percentage); 

  const orderPieData = {
    labels: orderLabelsRevenue,
    datasets: [{
      label: 'Doanh thu theo danh mục(%)',
      data: orderDataValuesRevenue,
      backgroundColor: [
        'rgba(255, 206, 86, 0.6)',
        'rgba(75, 192, 192, 0.6)',
        'rgba(153, 102, 255, 0.6)',
      ],
      borderColor: 'rgba(0, 0, 0, 1)',
      borderWidth: 0,
    }]
  };

  const orderPieOptions = {
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Doanh thu theo đơn hàng (%)',
      },
    },
  };

  const totalRevenue = analyticsData.totalRevenue || 0; 

  const totalRevenueData = {
    labels: ['Tổng doanh thu'], 
    datasets: [{
      label: 'Tổng doanh thu',
      data: [totalRevenue],
      backgroundColor: 'rgba(153, 102, 255, 0.6)',
      borderColor: 'rgba(153, 102, 255, 1)',
      borderWidth: 1,
      barThickness: 200,// chỉnh kích thước
    }]
  };

  const totalRevenueOptions = {
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Doanh thu (VND)',
        },
      },
    },
    plugins: {
      legend: {
        display: true,
        position: 'top',
      },
      title: {
        display: true,
        text: 'Tổng doanh thu của các đơn hàng',
      },
    },
  };

  return (
    <>
      <h1>Biểu đồ Thống kê doanh thu theo danh mục</h1>
      <div style={{ width: '900px', height: '500px', margin: '0 auto' }}>
        <Bar data={barData} options={barOptions} />
      </div>

      <h1>Biểu đồ tổng doanh thu(%)</h1>
      <div style={{ width: '900px', height: '500px', margin: '0 auto' }}>
        <Pie data={orderPieData} options={orderPieOptions} /> 
      </div>

      <h1>Biểu đồ Tổng doanh thu của các đơn hàng</h1>
      <div style={{ width: '900px', height: '500px', margin: '0 auto' }}>
        <Bar data={totalRevenueData} options={totalRevenueOptions} />
      </div>
    </>
  );
};

export default RevenueAnalytics;
