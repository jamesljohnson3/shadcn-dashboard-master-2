import { AblyProvider } from "ably/react";
import Spaces from "@ably/spaces";
import { nanoid } from "nanoid";
import { Realtime } from "ably";
import App from "./space";

const client = new Realtime.Promise({
  clientId: nanoid(),
  key: import.meta.env.VITE_ABLY_KEY,
});

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
  