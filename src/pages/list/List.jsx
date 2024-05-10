import "./list.scss"
import React from "react"
import ListVilla from "../../components/listVilla/ListVilla"
import ListUser from "../../components/listUser/ListUser"

const List = ({ comp }) => {
  

  return (
    <div className="list">
      
      <div className="listContainer">
       
        {
          comp ==="ListUser" ? <ListUser /> : <ListVilla />
        }
      </div>
    </div>
  )
}

export default List