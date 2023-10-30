import * as functions from "firebase-functions";
import axios from "axios";
import * as qs from "querystring";

const slackClient = axios.create({
  baseURL: "https://slack.com/api",
  headers: {
    "Content-Type": "application/x-www-form-urlencoded",
  },
  transformRequest: [
    (data) => qs.stringify(data),
  ],
});

export type oauthAccessResponseType = {
  ok: boolean,
  app_id: string,
  authed_user: {
    id: string,
    scope: string,
    access_token: string,
    token_type: string,
  }
  team: {
    id: string,
  }
  enterprise: {
    name: string,
    id: string,
  },
  is_enterprice_install: false,
}

// eslint-disable-next-line max-len
export const oauthAccess = async (code: string): Promise<oauthAccessResponseType> => {
  const requestArgs = {
    // eslint-disable-next-line max-len
    client_id: "6050609319142.6097559104134", // functions.config().slack.client_id,
    // eslint-disable-next-line max-len
    client_secret: "8049db0ac6b2af306ff59bbf4b915497", // functions.config().slack.client_secret,
    code,
  };

  try {
    // eslint-disable-next-line max-len
    const res = await slackClient.post<oauthAccessResponseType>("oauth.v2.access", requestArgs);
    return res.data;
  } catch (e) {
    console.warn("Slack oauth was failed.", e);
    throw new Error();
  }
};

// 面倒なので使いそうなやつだけ
export type SlackUserType = {
  id: string;
  team_id: string;
  name: string;
  real_name: string;
  is_admin: boolean;
  is_owner: boolean;
  is_primary_owner: boolean;
  is_restricted: boolean;
  is_ultra_restricted: boolean;
};
export const usersInfo = async (token: string, userId: string) => {
  const requestArgs = {
    token,
    user_id: userId,
  };

  try {
    // eslint-disable-next-line max-len
    const res = await slackClient.post<{user: SlackUserType}>("users.info", requestArgs);
    return res.data.user;
  } catch (e) {
    console.warn("Slack oauth was failed.", e);
    throw new Error();
  }
};
