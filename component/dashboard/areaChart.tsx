import React, { FC, useEffect } from 'react';
import { Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, YAxis } from 'recharts';
import { IResGetDashboardActionPercentageEachMonth } from '../../interfaces/IGetDashboard';

interface AreaChartProps {
  data: IResGetDashboardActionPercentageEachMonth[];
}
const CustomAreaChart: FC<AreaChartProps> = (props) => {
  const [data, setData] = React.useState(props.data);

  useEffect(() => {
    props.data.unshift({ month: "", total: 0 })
    setData(props.data)
  }, [props.data])

  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart
        data={data}
        margin={{
          right: 10,
          left: 10,
          top: 10,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" fontSize={"13px"} />
        <YAxis dataKey="total" fontSize={"13px"} domain={[0, 100]} hide />
        <Tooltip />
        <defs>
          <linearGradient
            id="gradationColor"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="100%"
          >
            <stop offset="0%" stopColor="#6FB9B4" />
            <stop offset="100%" stopColor="#FFED93" />
          </linearGradient>
        </defs>
        <Area
          type="monotone"
          dataKey="total"
          stroke="#6FB9B4"
          fill="url(#gradationColor)"
          fillOpacity={0.8}
          unit="%"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}

export default CustomAreaChart;
