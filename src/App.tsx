import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useEffect, useState, Fragment } from 'react'
import { Col, Row, Spin, Badge, Button } from 'antd'
import { ItemCard } from './components/ItemCard'
import { Filter } from './components/Filter'
import { useSelector } from 'react-redux'
import { RootState  } from './store'
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
    { value: 'xsmall', label: 'xs' },
    { value: 'small', label: 's' },
    { value: 'large', label: 'l' },
]

const types = [
    { value: 't-shirt', label: 't-shirt' },
    { value: 'dress shirts', label: 'dress shirts' },
]

function App() {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(false)
    const [ reset, setReset] = useState(false)
    const [filterType, setFilterType] = useState({ size: null, type: null })
    const total = useSelector((state: RootState) => state.cartTotal.total)

    useEffect(() => {
        getItems()
    }, [])

    async function getItems() {
        try {
            setLoading(true)
            const response = await axios.get(
                'https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments'
            )
            setItems(response.data)
            setLoading(false)
        } catch (error) {
            setItems([])
            setLoading(false)
            console.error(error)
        }
    }

    function onFilterChange(
        params: string,
        selectedFilter: keyof ItemCard['details']
    ) {
        setFilterType(() => ({ ...filterType, [selectedFilter]: params }))
        setItems(
            items.filter(
                (item: ItemCard) => item.details[selectedFilter] === params
            )
        )
    }

    return (
        <div className="App">
            <Row className="filter" gutter={[16, 16]}>
                <Col offset={12} xs={12} sm={3} md={3} lg={3} xl={3}>
                    <Filter
                        value={reset? null : filterType.type}
                        type="type"
                        typeArr={types}
                        selectFilter={(val: string) => onFilterChange(val, 'type')}
                    />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Filter
                        value={reset? null : filterType.size}
                        type="size"
                        typeArr={sizes}
                        selectFilter={(val: string) => onFilterChange(val, 'size')}
                    />
                </Col>
                <Col xs={12} sm={12} md={3} lg={3} xl={3}>
                    <Button onClick={() => {setReset(true), getItems()}}>Reset</Button>
                </Col>
                <Col xs={12} sm={12} md={1} lg={1} xl={1}>
                    <Badge count={total}><ShoppingCartOutlined /></Badge>
                </Col>
            </Row>
            <Row gutter={[16, 16]}>
                {loading ? (
                    <Col span={24}>
                        <Spin
                            indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />}
                        />
                    </Col>
                ) : items.length === 0 ? (
                    <Col span={24}>No data</Col>
                ) : (
                    items.map((item: ItemCard) => {
                        return (
                            <Col key={item.id} xs={24} sm={12} md={8} lg={6} xl={4}>
                                <Fragment key={item.id}>
                                    <ItemCard {...item} />
                                </Fragment>
                            </Col>
                        )
                    })
                )}
            </Row>
        </div>
    )
}

export default App
