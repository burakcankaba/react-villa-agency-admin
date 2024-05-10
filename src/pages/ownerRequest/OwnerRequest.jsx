import React from 'react'
import useFetch from '../../hooks/useFetch'

const OwnerRequest = () => {
    const { data, loading, error } = useFetch(`/listhomes`)
    console.log(data)
  return (
    <div>OwnerRequest</div>
  )
}

export default OwnerRequest