import { FC, useState } from "react";
import { Cell, Pie, PieChart, ResponsiveContainer, Sector, Tooltip } from "recharts";
import { PieSectorDataItem } from "recharts/types/polar/Pie";
import { ActiveShape } from "recharts/types/util/types";
import { IResGetDashboardTotalDetail, IResGetDashboardValue } from "../../interfaces/IGetDashboard";

const renderActiveShape: ActiveShape<PieSectorDataItem> = (props: PieSectorDataItem) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle, fill, percent, value } = props;
  const sin = Math.sin(-RADIAN * (midAngle ? midAngle : 0));
  const cos = Math.cos(-RADIAN * (midAngle ? midAngle : 0));
  const sx = (cx ? cx : 0) + ((outerRadius ? outerRadius : 0) + 10) * cos;
  const sy = (cy ? cy : 0) + ((outerRadius ? outerRadius : 0) + 10) * sin;
  const mx = (cx ? cx : 0) + ((outerRadius ? outerRadius : 0) + 30) * cos;
  const my = (cy ? cy : 0) + ((outerRadius ? outerRadius : 0) + 30) * sin;
  const ex = mx;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={(outerRadius ? outerRadius : 0) + 6}
        outerRadius={(outerRadius ? outerRadius : 0) + 10}
        fill={fill}
      />
      {/* <path d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`} stroke={fill} fill="none" /> */}
      {/* <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" /> */}
      <text x={ex} y={ey} textAnchor={textAnchor} fill="#333" fontWeight={'bold'} fontSize={'20px'}>{`${value}`}</text>
      <text x={ex} y={ey} dy={18} textAnchor={textAnchor} fill="#999" fontSize={12}>
        {`（${((percent ? percent : 0) * 100).toFixed(2)}%）`}
      </text>
    </g>
  );
};

interface CustomPieChartProps {
  data: IResGetDashboardTotalDetail[];
  values: IResGetDashboardValue[];
}

const CustomPieChart: FC<CustomPieChartProps> = (props) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const onPieEnter = (data: any, index: number) => {
    setActiveIndex(index)
  };

  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Tooltip />
        <Pie
          activeIndex={activeIndex}
          activeShape={renderActiveShape}
          data={props.data}
          cx="60%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          fill="#8884d8"
          dataKey="number"
          onMouseEnter={onPieEnter}
        >
        {props.data.map((entry, index) => (
          <Cell
            key={`cell-${index}`}
            fill={props.values.filter(v => v.uid == entry.value_uid)[0].color}
            name={props.values.filter(v => v.uid == entry.value_uid)[0].title}
          />
        ))}
        </Pie>
      </PieChart>
    </ResponsiveContainer>
  )
}

export default CustomPieChart;