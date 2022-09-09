import axios from "axios";
import type { NextApiRequest, NextApiResponse } from "next";
import { IPIFY_API_KEY } from "../../src/utils/constant";
import { serialize } from "../../src/utils/helpers";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // const apiKey = "at_t0BIqGaMV5qxDqWpax1U1czHTfzUd";
  const baseUrl = "https://geo.ipify.org/api/v2";
  const { ip } = req.query;

  const qs = serialize({
    apiKey: IPIFY_API_KEY,
    ipAddress: ip,
  });

  try {
    const { data } = await axios.get(`${baseUrl}/country,city?${qs}`);
    return res.status(200).send(data);
  } catch (error) {
    return res.status(500).send(error);
  }
}
