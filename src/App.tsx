import { useEffect, useState, Fragment } from 'react'
import { ItemCard } from './components/ItemCard'
import { Filter } from './components/Filter'
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

const sizes = [
    { value: 'all', label: 'All' },
    { value: 'xsmall', label: 'xs' },
    { value: 'small', label: 's' },
    { value: 'large', label: 'l' },
]

const types = [
    { value: 'all', label: 'All' },
    { value: 't-shirt', label: 't-shirt' },
    { value: 'dress shirts', label: 'dress shirts' },
]

function App() {
    const [items, setItems] = useState([])
    const [filterType, setFilterType] = useState({ size: '', type: '' })
    
    useEffect(() => {
        getItems()
    }, [])

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
    
    function onSizeFilterChange(params: string) {
        if (params === 'all') {
            getItems()
        } else {
            setFilterType(() => ({ ...filterType, size: params }))
            setItems(items.filter((item: ItemCard) => item.details.size === params))
        }
    }

    function onTypeFilterChange(params: string) {
        if (params === 'all') {
            getItems()
        } else {
            setFilterType(() => ({ ...filterType, type: params }))
            setItems(items.filter((item: ItemCard) => item.details.type === params))
        }
    }

    return (
        <div className="App">
            <Row className="filter" gutter={[16, 16]}>
                <Col offset={16} xs={12} sm={3} md={3} lg={3} xl={3}>
                    <Filter
                        type="type"
                        typeArr={types}
                        selectFilter={onTypeFilterChange}
                    />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Filter
                        type="size"
                        typeArr={sizes}
                        selectFilter={onSizeFilterChange}
                    />
                </Col>
            </Row>
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
