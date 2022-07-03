import { LoadingOutlined, ShoppingCartOutlined } from '@ant-design/icons'
import { useEffect, useState, Fragment } from 'react'
import { Col, Row, Spin, Badge, Button } from 'antd'
import { ItemCard } from './components/ItemCard'
import { Filter } from './components/Filter'
import { useSelector } from 'react-redux'
import { RootState  } from './store'
import axios from 'axios'
import './App.scss'

interface ItemCardI{
    id: string;
    name: string;
    details: {
      price: number;
      size: string;
      tag: string;
      image: string;
      type: string;
    };
}

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

    async function getItems(params?: string,
        selectedFilter?: keyof ItemCardI['details']) {
        try {
            setLoading(true)
            const response = await axios.get(
                'https://my-json-server.typicode.com/prasadhewage/ecommerce/shipments'
            )
            if(params && selectedFilter){
                if(selectedFilter === 'type' && filterType.size === null){
                    setItems(response.data.filter(
                        (item: ItemCardI) => (item.details[selectedFilter] === params) 
                    ))
                }
                if(selectedFilter === 'size' && filterType.type === null){
                    setItems(response.data.filter(
                        (item: ItemCardI) => (item.details[selectedFilter] === params) 
                    ))
                }
                if(selectedFilter === 'type' && filterType.size){
                    setItems(response.data.filter(
                        (item: ItemCardI) => (item.details[selectedFilter] === params && item.details.size === filterType.size) 
                    ))
                } else if(selectedFilter === 'size' && filterType.type){
                    setItems(response.data.filter(
                        (item: ItemCardI) => (item.details[selectedFilter] === params && item.details.type === filterType.type) 
                    ))
                }
            } else {
                setItems(response.data)
            } 
            setLoading(false)
        } catch (error) {
            setItems([])
            setReset(true)
            setLoading(false)
            setFilterType({ size: null, type: null })
            console.error(error)
        }
    }

    function onFilterChange(
        params: string,
        selectedFilter: keyof ItemCardI['details']
    ) {
        setFilterType({ ...filterType, [selectedFilter]: params })
        getItems(params, selectedFilter)
        setReset(false)
    }

    function resetFilter() {
        setReset(true)
        setFilterType({ size: null, type: null })
        getItems()
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
                    <Button onClick={resetFilter}>Reset</Button>
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
                    items.map((item: ItemCardI) => {
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
