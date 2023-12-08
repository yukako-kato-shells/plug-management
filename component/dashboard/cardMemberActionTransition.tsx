import { IResGetMemberDashboardActionTransition } from "../../interfaces/IGetMemberDashboard";
import DashboardCard from "./card";
import styles from './cardMemberActionTransition.module.css';
import { Bar, BarChart, CartesianGrid, Rectangle, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import CustomLegend from "./legend";
import { Value } from "../../pages/dashboard";

interface CardMemberActionTransitionProps {
  actionTransitions: IResGetMemberDashboardActionTransition[];
  values: Value[];
}

const CardMemberActionTransition: React.FC<CardMemberActionTransitionProps> = (props) => {
  return (
    <DashboardCard>
      <div className={styles.main}>
        <div className={styles.titleArea}>
          <div className={styles.title}>コアアクション・サポートアクション数推移</div>
        </div>
        <div className={styles.coreActions}>
          <ResponsiveContainer>
            <BarChart
              data={props.actionTransitions}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" fontSize="13px" />
              <Tooltip />
              <Bar
                dataKey="core_action_number"
                name="コアアクション"
                fill="#8884d8"
                activeBar={<Rectangle fill="pink" stroke="blue" />}
                unit={"回"}
              />
              <Bar
                dataKey="support_action_number"
                name="サポートアクション"
                fill="#82ca9d"
                activeBar={<Rectangle fill="gold" stroke="purple" />}
                unit={"回"}
              />
            </BarChart>
          </ResponsiveContainer>
          <div>
          <CustomLegend values={props.values} />
          </div>
        </div>
      </div>
    </DashboardCard>
  )
}

export default CardMemberActionTransition;