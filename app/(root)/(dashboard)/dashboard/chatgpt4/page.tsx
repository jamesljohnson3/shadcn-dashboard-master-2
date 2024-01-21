import Spaces from "@ably/spaces";
import { nanoid } from "nanoid";
import { Realtime } from "ably";
import App from "./space";
import { AblyProvider } from "ably/react";
import * as Ably from "ably";
import { env } from "process";

const client = new Ably.Realtime.Promise({ authUrl: '/api/ably' })

const spaces = new Spaces(client);


export function Ablytest() {
    return (
      <div>
  <AblyProvider client={client}>
    <App spaces={spaces} />
  </AblyProvider>
      </div>
    )
  }
  