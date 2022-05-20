import { useEffect, useState, Fragment } from 'react'
import { ItemCard } from './components/ItemCard'
import { Col, Row } from 'antd'
import axios from 'axios'
import './App.scss'

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

function App() {
    const [items, setItems] = useState([])

    async function getItems() {
        try {
            const response = await axios.get(
                'https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments'
            )
            setItems(response.data)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getItems()
    }, [])

    return (
        <div className="App">
            <Row gutter={[16, 16]}>
                {items.map((item: ItemCard) => {
                    return (
                        <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                            <Fragment key={item.id}>
                                <ItemCard {...item} />
                            </Fragment>
                        </Col>
                    )
                })}
            </Row>
        </div>
    )
}

export default App
