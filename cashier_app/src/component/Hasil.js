import React, { Component } from 'react'
import { Col, ListGroup, Row, Badge } from 'react-bootstrap'
import {numberWithCommas} from './utils';

export default class ListCategories extends Component {
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
                        <ListGroup.Item>
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
                </ListGroup>
            }
        </Col>
        )
    };
};
