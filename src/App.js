import { Tabs } from 'antd'
import { useState } from 'react'
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore/lite'

import './App.css'
import 'antd/dist/antd.css'
import { LegBuilderScreen } from './screens/LegBuilderScreen'
import { LegFetcherScreen } from './screens/LegFetcherScreen'

const app = initializeApp({
  apiKey: process.env.REACT_APP_apiKey,
  authDomain: process.env.REACT_APP_authDomain,
  databaseURL: process.env.REACT_APP_databaseURL,
  projectId: process.env.REACT_APP_projectId,
  storageBucket: process.env.REACT_APP_storageBucket,
  messagingSenderId: process.env.REACT_APP_messagingSenderId,
  appId: process.env.REACT_APP_appId,
})

export const db = getFirestore(app)

function App() {
  const [activeTab, setActiveTab] = useState(1)
  return (
    <div className='leg-builder'>
      <Tabs defaultActiveKey={activeTab} onChange={setActiveTab}>
        <Tabs.TabPane tab='Leg Builder' key={1}>
          <LegBuilderScreen />
        </Tabs.TabPane>
        <Tabs.TabPane tab='Leg Fetcher' key={2}>
          <LegFetcherScreen />
        </Tabs.TabPane>
      </Tabs>
    </div>
  )
}

export default App
