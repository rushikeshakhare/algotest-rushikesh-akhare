import { useState, useCallback, useEffect } from 'react'
import { Spin, Button } from 'antd'
import { db } from '../App'
import { collection, getDocs } from 'firebase/firestore/lite'

const COLLECTION_NAME = 'leg'

export function LegFetcherScreen() {
  const [loading, setLoading] = useState(true)
  const [legs, setLegs] = useState([])

  const fetchLegs = useCallback(async () => {
    setLoading(true)
    await getDocs(collection(db, COLLECTION_NAME)).then(querySnapshot => {
      const newData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }))
      newData.sort((a, b) => b.createdAt - a.createdAt)
      setLegs(newData)
      setLoading(false)
    })
  }, [])

  useEffect(() => {
    fetchLegs()
  }, [fetchLegs])

  if (loading) return <Spin size='large' />

  return (
    <div className='leg-fetcher'>
      <div className='inline-form'>
        <h1>All Legs </h1>
        <div className='spacer' />
        <Button type='primary' onClick={fetchLegs}>
          Reload
        </Button>
      </div>
      {legs.map(leg => (
        <div>
          <div key={leg.id} className='leg'>
            <pre>{JSON.stringify(leg, null, 4)}</pre>
          </div>
          <div className='spacer' />
        </div>
      ))}
    </div>
  )
}
