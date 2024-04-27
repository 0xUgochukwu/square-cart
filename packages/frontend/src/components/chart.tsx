
import { LineChart, Line, XAxis, YAxis, Tooltip } from "recharts";
import { filterAndSortGraphData } from "../services/helpers";
import { WindowDimensions } from "../hooks/windowDimensions";

const Chart = ({ data }: { data: any }) => {
  console.log(data);
  const filteredData = filterAndSortGraphData(data);
  const { width } = WindowDimensions();
  const chartWidth = width > 500 ? width / 2 + 35 : width;

  return (
    <div>
      <LineChart width={chartWidth} height={257} data={filteredData}>
        <Line type='monotone' dataKey='amount' stroke='#FF5403' />
        <YAxis />
        <XAxis dataKey={"date"} interval='preserveStartEnd' />
        <Tooltip />
      </LineChart>
    </div>
  );
};

export default Chart;
