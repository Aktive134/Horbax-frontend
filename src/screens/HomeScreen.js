import { useEffect, useReducer } from 'react'
import axios from 'axios'
import logger from 'use-reducer-logger'
import Row from 'react-bootstrap/Row'
// import Col from 'react-bootstrap/Col'
import { LoadingBox, MessageBox } from '../components'
// import { Product, LoadingBox, MessageBox } from '../components'
import { Helmet } from 'react-helmet-async'

const reducer = (state, action) => {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true }
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}

function HomeScreen() {
  const [{ loading, error }, dispatch] = useReducer(logger(reducer), {
    products: [],
    loading: true,
    error: '',
  })
  // const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
  //   products: [],
  //   loading: true,
  //   error: '',
  // })

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' })
      try {
        const result = await axios.get('/products')
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data })
      } catch (error) {
        dispatch({ type: 'FETCH_FAIL', payload: error.message })
      }
    }
    fetchData()
  }, [])

  return (
    <div>
      <Helmet>
        <title>Horbax</title>
      </Helmet>
      <h1>Featured Products</h1>
      <div className="products">
        {loading ? (
          <LoadingBox />
        ) : error ? (
          <MessageBox variant="danger">{error}</MessageBox>
        ) : (
          <Row>
            {/* {products?.map((product) => (
              <Col key={product.slug} sm={6} md={4} lg={3} className="mb-3">
                <Product product={product}></Product>
              </Col>
            ))} */}
          </Row>
        )}
      </div>
    </div>
  )
}

export default HomeScreen
