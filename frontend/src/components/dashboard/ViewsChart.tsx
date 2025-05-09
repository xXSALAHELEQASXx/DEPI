
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Mon', views: 2400 },
  { name: 'Tue', views: 1398 },
  { name: 'Wed', views: 9800 },
  { name: 'Thu', views: 3908 },
  { name: 'Fri', views: 4800 },
  { name: 'Sat', views: 3800 },
  { name: 'Sun', views: 4300 },
];

const ViewsChart = () => {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl">Daily Views</CardTitle>
        <CardDescription>Content views in the last 7 days</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              margin={{
                top: 5,
                right: 10,
                left: -10,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(128,128,128,0.1)" />
              <XAxis dataKey="name" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.8)',
                  border: '1px solid #ddd',
                  borderRadius: '8px',
                }}
                formatter={(value) => [`${value} views`, 'Views']}
              />
              <Bar
                dataKey="views"
                fill="url(#colorGradient)"
                radius={[4, 4, 0, 0]}
                barSize={40}
              />
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8b5cf6" stopOpacity={1} />
                  <stop offset="100%" stopColor="#c4b5fd" stopOpacity={1} />
                </linearGradient>
              </defs>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
};

export default ViewsChart;
