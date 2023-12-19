import React, { FC } from 'react';
import { BarChart, Bar, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { IResGetDashboardActionNumberEachMonth } from '../../interfaces/IGetDashboard';
import { Value } from '../../pages/dashboard';

const data = [
  {
    name: 'Page A',
    uv: 4000,
    pv: 2400,
    amt: 2400,
  },
  {
    name: 'Page B',
    uv: 3000,
    pv: 1398,
    amt: 2210,
  },
  {
    name: 'Page C',
    uv: 2000,
    pv: 9800,
    amt: 2290,
  },
  {
    name: 'Page D',
    uv: 2780,
    pv: 3908,
    amt: 2000,
  },
  {
    name: 'Page E',
    uv: 1890,
    pv: 4800,
    amt: 2181,
  },
  {
    name: 'Page F',
    uv: 2390,
    pv: 3800,
    amt: 2500,
  },
  {
    name: 'Page G',
    uv: 3490,
    pv: 4300,
    amt: 2100,
  },
];

interface BarChartProps {
  data: IResGetDashboardActionNumberEachMonth[];
  values: Value[];
}

const CustomBarChart: FC<BarChartProps> = (props) => {

  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart
        data={props.data}
        margin={{
          right: 10,
          left: 10,
          top: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize="13px" />
        <Tooltip />
        {
          props.values.map((value: Value, index: number) => {
            return (
              <Bar
                dataKey={value.uid}
                name={value.title.length > 8 ? value.title.substring(0, 18).trim() + "..." : value.title}
                stackId="a"
                fill={value.color}
                key={index}
                unit="回"
              />
            )
          })
        }
      </BarChart>
    </ResponsiveContainer>
  )
}

export default CustomBarChart;