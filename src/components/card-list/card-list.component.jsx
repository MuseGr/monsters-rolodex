import CardItem from "../card-item/card-item.component";

import './card-list.styles.css'

const CardList = ({monsters}) => (
  <div className="card-list">
    {monsters.map(monster => {
      return <CardItem monster={monster}/>
    })}
  </div>
)

export default CardList