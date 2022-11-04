import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from 'react-bootstrap'
import TotalBayar from './TotalBayar';
import {numberWithCommas} from '../utils/utils';
import ModalKeranjang from './ModalKeranjang'

export default class ListCategories extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
            showModal: false,
            keranjangDetail: false,
            jumlah: 0,
            keterangan: "",
        }
    }
    
    handleShow = (menuKeranjang) => {
        this.setState({
            showModal: true,
            keranjangDetail: menuKeranjang,
            jumlah: menuKeranjang.jumlah,
            keterangan: menuKeranjang.keterangan,
        })
    }
    
    handleClose = () => {
        this.setState({
            showModal: false
        });
    };
    
    tambah = () => {
        this.setState({
            jumlah: this.state.jumlah+1
        })
    }
    
    kurang = () => {
        if(this.state.jumlah !== 1 ) {
            this.setState({
                jumlah: this.state.jumlah-1
            })
        }
    }
    
    changeHandler = (event) => {
        this.setState({
            keterangan: event.target.value
        })
    }
    
    handleSubmit = (event) => {
        event.preventDefault();
        
        console.log("hai", this.state.keterangan);
    }

    render() {
    const {keranjangs} = this.props
        return (
        <Col md={3} mt="4">
            <h5> 
                <strong>Hasil</strong>
            </h5>
            <hr/>
            {keranjangs.length !== 0 &&
                <ListGroup variant="flush">
                    {keranjangs.map((menuKeranjang) => (
                        <ListGroup.Item key= {menuKeranjang.id} onClick={() => this.handleShow(menuKeranjang)} >
                            <Row>
                                <Col xs={2}>
                                    <h7>
                                        <Badge pill variant="success">
                                            {menuKeranjang.jumlah}
                                        </Badge>
                                    </h7>
                                </Col>
                                <Col>
                                    {menuKeranjang.product.nama}
                                    <p>Rp. {numberWithCommas(menuKeranjang.product.harga)} </p>
                                </Col>
                                <Col>
                                    <strong className="float-right"> Rp. {numberWithCommas(menuKeranjang.product.total_harga)} </strong>
                                </Col>
                            </Row>
                        </ListGroup.Item>
                    ))}
                    
                    <ModalKeranjang 
                    handleClose={this.handleClose} {...this.state} 
                    tambah={this.tambah} 
                    kurang={this.kurang} 
                    changeHandler={this.changeHandler}
                    handleSubmit={this.handleSubmit}/>
                    
                </ListGroup>
            }
            
            <TotalBayar keranjangs={keranjangs} {...this.props} />
        </Col>
        )
    };
};
