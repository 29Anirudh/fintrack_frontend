import React from 'react'
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";

const BarChartDashboard = ({data}) => {
    function getMonthlyOverview(data){
        const months=["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"]
        const currentMonth=new Date().getMonth();
        return months.slice(0,currentMonth+1).map(
            month=>{
                const record=data.find(item=>item.month.slice(0,3)===month);
                return record ||
                    {
                        month,
                        debit_money:0,
                        credit_money:0
                    } 
            }
        )
    }
  return (
        <BarChart
          data={getMonthlyOverview(data)}
          barGap={4}
          barCategoryGap="20%"
          accessibilityLayer={false}
        >
          <CartesianGrid
            stroke="#1f2937"
            strokeDasharray="3 3"
            vertical={true}
          />

          <XAxis
            dataKey="month"
            interval={0}
            tick={{ fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <YAxis
            tick={{ fill: "#9ca3af" }}
            axisLine={false}
            tickLine={false}
          />

          <Tooltip
            cursor={{ fill: "rgba(255,255,255,0.05)" }}
            contentStyle={{
              background: "#1e293b",
              border: "none",
              outline:"none",
              borderRadius: "12px",
              color: "#fff",
            }}
          />

         <Legend
            verticalAlign="bottom"
            align="center"
            iconType="circle"
            iconSize={10}
            wrapperStyle={{
                color: "#9ca3af",
                fontSize: "14px"
            }}
        />

          <Bar
            dataKey="credit_money"
            fill="#6366F1"
            barSize={18}
            radius={[6, 6, 0, 0]}
            name="Income"
            activeBar={false}
          />

          <Bar
            dataKey="debit_money"
            fill="#EF4444"
            barSize={18}
            radius={[6, 6, 0, 0]}
            activeBar={false}
            name="Expenses"
          />
        </BarChart>
  )
}

export default BarChartDashboard
