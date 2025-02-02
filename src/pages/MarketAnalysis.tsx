import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const mockMarketData = [
  { date: '2024-01', sp500: 4800, nasdaq: 15000, dow: 37500 },
  { date: '2024-02', sp500: 4900, nasdaq: 15500, dow: 38000 },
  { date: '2024-03', sp500: 4850, nasdaq: 15300, dow: 37800 },
  { date: '2024-04', sp500: 5000, nasdaq: 16000, dow: 38500 },
  { date: '2024-05', sp500: 5100, nasdaq: 16200, dow: 39000 },
  { date: '2024-06', sp500: 5050, nasdaq: 16100, dow: 38800 },
];

const MarketAnalysis = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Market Analysis</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>S&P 500</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">5,050.25</div>
            <div className="text-sm text-success">+0.75%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>NASDAQ</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">16,100.50</div>
            <div className="text-sm text-success">+1.2%</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dow Jones</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-primary">38,800.75</div>
            <div className="text-sm text-danger">-0.3%</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Market Indices Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={mockMarketData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="sp500" stroke="#348e37" name="S&P 500" />
                <Line type="monotone" dataKey="nasdaq" stroke="#2a722c" name="NASDAQ" />
                <Line type="monotone" dataKey="dow" stroke="#10B981" name="Dow Jones" />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketAnalysis;