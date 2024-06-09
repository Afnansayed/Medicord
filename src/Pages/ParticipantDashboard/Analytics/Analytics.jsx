
import {
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Scatter,
  ResponsiveContainer,
} from 'recharts';
import useParticipantRegistered from '../../../Hooks/useParticipantRegistered/useParticipantRegistered';

const Analytics = () => {
    const [myRegisteredCamp] = useParticipantRegistered();
    return (
        <ResponsiveContainer width="100%" height="100%">
            <ComposedChart
                width={500}
                height={400}
                data={myRegisteredCamp}
                margin={{
                    top: 20,
                    right: 20,
                    bottom: 20,
                    left: 20,
                }}
            >
                <CartesianGrid stroke="#f5f5f5" />
                <XAxis dataKey="campName" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Area type="monotone" dataKey="campFees" fill="#8884d8" stroke="#8884d8" />
                <Bar dataKey="campFees" barSize={20} fill="#413ea0" />
                <Scatter dataKey="participantAge" fill="red" />
            </ComposedChart>
        </ResponsiveContainer>
    );
};

export default Analytics;
