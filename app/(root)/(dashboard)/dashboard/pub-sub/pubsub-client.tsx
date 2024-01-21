'use client'

import * as Ably from 'ably';
import { AblyProvider, useChannel } from "ably/react"
import { MouseEventHandler, MouseEvent, useState } from 'react'
import Logger, { LogEntry } from '@/app/components/logger';
import Spaces from "@ably/spaces";
import App from "./space";



export default function PubSubClient() {

  const client = new Ably.Realtime.Promise ({ authUrl: '/api/ably', authMethod: 'POST' });
  const spaces = new Spaces(client);

  return (
    <AblyProvider client={ client }>
      <div className="justify-center">
        <div className="">
        <App spaces={spaces} />
          
          


        </div>      
      </div>
    </AblyProvider>
  )
}

function PubSubMessages() {

  const [logs, setLogs] = useState<Array<LogEntry>>([])

  const { channel } = useChannel("status-updates", (message: Ably.Types.Message) => {
    setLogs(prev => [...prev, new LogEntry(`✉️ event name: ${message.name} text: ${message.data.text}`)])
  });
  
  const [messageText, setMessageText] = useState<string>('A message')

  const publicFromClientHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    if(channel === null) return
    channel.publish('update-from-client', {text: `${messageText} @ ${new Date().toISOString()}`})
  }

  const publicFromServerHandler: MouseEventHandler = (_event: MouseEvent<HTMLButtonElement>) => {
    fetch('/publish', {
        'method': 'POST',
        'headers': {
            'content-type': 'application/json',
        },
        'body': JSON.stringify({text: `${messageText} @ ${new Date().toISOString()}`})
    })
  }

  return (
    <>
      
    </>
  )
}