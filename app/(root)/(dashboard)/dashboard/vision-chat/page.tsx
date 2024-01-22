
import React from "react";
import dynamic from 'next/dynamic';

const PubSubClient = dynamic(() => import('./pubsub-client'), {
  ssr: false,
})

const PubSub = () => {

  const pageId="PubSubChannels"

  return (
      <>
     
        <div className="flex flex-col grow gap-6 pt-12 pr-12 pb-12 pl-12 rounded-2xl border-slate-100 border-t border-b border-l border-r border-solid border h-[864px] bg-slate-50">
          <PubSubClient />
        </div>
      </>
  )
}

export default PubSub;
