import React, { Component } from 'react'
import { Col, ListGroup} from 'react-bootstrap'
import axios from 'axios'
import {API_URL} from '../utils/constant'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faUtensils, faCoffee, faCheese} from '@fortawesome/free-solid-svg-icons'

const Icon = ({nama}) => {
    if (nama === "Makanan" ) return <FontAwesomeIcon icon={faUtensils} className="mr-2" />
    if (nama === "Minuman" ) return <FontAwesomeIcon icon={faCoffee}  />
    if (nama === "Camilan" ) return <FontAwesomeIcon icon={faCheese} className="mr-2" />
    
    return <FontAwesomeIcon icon={faCheese} className="mr-2" />
}

export default class ListCategories extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            categories : []
        }
    }
    
    componentDidMount(){
        axios
            .get(API_URL + "categories")
            .then(res => {
            const menus = res.data;
            this.setState({ menus});
            })
            .catch (error => {
            console.log("error")
            })
        }
    
    render() {
        const {categories} = this.state
        const {changeCategory, categoryYangDipilih} = this.props
        return (
        <Col md={2} className="mt-3">
            <h5> 
                <strong>Daftar Kategori</strong>
            </h5>
            <hr/>
            <ListGroup>
                {categories && categories.map ((category) => (
                    <ListGroup.Item 
                        key={category.id} 
                        onClick={() => changeCategory (category.nama)} 
                        className={categoryYangDipilih === category.nama && "category-aktif"}
                        style={{cursor: 'pointer'}}
                        >
                        <Icon nama= {category.nama} />{category.nama}
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Col>
        )
    }
}
