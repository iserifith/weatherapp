// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { VISUALCROSSING_API_KEY } from "../../src/utils/constant";
import { serialize } from "../../src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const baseUrl =
      "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline";

    let { location, range } = req.query;
    const qs = serialize({
      unitGroup: "metric",
      include: "days,current",
      contentType: "json",
      key: VISUALCROSSING_API_KEY,
    });

    if (typeof range === "string") {
      range = range.split(",");
    } else {
      throw new Error("Invalid input.");
    }

    const url = `${baseUrl}/${location}/${range[0]}/${range[1]}?${qs}`;

    const { data } = await axios(url);

    res.status(200).send(data);
  } catch (error) {
    res.status(500).send(error);
  }
}
