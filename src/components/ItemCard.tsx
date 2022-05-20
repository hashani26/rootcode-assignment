import { Card, Button, Popover } from 'antd'
import { FC, useState } from 'react'
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
    const [imgErr, setImgErr] = useState(false)
    return (
        <Card
            className={'item-card'}
            hoverable
            style={{ width: 240 }}
            cover={imgErr?
                <div className='no-dispaly'><i>Cannot display image</i></div>:
                <img onError={() => setImgErr(true)} alt="example" src={props.details.image} />
            }
        >
            <div>
                <div className="title">
                    <Popover content={props.name} title="Title" trigger="hover">
                        {props.name.substr(0, 25)}
                    </Popover>
                </div>
                <div className="price">$ {props.details.price}</div>
                <Button>Add to cart</Button>
            </div>
        </Card>
    )
}
