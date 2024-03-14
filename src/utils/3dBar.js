import * as echarts from "echarts";
export function generateChartObject(obj) {
  return obj.map(item => {
    const {
      name,
      type1,
      type2,
      type3,
      color1,
      color2,
      color3,
      topColor1,
      topColor2,
      data
    } = item;

    return {
      name: name,
      type: "custom",
      renderItem: (params, api) => {
        const location = api.coord([api.value(0), api.value(1)]);
        return {
          type: "group",
          children: [
            {
              type: type1,
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color1,
                  },
                  {
                    offset: 0.5,
                    color: color2,
                  },
                  {
                    offset: 1,
                    color: color3,
                  },
                ]),
              },
            },
            {
              type: type2,
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: color1,
                  },
                  {
                    offset: 0.5,
                    color: color2,
                  },
                  {
                    offset: 1,
                    color: color3,
                  },
                ]),
              },
            },
            {
              type: type3,
              shape: {
                api,
                xValue: api.value(0),
                yValue: api.value(1),
                x: location[0],
                y: location[1],
                xAxisPoint: api.coord([api.value(0), 0]),
              },
              style: {
                fill: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: topColor1,
                  },
                  {
                    offset: 1,
                    color: topColor2,
                  },
                ]),
              },
            },
          ],
        };
      },
      data: data,
    };
  });
}
