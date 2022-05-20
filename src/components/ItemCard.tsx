import { Card, Button, Popover } from 'antd'
import { FC } from 'react'
import './itemCard.scss'

type ItemCard = {
  id: string;
  name: string;
  details: {
    price: number;
    size: string;
    tag: string;
    image: string;
    type: string;
  };
};

export const ItemCard: FC<ItemCard> = (props) => {
    return (
        <Card
            className="item-card"
            hoverable
            style={{ width: 240 }}
            cover={<img alt="example" src={props.details.image} />}
        >
            <div>
                <div className="title">
                    <Popover content={props.name} title="Title" trigger="hover">
                        {props.name.substr(0, 25)}
                    </Popover>
                </div>
                <div className="price">{props.details.price}</div>
                <Button>Add to cart</Button>
            </div>
        </Card>
    )
}
