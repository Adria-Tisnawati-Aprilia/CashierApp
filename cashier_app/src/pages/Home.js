import './App.css';
import {Row, Col, Container} from 'react-bootstrap'
import {Hasil, ListCategories, Menus} from '../component';
import axios from 'axios';
import React, { Component } from 'react'
import {API_URL} from '../utils/constant'
import swal from 'sweetalert'


export default class Home extends Component {
    constructor(props) {
    super(props)

    this.state = {
        menus : [],
        categoryYangDipilih: 'Makanan',
    }
}

    componentDidMount(){
    axios
        .get(API_URL + "product?category.nama=" + this.state.categoryYangDipilih)
        .then((res) => {
        const menus = res.data;
        this.setState({ menus});
    })
    .catch (error => {
        console.log("error")
    });
    
    axios
    .get(API_URL + "keranjangs")
    .then((res) => {
        const keranjangs = res.data;
        this.setState({ keranjangs});
    })
    .catch ((error) => {
        console.log("error")
    });
}

    componentDidUpdate(prevState) {
    if(this.setState.keranjangs !== prevState.keranjangs) {
        axios
            .get(API_URL + "keranjangs")
            .then((res) => {
                const keranjangs = res.data;
                this.setState({ keranjangs});
            })
            .catch (error => {
                console.log("error")
            });
    }
}

    changeCategory = (value) => {
    this.setState({
        categoryYangDipilih : value,
        menus : [],
    })
    
    axios
        .get(API_URL + "product?category.nama=" + value)
        .then((res) => {
        const menus = res.data; 
        this.setState({menus});
    })
        .catch ((error) => {
        console.log("error")
    });
};

    masukkeranjang = (value ) => {

    axios
        .get(API_URL + "keranjangs?product.id=" + value.id)
        .then((res) => {
        if(res.data.length === 0) {
            const keranjang = {
            jumlah: 1,
            total_harga: value.harga,
            product: value
        };
        
        axios
            .post(API_URL + "keranjangs", keranjang)
            .then((res) => {
                swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: "false",
                timer: 1500,
                });
            })
            .catch ((error) => {
                console.log("error")
            });
        } else {
            const keranjang = {
            jumlah: res.data[0].jumlah+1,
            total_harga: res.data[0].total_harga+value.harga,
            product: value,
        };
        
        axios
            .put(API_URL + "keranjangs/" + res.data[0].id, keranjang)
            .then((res) => {
                swal({
                title: "Sukses Masuk Keranjang",
                text: "Sukses Masuk Keranjang" + keranjang.product.nama,
                icon: "success",
                button: "false",
                timer: 1500,
                });
            })
            .catch ((error) => {
                console.log("error")
            });
        }
    })
    .catch ((error) => {
        console.log("error");
    });
};

render() {
const {menus, categoryYangDipilih, keranjangs} = this.state;
    return (
        <div className="App">
        <Container fluid mt="3">
        <Row>
            <ListCategories changeCategory= {this.changeCategory} categoryYangDipilih = {categoryYangDipilih} />
            <Col>
            <h5><strong>Daftar Produk</strong></h5>
            <hr/>
            <Row>
                {menus && menus.map((menu)=> (
                <Menus 
                    key={menu.id}
                    menu={menu}
                    masukKeranjang ={this.masukKeranjang}
                />
            ))}
            </Row>
        </Col>
            <Hasil keranjangs={keranjangs} {...this.props}/>
        </Row>
    </Container>
    </div>
    )
}
}

