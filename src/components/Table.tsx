/* eslint-disable react/jsx-key */
import React from "react";
import { DayWeatherDataType } from "../utils/helpers";
import { useTable } from "react-table";

type Props = {
  days: DayWeatherDataType[];
};
const Table = (props: Props) => {
  const { days } = props;

  const columns = React.useMemo(() => {
    const accessor = [
      "datetime",
      "datetimeEpoch",
      "tempmax",
      "tempmin",
      "temp",
      "feelslikemax",
      "feelslikemin",
      "feelslike",
      "dew",
      "humidity",
      "precip",
      "precipprob",
      "precipcover",
      "preciptype",
      "snow",
      "snowdepth",
      "windgust",
      "windspeed",
      "winddir",
      "pressure",
      "cloudcover",
      "visibility",
      "solarradiation",
      "solarenergy",
      "uvindex",
      "severerisk",
      "sunrise",
      "sunriseEpoch",
      "sunset",
      "sunsetEpoch",
      "moonphase",
      "conditions",
      "description",
      "icon",
      "source",
    ];
    return accessor.map((a) => ({
      Header: a,
      accessor: a,
    }));
  }, []);

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns: columns as any, data: days });

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row) => {
            prepareRow(row);
            return (
              <tr {...row.getRowProps()}>
                {row.cells.map((cell) => {
                  return (
                    <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
